const async = require('async');

const buildPackage = require('./build-package');
const { packagePath } = require('./config');

// The packages must be ordered due to the inter dependency
const packages = ['named-react-router-dom'];

async.forEach(packages, pkg => buildPackage(pkg));
