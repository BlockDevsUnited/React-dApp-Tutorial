/* global artifacts */
const BDUToken = artifacts.require('BDUToken');

module.exports = async (deployer) => {
  await deployer.deploy(BDUToken);
};
