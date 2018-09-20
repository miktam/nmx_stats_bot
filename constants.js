
const ERC20_TOKEN_ADDRESS = '0x2C4f70baBF05e0e467641809a205d869aEFB2FB9';
const TOKEN_CREATOR_ADDRESS = '0x4026079d2D1d6d44B256A0BDb87f06bB341e1976';
const CROWDSALE_ADDRESS = '0x9f7695548e0bbe41e583dac026866e2b10e11b3a';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {

  TOTAL_SUPPLY_TOKENS: 1500000,
  DECIMALS: 18,
  ERC20_TOKEN_ADDRESS,
  TOKEN_CREATOR_ADDRESS,
  CROWDSALE_ADDRESS,

  ETHERSCAN_API: {
    TOKEN_BALANCE_URL: `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${ERC20_TOKEN_ADDRESS}&address=${TOKEN_CREATOR_ADDRESS}&tag=latest&apikey=${ETHERSCAN_API_KEY}`,
    GET_TRANSACTIONS_LIST: `http://api.etherscan.io/api?module=account&action=txlist&address=${CROWDSALE_ADDRESS}&sort=asc&apikey=${ETHERSCAN_API_KEY}`
  },
  HTTP_ADDRESSES: {
    CROWDSALE: `https://etherscan.io/address/${CROWDSALE_ADDRESS}`,
    TOKEN: `https://etherscan.io/address/${ERC20_TOKEN_ADDRESS}`
  }
};
