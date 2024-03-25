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
            console.log("Error in executing logIp:"+err);
            return;
        }
        console.log("logIp executed");
    })
}

exports.sendBookData = (title,content) => {
    let query = `INSERT INTO book(book_name,book_content) VALUES ('${title}','${content}');`;
    console.log(query);
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log("Error in executing sendBookData:"+err);
            return;
        }
        console.log("sendBookData executed");
    })
}

