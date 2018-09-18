const Telegraf = require('telegraf');
const rp = require('request-promise');

const bot = new Telegraf(process.env.BOT_TOKEN_2);

const HELP_MESSAGE = 'Welcome to Numex Bot, type sold or address';
const CROWDSALE_FULL_ETHERSCAN_ADDRESS = 'https://etherscan.io/address/0x9f7695548e0bbe41e583dac026866e2b10e11b3a';
const TOKEN_FULL_ETHERSCAN_ADDRESS = 'https://etherscan.io/address/0x2c4f70babf05e0e467641809a205d869aefb2fb9';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!ETHERSCAN_API_KEY) {
  throw new Error('API_KEY has to be set as env variable');
}

const ERC20_TOKEN_ADDRESS = '0x2C4f70baBF05e0e467641809a205d869aEFB2FB9';
const TOKEN_CREATOR_ADDRESS = '0x4026079d2D1d6d44B256A0BDb87f06bB341e1976';

const TOKEN_BALANCE_URL = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${ERC20_TOKEN_ADDRESS}&address=${TOKEN_CREATOR_ADDRESS}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;

const TOTAL_SUPPLY_TOKENS = 1500000;
const DECIMALS = 18;

const getTokensSold = () => {
  return rp(TOKEN_BALANCE_URL)
    .then(resultFromServer => {
      console.log(resultFromServer);
      const res = JSON.parse(resultFromServer);
      // example: {"status":"1","message":"OK","result":"1392672000000000000000000"}
      const tokensLeft = res.result / 10 ** DECIMALS;
      const tokensSold = TOTAL_SUPPLY_TOKENS - tokensLeft;
      return Promise.resolve(tokensSold);
    });
};

const printTokensSold = (amount) => {
  return 'Sold ' + amount + ' NMX at ' + new Date();
};

bot.start((ctx) => ctx.reply(HELP_MESSAGE));
bot.help((ctx) => ctx.reply(HELP_MESSAGE));
bot.hears('hi', (ctx) => ctx.reply('Hey there from Numex'));
bot.hears('sold', (ctx) => {
  return getTokensSold()
    .then(tokensSold => {
      const response = printTokensSold(tokensSold);
      console.log('New Response:', response);
      ctx.reply(response);
    })
    .catch(function (err) {
      console.log('Could not get amount of tokens sold', err);
    });
});
bot.hears('address', (ctx) => {
  const addressReply = 'Crowdsale address: ' + CROWDSALE_FULL_ETHERSCAN_ADDRESS + '\n' + 'Token address: ' + TOKEN_FULL_ETHERSCAN_ADDRESS;
  console.log('Reply ', addressReply);
  ctx.reply(addressReply);
});
bot.hears('help', (ctx) => {
  ctx.reply(HELP_MESSAGE);
});

bot.command('sold', (ctx) => {
  return getTokensSold()
    .then(tokensSold => {
      const response = printTokensSold(tokensSold);
      console.log('New Response:', response);
      ctx.reply(response);
    })
    .catch(function (err) {
      console.log('Could not get amount of tokens sold', err);
    });
});

bot.startPolling();
