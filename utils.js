'use strict';

const moment = require('moment');

/**
 * @param {blockNumber:} transaction
 * @example { blockNumber: '6336362',
    timeStamp: '1537016432',
    hash: '0x49655bb232830365b3f70eebec6f07d86cc53317e3c8ecb5344e5f8ac8596110',
    nonce: '20',
    blockHash: '0x280825b3acb32ba2ada19f72991ff374b96c8f1555faa511af7a18ab0c8402c9',
    transactionIndex: '8',
    from: '0x3c1bb5eea2f9c82065833e45d2ea0c1b9c9d58c3',
    to: '0x9f7695548e0bbe41e583dac026866e2b10e11b3a',
    value: '59000000000000000000',
    gas: '62863',
    gasPrice: '60000000000',
    isError: '0',
    txreceipt_status: '1',
    input: '0x',
    contractAddress: '',
    cumulativeGasUsed: '245363',
    gasUsed: '60657',
    confirmations: '22950' }
 */
const usefulTransactionInfo = (transaction) => {
  return {
    value: transaction.value / (10 ** 18),
    when: moment(transaction.timeStamp * 1000).fromNow(),
    from: transaction.from.substr(0, 5) + '..' + transaction.from.substr(-3)
  };
};

exports.usefulTransactionInfo = usefulTransactionInfo;
