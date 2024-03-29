const express = require('express');
const { sendBookData } = require('../database/services/Primary');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('API');
});

router.post('/book_data', async (req, res) => {
    console.log(req.body.body);
    try {
        const response = await sendBookData(req.body.body.title, req.body.body.content);
        return res.status(response.code).send(response.message);
    }
    catch (error) {
        return res.status(error.code).send(error.message);
    }
})

router.get('/health_checkup', (req, res) => {
    res.send("Health Checkup")
})

module.exports = router;