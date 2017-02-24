let chalk = require('chalk');
var _ = require("lodash");

let checkpointsService = require('./staticCheckpoints');


let calculateDistanceWithRssi = rssi => {
  var txPower = -59; // hard coded power value. Usually ranges between -59 to -65
  if (rssi == 0) {
    return -1.0;
  }
  var ratio = rssi * 1.0 / txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  } else {
    var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
    return distance;
  }
};

let transformCheckpoint = (checkpoint) => {
  if (checkpoint) {
    var param = (JSON.parse(JSON.stringify(checkpoint)));
    // Get back essential properties
    param.serviceData = param.advertisement.serviceData;
    param.serviceUuids = param.advertisement.serviceUuids;
    // Transform data about distance
    param.distance = calculateDistanceWithRssi(param.rssi);
    // Clean uninteresting properties
    delete param.id;
    delete param.address;
    delete param.addressType;
    delete param.advertisement;
    delete param.rssi;
    delete param.services;
    // Everything is ok
    return param;
  } else {
    return false;
  }
};

let showCheckpoint = (checkpoint, index) => {
  console.log(chalk.green('CHECKPOINT'), chalk.yellow(index + 1));
  _.map(checkpoint, (property, key) => {
    if(key == 'distance' && property >= 1) {
      console.log(chalk.cyan(key.toUpperCase()), `$property m`);
    } else if(key == 'distance' && property < 1) {
      let prop = property * 100;
      console.log(chalk.cyan(key.toUpperCase()), `$prop cm`);
    } else {
      console.log(chalk.cyan(key.toUpperCase()), property)
    }
  });

  console.log('\n');
};

let run = () => {
  let checkpoints = checkpointsService.getCheckpoints();
  checkpoints.map((checkpoint, index) => {
    let transformedCheckpoint = transformCheckpoint(checkpoint);
    showCheckpoint(transformedCheckpoint, index);
  });
};

module.exports = {
  transformCheckpoint: transformCheckpoint,
  showCheckpoint: showCheckpoint,
  run: run
};