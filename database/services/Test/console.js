const fs = require("fs");

const data = fs.readFileSync("./../../../dictionary/dictionary.json","utf-8");
const dic = JSON.parse(data);

const word = "almsgiving";

const meaning = dic[word[0].toLowerCase().charCodeAt(0)-97][word.toLowerCase()];

let s = new Map();
s.set(word,meaning)

const x = "aa";
const y = dic[word[0].toLowerCase().charCodeAt(0)-97][word.toLowerCase()];

s.set(x,y)

const o = JSON.stringify(Object.fromEntries(s));


console.log(o);

