let fs = require('fs');
const QUESTIONS_FILE = './assets/questions.json'
const SCORES_FILE = './assets/scores.json'
let quizRepo = {


    //DESCRIPTION: Get all questions
    //USE: GET http://localhost:3000/api
    //TODO: **Admin only functionality to be added**
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


    //DESCRIPTION: Search score and total answered questions for the user
    //USE: GET http://localhost:3000/api/searchscore/?name=kalem
    //TODO: **Categorise based on percentage answered right (Noob, Student, Wise & Veteran)**
    searchScores: function (searchObject, resolve, reject) {
        fs.readFile(SCORES_FILE, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let scores = JSON.parse(data);
                if (searchObject) {
                    scores = scores.filter(
                        p => (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true))
                }
                resolve(scores);
            }
        });
    },


    // DESCRIPTION: Search questions.json for questions of a certian topic e.g. "node", "git"
    // USE: GET http://localhost:3000/api/searchtopic/?topic=node
    // TODO: **Only display 5 questions to be added***
    searchTopic: function (searchObject, resolve, reject) {
        fs.readFile(QUESTIONS_FILE, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                toBeAsked = []
                let questions = JSON.parse(data);
                if (searchObject) {
                    questions = questions.filter(
                        d => (searchObject.topic ? d.topic.toLowerCase().indexOf(searchObject.topic.toLowerCase()) >= 0 : true))

                    for (i = 0; i < questions.length; i++) {
                        if (questions[i].asked == false) {
                            toBeAsked.push(questions[i]) 
                        }
                    }
                    for (i = 0; i < 5; i++){
                        if(toBeAsked[i].asked == false){
                            resolve(toBeAsked[i].question)
                        }
                        

                    }
                }
            }
        });
    },


    // DESCRIPTION: Add questions to questions.json 
    // USE: POST http://localhost:3000/api
    // TODO: **Skill tag only functionality to be added (node questions can be added by users with the node tag)***
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


