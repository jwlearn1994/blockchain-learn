# LESSON 1 - Basic

本堂課主要教學建立基本 區塊鏈 結構。

分成區塊以及鏈的部分進行實作。

## 觀念

1. 區塊中包含三大重點部分，data, hash, prevHash。

2. 其中在區塊鏈上，各區塊間彼此以 hash, prevHash 進行認定是否合法，每個 Block 中的

prevHash 必須與上一個 Block 的 hash 值相同，以此達到安全性。

3. 使用新的 SHA256 進行資料 hash 加密生成，傳統的 MD5, SHA1 已被破解，不要使用。

4. 區塊鏈中，第一個區塊必須被初始化，稱為 Genesis Block。