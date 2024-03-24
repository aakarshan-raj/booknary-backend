const express = require('express')
const router = express.Router();
const connection = require('./database/connection');

router.get('/', (req, res) => {
    const sql = 
        'select * from log';     // this will be imported from services

    connection.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(result);
        console.log(fields);
    });

    res.send('API');
});

router.get('/health_checkup', (req, res) => {

})

module.exports = router;