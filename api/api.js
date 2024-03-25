const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    res.send('API');
});

router.post('/book_data', (req, res) => {
    console.log(req.body)
    res.send("book logged");
})

router.get('/health_checkup', (req, res) => {

})

module.exports = router;