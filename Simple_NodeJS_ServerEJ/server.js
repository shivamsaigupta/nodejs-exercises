const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = 8080;

app.listen(PORT, () => console.log("Server running..."));
