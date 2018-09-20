const Telegraf = require('telegraf');
const rp = require('request-promise');
const utils = require('./utils');

const bot = new Telegraf(process.env.BOT_TOKEN_2);
const c = require('./constants');
const HELP_MESSAGE = 'Welcome to Numex Bot, type sold or address or last';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!ETHERSCAN_API_KEY) {
  throw new Error('API_KEY has to be set as env variable');
}

const getTokensSold = () => {
  return rp(c.ETHERSCAN_API.TOKEN_BALANCE_URL)
    .then(resultFromServer => {
      console.log(resultFromServer);
      const res = JSON.parse(resultFromServer);
      // example: {"status":"1","message":"OK","result":"1392672000000000000000000"}
      const tokensLeft = res.result / 10 ** c.DECIMALS;
      const tokensSold = c.TOTAL_SUPPLY_TOKENS - tokensLeft;
      return Promise.resolve(tokensSold);
    });
};

const printTokensSold = (amount) => {
  return 'Sold ' + amount + ' NMX at ' + new Date();
};

bot.start((ctx) => ctx.reply(HELP_MESSAGE));
bot.help((ctx) => ctx.reply(HELP_MESSAGE));
bot.hears('hi', (ctx) => ctx.reply('Hey there from Numex'));

bot.hears('address', (ctx) => {
  const addressReply = 'Crowdsale address: ' + c.HTTP_ADDRESSES.CROWDSALE + '\n' + 'Token address: ' + c.HTTP_ADDRESSES.TOKEN;
  console.log('Reply ', addressReply);
  ctx.reply(addressReply);
});
bot.hears('help', (ctx) => {
  ctx.reply(HELP_MESSAGE);
});

/**
 * Print list of N last transactions
 * @param ctx - telegraf context
 */
const printLastElements = (ctx) => {
  console.log('Return last transactions');
  return rp(c.ETHERSCAN_API.GET_TRANSACTIONS_LIST)
    .then(resultFromServer => {
      const LAST_N_ELEMENT = 10;
      const res = JSON.parse(resultFromServer);
      const transactionListSorted = res.result;
      const readableTransaction = transactionListSorted.map(utils.usefulTransactionInfo).reverse().slice(0, LAST_N_ELEMENT);
      let stringToReturn = '';
      // print output in `1.0825 eth 10 hours ago from 0x43b..b1d` way
      readableTransaction.map((x) => {
        stringToReturn += x.value + ' eth ' + x.when + ' from ' + x.from + '\n';
      });
      console.log('Print last transactions', stringToReturn);
      ctx.reply(stringToReturn);
    });
};

/**
 * Print amount of sold tokens
 * @param ctx - telegraf context
 */
const printSoldTokens = (ctx) => {
  return getTokensSold()
    .then(tokensSold => {
      const response = printTokensSold(tokensSold);
      console.log('print sold tokens', response);
      ctx.reply(response);
    })
    .catch(function (err) {
      console.log('Could not get amount of tokens sold', err);
    });
};

bot.command('sold', printSoldTokens);
bot.hears('sold', printSoldTokens);
bot.hears('last', printLastElements);
bot.command('last', printLastElements);

bot.startPolling();
