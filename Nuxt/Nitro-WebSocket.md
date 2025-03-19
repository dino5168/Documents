# WebSocket 使用方式

### Nitro 使用 crossws 連接 WebSocket

Crossws 使用方式

### nuxt.config.ts

```json
 nitro: {
    experimental: {
      websocket: true,
    },
  },
```

```ts
import {defineHooks} from "crossws";
import crossws from "crossws/adapters/<adapter>";

const ws = crossws({
  hooks: {
    open(peer) {
      console.log("[ws] open", peer);
    },

    message(peer, message) {
      console.log("[ws] message", peer, message);
      if (message.text().includes("ping")) {
        peer.send("pong");
      }
    },

    close(peer, event) {
      console.log("[ws] close", peer, event);
    },

    error(peer, error) {
      console.log("[ws] error", peer, error);
    },
  },
});
```

## client 程式

```ts
<template>
    <p class="font-bold">WebSokcet Example</p>
    <p v-if="isConnected">已經連接</p>
    <p v-else>無法連接</p>
    <label class="font-bold text-blue-600">傳送訊息:</label> <input type="text">
    <button @click="onSend" class="bg-blue-500 text-white font-bold">Send</button>
    <button @click="onOpenSocket" class="bg-blue-500 text-white font-bold">Open</button>
    <button @click="onCloseSocket" class="bg-blue-500 text-white font-bold">Close</button>

    <div v-if="receivedMessage" class="mt-4">
        <p class="font-bold">收到伺服器回應:</p>
        <p>{{ receivedMessage }}</p>
    </div>
</template>
<script lang="ts" setup>
import { useWebSocket } from '@vueuse/core'

const isSecure = location.protocol === "https:";
const url = (isSecure ? "wss://" : "ws://") + location.host + "/_ws";

const { status, data, send, open, close } = useWebSocket(url, {
    autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed() {
            alert('Failed to connect WebSocket after 3 retries')
        },
    },

})

// 當收到來自 WebSocket 伺服器的資料時，將資料更新到 receivedMessage
watch(data, (newData) => {
    if (newData) {
        receivedMessage.value = newData.toString()  // 將資料轉換成字串
    }
})

const isConnected = computed(() => status.value === 'OPEN');
// 儲存伺服器回應的訊息
const receivedMessage = ref('')
const nowTime = () => {
    const now = Date.now(); // 取得當前時間戳（毫秒數）
    // 創建一個新的 Date 物件
    const date = new Date(now);

    // 格式化為 yyyyMMddHHmmss
    const year = date.getFullYear(); // 取得年份
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 取得月份（注意：月份是 0-11，所以需要加 1）
    const day = String(date.getDate()).padStart(2, '0'); // 取得日期
    const hours = String(date.getHours()).padStart(2, '0'); // 取得小時
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 取得分鐘
    const seconds = String(date.getSeconds()).padStart(2, '0'); // 取得秒數

    // 拼接成指定格式
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

}

const onSend = async () => {
    setInterval(() => {
        const now = nowTime();
        send(`Hello Dino ${now}`);
    }, (1000));


}

watch(status, (newStatus) => {
    if (newStatus === 'OPEN') {
        console.log('WebSocket 連線成功！');
    } else if (newStatus === 'CLOSED') {
        console.log('WebSocket 連線已關閉');
    }
});

const onOpenSocket = async () => {
    open();
}
const onCloseSocket = async () => {
    close(1000, '手動關閉 WebSocket');
}
</script>

```

# Server 端程式

```ts
import type {Peer, Message} from "crossws";
import fs from "fs";

const writeLog = async (data: string) => {
  try {
    fs.appendFileSync("C:/temp/myLog.txt", data + "\n");
  } catch (err) {
    console.error("Error writing log:", err);
  }
};

export default defineWebSocketHandler({
  upgrade(req) {
    //console.log(`[ws] upgrading ${req.url}...`);

    return {
      headers: {},
    };
  },
  open(peer: Peer) {
    //console.log("[ws] open", peer.id);
    //console.log("[ws] remoteAddress", peer.remoteAddress);
    peer.send("Welcome to the server!");
  },
  message(peer, message) {
    //console.log("[ws] message", peer.id);

    // Handle different message formats
    let text;
    if (message instanceof Buffer) {
      text = message.toString();
    } else if (message.data instanceof Buffer) {
      text = message.data.toString();
    } else if (typeof message.text === "function") {
      text = message.text();
    } else {
      text = String(message);
    }

    //console.log("[ws] message content:", text);
    writeLog(text);
    peer.send(text);
  },

  close(peer: Peer, event) {
    console.log("[ws] close", peer.id, event);
  },
  error(peer: Peer, error) {
    console.log("[ws] error", peer.id, error);
  },
});
```
