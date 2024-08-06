// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface CdkS3CdnConstructProps {
  // Define construct properties here
}

export class CdkS3CdnConstruct extends Construct {

  constructor(scope: Construct, id: string, props: CdkS3CdnConstructProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkS3CdnConstructQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
