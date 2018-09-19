const assert = require('assert');
const rp = require('request-promise');
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ERC20_TOKEN_ADDRESS = '0x2C4f70baBF05e0e467641809a205d869aEFB2FB9';
const TOKEN_CREATOR_ADDRESS = '0x4026079d2D1d6d44B256A0BDb87f06bB341e1976';
const CROWDSALE_ADDRESS = '0x9f7695548e0bbe41e583dac026866e2b10e11b3a';

const TOKEN_BALANCE_URL = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${ERC20_TOKEN_ADDRESS}&address=${TOKEN_CREATOR_ADDRESS}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;

const GET_TRANSACTIONS_LIST = `http://api.etherscan.io/api?module=account&action=txlist&address=${CROWDSALE_ADDRESS}&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

const TOTAL_SUPPLY_TOKENS = 1500000;
const DECIMALS = 18;

if (!ETHERSCAN_API_KEY) {
  throw new Error('API_KEY has to be set as env variable');
}

const transactionList = require('./dataTransactionList');

const utils = require('../utils');

describe('Bot reporting', () => {
  describe('fetch contract information', () => {
    it.skip('should return amount of tokens', () => {
      return rp(TOKEN_BALANCE_URL)
        .then(resultFromServer => {
          console.log(resultFromServer);
          const res = JSON.parse(resultFromServer);
          // example: {"status":"1","message":"OK","result":"1392672000000000000000000"}
          const tokensLeft = res.result / 10 ** DECIMALS;
          const tokensSold = TOTAL_SUPPLY_TOKENS - tokensLeft;
          return Promise.resolve(tokensSold);
        });
    });

    it.skip('should return amount of tokens', () => {
      return rp(GET_TRANSACTIONS_LIST)
        .then(resultFromServer => {
          const res = JSON.parse(resultFromServer);
          const transactionList = res.result;
          console.log(transactionList);
        });
    });

    it('transform transaction list', () => {
      console.log(transactionList);
      const readableTransaction = transactionList.map(utils.usefulTransactionInfo);
      console.log(readableTransaction);
    });
  });
});
