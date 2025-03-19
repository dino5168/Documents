new Promise((resolve, reject) => {
  resolve(1);
})
  .then((result) => result * 2)
  .then((result) => result * 2)
  .then((result) => console.log(result));
