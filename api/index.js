const express = require('express')
const router = express.Router();
const { logIp } = require('../database/services/Primary');
const api = require("./api")
const test = require("./test")

router.get("/", (req, res) => {
    logIp(req);
    res.send("Booknary!");
})

router.use("/api", api);
router.use("/test", test);


module.exports = router;