const data = require("./../data/temasekwreck/datasets/pb1ceramicsCOPY.json");
const fs = require("fs");

const theJsonData = data.dataset.data;
console.log("loaded daa");

const theOutData = theJsonData.sort((a, b) => {
  if (a.uin < b.uin) {
    return -1;
  }
  if (a.uin > b.uin) {
    return 1;
  }
  return 0;
});

console.log("\nOutput:\n\n", theOutData);
const newFile = data;
newFile.dataset.data = theOutData;
fs.writeFile("./scripts/output.json", JSON.stringify(newFile), (err) => {
  if (err) {
    throw err;
  }
  console.log("complete");
});
