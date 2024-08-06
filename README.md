# Welcome to your CDK TypeScript Construct Library project

You should explore the contents of this project. It demonstrates a CDK Construct Library that includes a construct (`CdkS3CdnConstruct`) which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The construct defines an interface (`CdkS3CdnConstructProps`) to configure the visibility timeout of the queue.

## Useful commands

* `npm run build`   compile TypeScript to JavaScript
* `npm run watch`   watch for changes and compile
* `npm run test`    run the Jest unit tests
* `tsc`             compile TypeScript to JavaScript (same as `npm run build`)

## Setting up and Publishing the Package

1. **Initialize the project with a scope**:
   ```sh
   npm init --scope=@wrlakshan
   ```

2. **Log in to npm**:
   ```sh
   npm login
   ```

3. **Publish the package with public access**:
   ```sh
   npm publish --access public
   ```

4. **Update the package version**:
   ```sh
   npm version 0.4.0
   ```

