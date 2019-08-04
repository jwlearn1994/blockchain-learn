const SHA256 = require('./sha256.js');

class Block {
  constructor(index, timeStamp, data, prevHash = '') {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.createHash();
    // Proof-of-work
    this.salt = 0; // 因為不能修改其他任何值來讓 hash 值重新生成，故新增一值，並在每次檢驗生成 hash 值 0 的個數時修改。
  }

  createHash() {
    return SHA256(this.index + this.timeStamp + this.prevHash + JSON.stringify(this.data) + this.salt).toString();
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
    // Proof-of-work
    this.difficulty = 5; // 挖礦難度
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
    // newBlock.hash = newBlock.createHash();
    newBlock.mineBlock(this.difficulty);
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

console.time();
console.log('Mining Block 1...');
myCoin.addBlock(new Block(1, new Date().toUTCString(), {
  from: 'Johnny',
  to: 'Kevin',
  amount: 10
}))
console.timeEnd();

console.log('Mining Block 2...');
myCoin.addBlock(new Block(2, new Date().toUTCString(), {
  from: 'Chris',
  to: 'Johnny',
  amount: 20
}))
