const boxen = require("boxen");

const message = "I am using my first external module!";
const title = "Hurray!!!";

const box1 = boxen(message, { title, padding: 1, margin: 1 });
console.log(box1);

const box2 = boxen(message, { title, padding: 1, margin: 1, borderStyle: "singleDouble" });
console.log(box2);

const box3 = boxen(message, { title, padding: 1, margin: 1, borderStyle: "round" });
console.log(box3);
