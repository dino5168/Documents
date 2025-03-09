# 安裝 nuxt-auth

## 安裝套件

```sh
npm install @sidebase/nuxt-auth
npm install @auth/core
```

## 手動安裝

新增檔案 types.ds.ts

```ts
declare module "#auth";
```

## type.dt.ts 的作用

    types.d.ts 是 TypeScript 中的聲明文件，主要用來定義全局類型，或者在無法直接改動原始庫代碼的情況下擴展第三方庫的類型。這樣，TypeScript 編譯器可以在編譯時了解這些類型信息，從而提供類型檢查和自動完成功能。

主要用途包括：

- 全局類型聲明：你可以在 types.d.ts 文件中定義一些全局變數、函數或者類型，讓它們在整個應用中都能被識別。

- 第三方庫的類型擴展：有時候使用的第三方庫可能沒有提供 TypeScript 類型定義，這時你可以在 types.d.ts 文件中為這些庫添加類型聲明。

- 類型別名與接口：如果你有複雜的類型結構或者一些常用的類型，你可以在 types.d.ts 中定義它們，並在整個項目中重用。

## nuxt.config.ts 設定

    使用 authjs 的方式驗證

    ```ts
    auth: {
        provider: {
        type: "authjs",
        },
    },
    ```

## Nuxt 設定目錄

    /server/api/auth/[...].ts

```ts
// server/api/auth/[...].ts
import {NuxtAuthHandler} from "#auth";
import Credentials from "@auth/core/providers/credentials";

export default NuxtAuthHandler({
  secret: process.env.NUXT_SECRET || "your-development-secret",
  // 為生產環境設置 origin
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.NUXT_PUBLIC_SITE_URL
      : "http://localhost:3001",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials: any) {
        // 簡化的驗證範例
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "password"
        ) {
          console.log("OK");
          return {id: "1", email: "test@example.com", name: "Test User"};
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
```

## Login.vue

```ts
<!-- pages/test-auth.vue -->
<template>
    <div>
        <h1>Auth 測試頁面</h1>
        <div v-if="pending">加載中...</div>
        <div v-else>
            <div v-if="data">
                <h2>已登錄</h2>
                <pre>{{ JSON.stringify(data, null, 2) }}</pre>
                <button @click="handleSignOut">登出</button>
            </div>
            <div v-else>
                <h2>未登錄</h2>
                <form @submit.prevent="handleSignIn">
                    <input v-model="email" placeholder="電子郵件" type="email" />
                    <input v-model="password" placeholder="使用者密碼" type="password" />
                    <button type="submit">登入
                    </button>
                </form>
            </div>
        </div>
        <div v-if="error">錯誤: {{ error }}</div>
    </div>
</template>

<script setup>
const { data, status, signIn, signOut, pending, error } = useAuth()

const email = ref('test@example.com')
const password = ref('password')

async function handleSignIn() {
    try {
        const result = await signIn('credentials', {
            email: email.value,
            password: password.value,
            redirect: false
        })
        console.log('登錄结果:', result)
    } catch (e) {
        console.error('登錄错误:', e)
    }
}

async function handleSignOut() {
    await signOut({ redirect: false })
}
</script>
```
