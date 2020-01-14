let url = require("url");
let adr = "http://localhost:8080/default.htm?year=2017&month=february";
let q = url.parse(adr, true);

console.log("host: ", q.host);
console.log("pathname: ", q.pathname);
console.log("search: ", q.search);

let qdata = q.query;
console.log(qdata.month);
