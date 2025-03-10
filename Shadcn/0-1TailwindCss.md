# 搭配 Tailwind css 使用時須加入

tailwind css 設定需要顯示的 Page :
請確保 Tailwind 能夠掃描你的 Vue/HTML 檔案，修改 content 為：

```ts
content: ["./pages/**/*.{vue,js,ts,jsx,tsx}", "./components/**/*.{vue,js,ts,jsx,tsx}"],
```
