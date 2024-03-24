const express = require("express");
require('dotenv').config();

const api = require("./api");
const { logIp } = require("./database/services/Primary");
const app = express();
const port = process.env.PORT || 8000;

app.use("/api", api);

app.get("/",(req,res)=>{
    logIp(req.ip);
    res.send("hi");
})


app.listen(8000, () => {
    console.log("RUNNING ON PORT:" + port);
})

