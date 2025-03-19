function checkState(flag) {
  return new Promise((resolve, reject) => {
    const parm = "test";
    if (flag) {
      resolve(parm);
    } else {
      reject();
    }
  });
}

checkState(true)
  .then((parm) => console.log(parm))
  .catch(() => console.log("false"));
