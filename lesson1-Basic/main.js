// 引入 SHA256 模組
const SHA256 = require('./sha256.js');

// 建立 Block 模組
class Block {
  constructor(index, timeStamp, data, prevHash = '') {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.createHash();
  }

  createHash() {
    return SHA256(this.index + this.timeStamp + this.prevHash + JSON.stringify(this.data)).toString();
  }
}

// 建立 Blockchain 模組
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, new Date().toUTCString(), {
      from: null,
      to: null,
      amount: null
    })
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.createHash();
    return this.chain.push(newBlock);
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

myCoin.addBlock(new Block(1, new Date().toUTCString(), {
  from: 'Johnny',
  to: 'Kevin',
  amount: 10
}))

myCoin.addBlock(new Block(2, new Date().toUTCString(), {
  from: 'Chris',
  to: 'Johnny',
  amount: 20
}))

console.log(JSON.stringify(myCoin, null, 2));