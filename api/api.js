const express = require('express');
const { sendBookData } = require('../database/services/Primary');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('API');
});

router.post('/book_data', (req, res) => {
    console.log(req.body.body);
    sendBookData(req.body.body.title,req.body.body.content)
    res.send("book logged");
})

router.get('/health_checkup', (req, res) => {
    res.send("Health Checkup")
})

module.exports = router;