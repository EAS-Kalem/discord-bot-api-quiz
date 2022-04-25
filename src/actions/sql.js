//const Promise = require('promise');
const mysql = require('mysql');
const { actions } = require('../spec');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'mysql'
});

connection.connect();


exports.func = req => {
    console.log('Hit Switch')
    return new Promise((resolve, reject) => {
        let [botName, action, ...rest] = req.params.command.split(",");

        let query = "";
        switch (action) {
            case "owner":
                resolve({ "status": "success", "status_message": "Get owner", "discord_message": "Karen hale" });
                break;

            case "actions":
                resolve({ "status": "success", "status_message": "Get all actions", "discord_message": "'Actions' n\ Get All: 'get' n\ Quiz By Topic: 'searchtopic topic' n\ Search Scores: 'searchscores kalem' n\ Insert New Question: 'insertquestion question answer topic' n\ Insert New User: 'insertIndividual Liam' n\ Owner: 'owner'" });
                break;

            case "get":
                connection.query("SELECT * FROM quiz_table", function (err, result, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({ "status": "success", "status_message": "Question", "discord_message": result });
                    }
                })
                break;

            case "actions":
                resolve({ "status": "success", "status_message": "Question", "discord_message": "'Actions' n\ Get All: 'get' n\ Quiz By Topic: 'searchtopic topic' n\ Search Scores: 'searchscores kalem' n\ Insert New Question: 'insertquestion question answer topic' n\ Insert New User: 'insertIndividual Liam'" });
                break;

            case "get":
                connection.query("SELECT * FROM quiz_table", function (err, result, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({ "status": "success", "status_message": "Question", "discord_message": result });
                    }
                })
                break;

            case "searchtopic":
                connection.query(`SELECT * FROM quiz_table WHERE topic="${rest.join(" ")}"`, function (err, result, fields) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    if (rest.join(" ")) {
                        console.log("Quiz about " + rest.join(" "))
                        // waiting = "true"
                        // questions = []
                        // questions.push(result)
                        var message = " ";
                        for (i = 0; i < result.length; i++) {
                            message += result[i].question + "\n"
                        }
                        resolve({ "status": "success", "status_message": "Question", "discord_message": message });
                    } else {
                        console.log('not a valid topic')
                    }
                });
                break;

            case "searchcores":
                connection.query(`SELECT * FROM scores_table WHERE individual="${rest.join(" ")}"`, function (err, result, fields) {
                    if (err) {
                        reject ({ "status": "unsucsessful", "status_message": "User not found", "discord_message": "You do not have the right permissions to add questions" });
                    }
                    if (rest.join(" ")) {
                        resolve({ "status": "success", "status_message": "User found", "discord_message": result });
                    }
                })
                break;

            case "insertquestion":
                if (user == admin) {
                    console.log('bob')
                    query = `INSERT INTO quiz_table
                (question, answer, topic, asked) 
                 VALUES (?, ?, ?, ?)`;

                    connection.query(query, rest, function (err, result, fields) {
                        if (err) {
                            reject(err)
                        }
                        resolve({ "status": "success", "status_message": "Question added", "discord_message": "uploaded" + result });
                    });
                } else {
                    resolve({ "status": "unsucsessful", "status_message": "Unauthorized", "discord_message": "You do not have the right permissions to add questions" });
                }
                break;

            case "insertindividual":
                if (user == admin) {
                    console.log('bob')
                    query = `INSERT INTO scores_table
                (individual, totalQuestions, totalScore) 
                 VALUES (?, 0, 0)`;

                    connection.query(query, rest, function (err, result, fields) {
                        if (err) {
                            reject(err)
                        }
                        resolve({ "status": "success", "status_message": "Individual added", "discord_message": "added" + result });
                    });
                } else {
                    resolve({ "status": "unsucsessful", "status_message": "Unauthorized", "discord_message": "You do not have the right permissions to add users" });
                }
                break;

            default:
            // code block
        }
    });
}
