const express = require('express');
const { sendBookData, getBookData } = require('../database/services/Primary');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('API');
});

router.post('/book_data', async (req, res) => {
    if ((req.body?.book == null) ||
        (req.body?.book?.title == null) ||
        (req.body?.book?.content) == null) {
        return res.status(400).send("Bad Request");
    }

    try {
        const response = await sendBookData(req.body.book.title, req.body.book.content);
        return res.status(response.code).send(response.message);
    }
    catch (error) {
        console.log(error)
        return res.status(error.code).send(error.message);
    }
})

router.get('/analysis/:book_id', async (req, res) => {
    const book_id = req.params.book_id;
    try {
        const response = await getBookData(book_id);
        return res.status(response.code).json(response.message);
    }
    catch (error) {
        console.log(error)
        return res.status(error.code).send(error.message);
    }
})

router.get('/health_checkup', (req, res) => {
    res.send("Health Checkup")
})

module.exports = router; 