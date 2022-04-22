const Promise = require('promise');
const mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'mysql'
});

connection.connect();


exports.func = req => {
    return new Promise((resolve, reject) => {
        let params = req.params.command.split(",");
        console.log("params 1 = " + params);

        let query = "";

        switch (params[1]) {
            case "get":
                query = "SELECT * FROM quiz_table", function (err, result, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(`"status": "success", "status_message": "Question", "discord_message": "` + result + `"`);
                    }

                }
                break;
            case "searchTopic":

                query = `SELECT * FROM quiz_table WHERE topic="${params[2]}"`, function (err, result, fields) {
                    if (err) {
                        reject(err)
                    }
                    if (params[2]) {
                        console.log("Quiz about " + params[2])
                        waiting = "true"
                        questions = []
                        questions.push(result)
                        d => (params[2] ? d.params[2].toLowerCase().indexOf(params[2].toLowerCase()) >= 0 : true)
                        for (i = 0; i < 5; i++) {
                            if (result[i]) {
                                resolve(`"status": "success", "status_message": "Question", "discord_message": "` + questions[i].question + `"`);
                                console.log(result[i])
                            }
                        }
                    } else {
                        console.log('not a valid topic')
                    }

                }

                break;
            case "searchScores":
                query = `SELECT * FROM individual_table WHERE individual="${individual}"`, function (err, result, fields) {
                    if (err) {
                        reject(err)
                    }
                    if (individual) {
                        questions = questions.filter(
                            d => (individual ? d.individual.toLowerCase().indexOf(individual.toLowerCase()) >= 0 : true))

                        resolve({ "status": "success", "status_message": "individual_found", "discord_message": result });
                    }


                }

                break;
            default:
            // code block
        }

        //connection.end();  ?? where do you go??


    });



}
