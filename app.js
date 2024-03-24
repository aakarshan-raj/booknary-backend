const express = require("express");
require('dotenv').config();

const api = require("./api");
const app = express();
const port = process.env.PORT || 8000;

app.use("/api", api);


app.listen(8000, () => {
    console.log("RUNNING ON PORT:" + port);
})

