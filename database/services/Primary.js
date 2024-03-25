const connection = require('../connection');


const parseIp = (req) =>
  (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
  req.socket.remoteAddress;


exports.logIp = (req) => {
    const header = JSON.stringify(req.headers);
    const ip = parseIp(req);
    let query = `INSERT INTO log(ip_address,device_description) VALUES ('${ip}','${header}');`;
    console.log(query);
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log("error in LogIP"+err);
            return;
        }
        console.log("Logged IP");
    })
}

