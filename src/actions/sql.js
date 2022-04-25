//const Promise = require('promise');
const mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'mysql'
});

connection.connect();


exports.func = req => {
    console.log('monkey')
    return new Promise((resolve, reject) => {
        let [botName, action, ...rest] = req.params.command.split(",");
        console.log('monkey2')

        let query = "";

        switch (action) {
            case "get":
                connection.query("SELECT * FROM quiz_table", function (err, result, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({ "status": "success", "status_message": "Question", "discord_message": result });
                    }

                })
                break;
            case "searchTopic":
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
            case "searchScores":
                connection.query(`SELECT * FROM scores_table WHERE individual="${rest.join(" ")}"`, function (err, result, fields) {
                    if (err) {
                        reject(err)
                    }
                    if (rest.join(" ")) {



                        resolve({ "status": "success", "status_message": "individual_found", "discord_message": result });
                    }
                })
                break;
            case "insert":
                console.log('bob')
                query = `INSERT INTO quiz_table
                (question, answer, topic, asked) 
                 VALUES (?, ?, ?, ?)`;

                connection.query(query, rest, function (err, result, fields) {
                    if (err) {
                        reject(err)
                    }
                    resolve({ "status": "success", "status_message": "sucsess", "discord_message": "uploaded" + result });
                });

                break;
            default:
            // code block
        }
    });
}
