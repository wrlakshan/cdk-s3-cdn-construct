import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export interface CdkS3CdnConstructProps {
  projectName: string,
  s3WebSiteDeploySource: string,
  websiteIndexDocuments: string,
  websiteErrorDocuments: string,
  cdnWebsiteIndexDocuments: string,
  cdnComment: string,
}



export class CdkS3CdnConstruct extends Construct {

  constructor(scope: Construct, id: string, props: CdkS3CdnConstructProps) {
    super(scope, id);

    const websiteBucket = new s3.Bucket(this, 'websiteBucket', {
      bucketName: `${props.projectName}-${Math.floor(Math.random() * 1000000) + 1}`,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: props.websiteIndexDocuments,
      websiteErrorDocument: props.websiteErrorDocuments,
      autoDeleteObjects: true,
    });

    websiteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        resources: [`${websiteBucket.bucketArn}/*`],
        actions: ['s3:Get*'],
        principals: [new iam.AnyPrincipal()],
      })
    )

    const s3WebsiteDeployment = new s3deploy.BucketDeployment(this, 'websiteDeployment', {
      sources: [s3deploy.Source.asset(props.s3WebSiteDeploySource)],
      destinationBucket: websiteBucket,
    });

    const assertCdn = new cloudfront.Distribution(this, 'AssertCdn', {
      defaultRootObject: props.cdnWebsiteIndexDocuments,
      comment: props.cdnComment,
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
      },
    });

    new cdk.CfnOutput(this, 'websiteBucketUrl', { value: websiteBucket.bucketWebsiteUrl });
    new cdk.CfnOutput(this, 'cdnUrl', { value: assertCdn.distributionDomainName });
  }
}
