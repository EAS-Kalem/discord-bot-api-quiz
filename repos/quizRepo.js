let fs = require('fs');
const QUESTIONS_FILE = './assets/questions.json'
const SCORES_FILE = './assets/scores.json'
let quizRepo = {
    get: function (resolve, reject) {
        fs.readFile(QUESTIONS_FILE, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },  
    
    insert: function (newData, resolve, reject) {
        fs.readFile(QUESTIONS_FILE, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let questions = JSON.parse(data)
                questions.push(newData);
                fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                })
            }
        });
    },

};
module.exports = quizRepo;


