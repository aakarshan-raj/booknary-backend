const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());

const api = require("./api");
const port = process.env.PORT || 8000;

app.use(express.json({limit: '50mb'}));

app.use("/", api);


app.listen(8000, () => {
    console.log("RUNNING ON PORT:" + port);
})

