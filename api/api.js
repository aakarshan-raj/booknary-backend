const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    res.send('API');
});

router.get('/health_checkup', (req, res) => {

})

module.exports = router;