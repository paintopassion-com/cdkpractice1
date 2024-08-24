#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { Cdkpractice1Stack } = require('../lib/cdkpractice1-stack');

const app = new cdk.App();
new Cdkpractice1Stack(app, 'Cdkpractice1Stack');
app.synth();