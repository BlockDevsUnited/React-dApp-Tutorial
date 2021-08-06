/* global ethers*/
/* eslint-disable jest/valid-expect */
const { expect } = require('chai');
const { BigNumber } = ethers;

describe('BDUToken', () => {
  const name = 'BlockDevsUnited';
  const symbol = 'BDU';
  const supply = BigNumber.from(2100000000);

  it('creates correct contract', async () => {
    const [owner] = await ethers.getSigners();
    const { address } = owner;
    const BDUToken = await ethers.getContractFactory('BDUToken');
    const bduToken = await BDUToken.deploy();
    await bduToken.deployed();
    const tokenName = await bduToken.name();
    const tokenSymbol = await bduToken.symbol();
    const tokenSupply = await bduToken.totalSupply();
    const ownerInitialBalance = await bduToken.balanceOf(address);
    expect(name).to.equal(tokenName);
    expect(symbol).to.equal(tokenSymbol);
    expect(supply.eq(tokenSupply)).to.equal(true);
    expect(supply.eq(ownerInitialBalance)).to.equal(true);
  });
});
