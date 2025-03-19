import fs, {promises} from "fs";
import {resolve} from "path";

async function loadImage(imgPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        reject(err); // 讀取失敗，reject 錯誤
      } else {
        resolve(data); // 讀取成功，resolve 回傳圖片數據
      }
    });
  });
}

let imgPath = "C:/temp/5391.png";

await loadImage(imgPath)
  .then((data) => {
    console.log("Image loaded successfully!");
    console.log("File size:", data.length, "bytes");
  })
  .catch((err) => {
    console.error("Failed to load image 0:", err);
  });

function checkState(flag) {
  return new Promise((resolve, reject) => {
    if (flag) {
      resolve();
    } else {
      reject();
    }
  });
}

checkState(true).then(console.log("true")).catch(console.log("false"));

/*
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("任務 1 完成"), 3000)),
  new Promise((resolve) => setTimeout(() => resolve("任務 2 完成"), 1000)),
])
  .then((result) => console.log("最快的:", result))
  .catch((err) => console.error("錯誤:", err));
  */
