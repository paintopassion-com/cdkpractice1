const cdk = require('aws-cdk-lib');
const { Stack, App } = cdk;
const s3 = require('aws-cdk-lib/aws-s3');
const cloudfront = require('aws-cdk-lib/aws-cloudfront');
const s3deploy = require('aws-cdk-lib/aws-s3-deployment');

class Cdkpractice1Stack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create an S3 bucket to host the React application
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      //publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    // Create a CloudFront distribution to serve the content
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'WebsiteDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    // Deploy the React application to the S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('myapp/build')],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
module.exports = { Cdkpractice1Stack };
//const app = new App();
//new Cdkpractice1Stack(app, 'Cdkpractice1Stack');
//app.synth();