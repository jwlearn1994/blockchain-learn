# LESSON 3 - Miner Reward & Transactions

為了達成生態平衡，必須加入創建Coin的方式於此生態系，否則沒有人可得到Coin。

## 觀念

1. 首先將 Block 模組裡原本的 index 參數移除，因為區塊間的關係並非用index 

做判斷，而是用他們加入區塊鏈的相對位置而定。


2. 將 data 參數改為 transactions 更為貼切，其中transactions 為一數組，

由許多 transaction 實例組成，因此我們也要建立一個transaction 模組使用。 


3. 建立 pendingTransactions 參數在 Blockchain 模組中，以比特幣的規則

來說，必須有個地方儲存待處理的transacitons ，以待執行完成後繼續處理後續 

transactions 給下一個 Block。


4. 將舊 addBlock 函數改為 minePendingTransactions 函數，該函數就是定義

新的挖礦函數，其意義為給予使用者一個方法，透過執行該方法，當執行成功後，將會獲得

相應的 Rewards。


5. 在 minePendingTransactions 函數中，我們傳入了整個 pendingTransactions 

來建立新的 Block，但在現實中，因為他的量非常大，必須自己去選擇哪些需要被包含在這次創建

的 Block 中，但本章僅近簡單測試，不考慮該因素。


6. 比特幣交易時，並非真的把自身的 address balance 傳送出去，而是進行內部帳本的計算與查詢，

在各筆交易之中去計算出 address balance。


7. 建立一個 getBalanceOfAddress 函數，並在其中 loop 我們帳本中的所有 block 裡面的所有

交易，當 address 是from 時，表示為轉出給別人，是to時，表示轉入。


8. 測試...(建立 transations)->(Mine block)->(檢查挖礦者balance)

挖礦獎勵會在建立下一個 Block 時執行，所以當下並不會得到 reward。