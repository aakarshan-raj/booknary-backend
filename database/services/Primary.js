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
            console.log("Error in executing logIp:" + err);
            return;
        }
        console.log("logIp executed");
    })
}

function sanitizeInput(input) {
    return input.replace(/'/g, "''");
}

exports.sendBookData = async (title, content) => {
    const sanitizedInput = sanitizeInput(content);  

    let query = `INSERT INTO boofk(book_name,book_content) VALUES ('${title}','${sanitizedInput}');`;
    console.log(query);
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result, fields) => {
            if (err) {
                console.log("Error in executing sendBookData:" + err);
                reject({ code: 500, message: "There is an error" });
            }
            console.log("sendBookData executed");
            resolve({ code: 200, message: "book logged" });
        })
    })
}

