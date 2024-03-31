const express = require('express');
const { getMeaning } = require('../database/services/Test/Test');
const router = express.Router();


router.get('/word', async (req, res) => {
    if (req.body?.word == null) {
        return res.status(400).send("Bad Request");
    }
    try {
        const meaning = await getMeaning(req.body.word);
        return res.send(meaning);
    }
    catch (error) {
        return res.send(error);
    }
})


module.exports = router; 