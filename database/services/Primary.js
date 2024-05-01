const connection = require('../connection');
const fs = require('fs');

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

function removeQuotes(input) {
    return input.replace(/['"\n]/g, '');
}

function removeSlashes(input) {
    return input.replace(/[\/\\]/g, '');
}

function getBookMeaning(sanitizedInput) {

    const words = sanitizedInput.split(" ");
    let meanings = new Map();
    return new Promise((resolve, reject) => {
        fs.readFile('./dictionary/dictionary.json', 'utf-8', (err, data) => {
            if (err) {
                console.log("Error in getBookMeaning " + err);
                reject("Error in opening Dictionary");
            }
            const dictionary = JSON.parse(data);
            for (let word of words) {
                if (/^[a-zA-Z]/.test(word)) {     // only get meaning of words
                    const meaning = dictionary[((word[0].toLowerCase()).charCodeAt(0) - 97)][word.toLowerCase()];
                    if(meaning)
                    meanings.set(word, removeSlashes(removeQuotes(meaning))); // will change for simpler words, this will be changed
                }
            }
            resolve(meanings);
        })
    })


}

exports.sendBookData = async (title, content) => {
    const sanitizedInput = sanitizeInput(content);
    let meaning;
    try {
        meaning = await getBookMeaning(sanitizedInput);
        meaning = JSON.stringify(Object.fromEntries(meaning));
    }
    catch (error) {
        console.log("Error in getBookMeaning " + error);
    }
    let query = `INSERT INTO book(book_name,book_content,meaning) VALUES ('${title}','${sanitizedInput}','${meaning}');`;
    console.log(query);
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result, fields) => {
            if (err) {
                console.log("Error in executing sendBookData:" + err);
                reject({ code: 500, message: "There is an error" });
            }
            console.log("sendBookData executed");
            resolve({ code: 200, message: String(result.insertId)});
        })
    })

}

exports.getBookData = async (id) => {
   
    let query = `SELECT book_name,meaning FROM book WHERE id=${id};`;
    console.log(query);
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result, fields) => {
            if (err) {
                console.log("Error in executing getBookData:" + err);
                reject({ code: 500, message: "There is an error" });
            }
            result[0].meaning = JSON.parse((result[0].meaning));                    // Text to parse, since JSON type was re-ordering
            console.log("sendBookData executed");
            resolve({ code: 200, message: result});
        })
    })

}


