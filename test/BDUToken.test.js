/* global artifacts, contract, assert*/
const { BN } = require("@openzeppelin/test-helpers");

const BDUToken = artifacts.require("BDUToken");

contract("BDUToken", ([owner]) => {
  const name = "BlockDevsUnited";
  const symbol = "BDU";
  const supply = new BN(2100000000);

  it("creates correct contract", async () => {
    const bduToken = await BDUToken.deployed();
    const tokenName = await bduToken.name();
    const tokenSymbol = await bduToken.symbol();
    const tokenSupply = await bduToken.totalSupply();
    const ownerInitialBalance = await bduToken.balanceOf(owner);
    assert.equal(name, tokenName, "Incorrect token name");
    assert.equal(symbol, tokenSymbol, "Incorrect token symbol");
    assert.equal(supply.eq(tokenSupply), true, "Incorrect initial supply");
    assert.equal(
      supply.eq(ownerInitialBalance),
      true,
      "Incorrect owner initial balance"
    );
  });
});
