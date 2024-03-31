const fs = require("fs");

const data = fs.readFileSync("./../../../dictionary/dictionary.json","utf-8");
const dic = JSON.parse(data);
const meaning = dic[1]["biggest"];
const length = Object.keys(dic[1]).length;
console.log(length);

console.log(meaning);

