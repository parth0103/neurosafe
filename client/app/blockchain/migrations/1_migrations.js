var MyContract = artifacts.require('HealthRecord');

module.exports = function (deployer) {
  deployer.deploy(MyContract);
};
