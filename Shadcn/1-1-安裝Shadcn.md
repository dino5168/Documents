# 安裝

### 1.1 建立 Nuxt 專案 使用 nuxi (Comand Line Interface)

```sh
npx nuxi@latest init my-app
```

### 1.2 如果有問題安裝 typescript

```sh
npm install -D typescript
```

### 1.3 安裝 tailwindcss

```sh
npm install --save-dev @nuxtjs/tailwindcss
```

### 1.4 設定 nuxt.config.ts

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
});
```

### 1.5 建立 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

加入 /assets/css/tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... */
```

### 1.6 加入 shadcn-nuxt 模組

```sh
npx nuxi@latest module add shadcn-nuxt
```

### 1.7 Configure `nuxt.config.ts`[​](https://www.shadcn-vue.com/docs/installation/nuxt.html#configure-nuxt-config-ts)

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
```

### 1.8 產製 .nuxt 目錄

```sh
npx nuxi prepare

```

# 1.9 npx shadcn-vue@latest init

```
npx shadcn-vue@latest init
```

### 1.10 Configure components.json

```
Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes
```

### 1.11 加入需要的元件

```sh
npx shadcn-vue@latest add button
collapsible

```

npx shadcn@latest add collapsible

### 1.12 加入 Icon 使用 # Lucide Vue Next

```sh
npm install lucide-vue-next
```
