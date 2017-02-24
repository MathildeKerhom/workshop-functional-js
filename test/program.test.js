var expect = require('chai').expect;

var transformCheckpoint = require('../src/program').transformCheckpoint;

var exampleParameter = {
  id: 'whataw0nd3rful1d',
  uuid: 'whataw0nd3rful1d',
  address: 'unknown',
  addressType: 'unknown',
  connectable: true,
  advertisement: {
    localName: undefined,
    txPowerLevel: undefined,
    manufacturerData: undefined,
    serviceData: [],
    serviceUuids: [ 'abcd' ]
  },
  rssi: -66,
  services: null,
  state: 'outofcontrol'
};


describe('Function transformCheckpoint', function() {

  it('Function transformCheckpoint without parameter should return false', function() {
    expect(transformCheckpoint()).to.be.false;
  });

  it('Function transformCheckpoint with parameter should return a mutated object', function() {
    expect(transformCheckpoint(exampleParameter)).to.not.eql(exampleParameter);
  });

  it('Function transformCheckpoint with parameter should return an object with different reference', function() {
    expect(transformCheckpoint(exampleParameter)).to.not.equal(exampleParameter);
  });

});