
const fs = require('fs');


exports.getMeaning = async (word) => {

    return new Promise((resolve, reject) => {
        fs.readFile('./dictionary/dictionary.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject("Internal server Error")
            }

            try {
                const jsonData = JSON.parse(data);
                const result = jsonData[(word[0].toUpperCase().charCodeAt(0)-65)][word];
                if (result) {
                    resolve(result)
                } else {
                    resolve("[Word not found.]")
                }
            } catch (error) {
                console.error(error);
                reject("Internal server Error")
            }
        });
    })

}


