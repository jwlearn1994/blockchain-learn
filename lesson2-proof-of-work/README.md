# LESSON 2 - Proof of Work

為了避免同時有成千上萬的Block在同時產生，且以第一課教的方法驗證，

黑客們仍能在修改 Block 內容後，利用現代計算機將全部區塊中的 hash 值重新演算，

參考BitCoin，會在各區塊的Hash 值前加入若干個 0，以此讓計算機無法於短時間內生成Block

提昇安全性與可靠性。

## 觀念

1. 設置一個mineBlock函數，讓他與addBlock連動，每當新增一個Block的時候，

就執行mineBlock進行處理，利用設置難度條件，調整生產一個Block需耗費的時間，

藉此即可讓電腦無法於短時間內重造整個區塊鏈，增加可靠性與安全度。
ㄋ