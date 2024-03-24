const connection = require('../connection');


exports.logIp = (ip) => {
    let query = `INSERT INTO log(ip_address) VALUES ('${ip}');`;
    console.log(query);
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log("error in LogIP"+err);
            return;
        }
        console.log("Logged IP");
    })
}

