


graph TD;
A(同步程式碼) -->|執行完| B(Timers: setTimeout, setInterval)
B --> C(I/O Callbacks: 處理已完成的 I/O 事件)
C --> D(Poll: 處理新的 I/O 事件)
D --> E(Check: setImmediate 執行)
E --> F(Close Callbacks: 例如 socket.on("close"))
F -->|迴圈重複| A
