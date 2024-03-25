const express = require('express')
const router = express.Router();
const { logIp } = require('../database/services/Primary');
const api = require("./api")


router.get("/", (req, res) => {
    logIp(req);
    res.send("Booknary!");
})

router.use("/api", api);


module.exports = router;