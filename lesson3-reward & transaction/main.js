const SHA256 = require('./sha256.js');

// 新增 Transaction 模組
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timeStamp, transactions, prevHash = '') { // 移除 index
    this.timeStamp = timeStamp;
    this.transactions = transactions;
    this.prevHash = prevHash;
    this.hash = this.createHash();
    this.salt = 0;
  }

  createHash() {
    return SHA256(this.timeStamp + this.prevHash + JSON.stringify(this.transactions) + this.salt).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
      this.salt++;
      this.hash = this.createHash();
    }

    console.log('Block mined: '+this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransacitons = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(Date.now(), '');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransations(miningRewardAddress) {
    // 建立新區塊
    let block = new Block(Date.now(), this.pendingTransacitons);

    // 執行區塊模組挖礦指令
    block.mineBlock(this.difficulty);

    // 完成挖礦後加入區塊鏈
    console.log('Block successfully mined!');
    this.chain.push(block);

    // 處理 reward 給 miner
    // 1. 將 pendingTranscations 重置
    // 2. 並將 reward 作為一筆新交易，並加入到重置的 pendingTransactions 中
    this.pendingTransacitons = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  // 建立新交易
  createTransaction(transaction) {
    return this.pendingTransacitons.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (let block of this.chain) {
      for (let tran of block.transactions) {
        if (tran.fromAddress === address) {
          balance -= tran.amount;
        }

        if (tran.toAddress === address) {
          balance += tran.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i=1;i<this.chain.length;i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.createHash()) return false;

      if (currentBlock.prevHash !== prevBlock.hash) return false;

      return true;
    }
  }
}



const myCoin = new Blockchain();

myCoin.createTransaction(new Transaction('Kevin', 'Johnny', 100));
myCoin.createTransaction(new Transaction('Johnny', 'Kevin', 50));


console.log('\n Starting miner...');
myCoin.minePendingTransations('Yan');

console.log('\n Balance of Yan is: ' + myCoin.getBalanceOfAddress('Yan'));


console.log('\n Starting miner again...');
myCoin.minePendingTransations('Yan');

console.log('\n Balance of Yan is: ' + myCoin.getBalanceOfAddress('Yan'));