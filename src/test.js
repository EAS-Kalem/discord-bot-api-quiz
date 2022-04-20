const mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'mysql'
});

connection.connect();


let sqlRepo = {
  //get all Questions
  get: function (resolve, reject) {
    connection.query("SELECT * FROM quiz_table", function (err, result, fields) {
      if (err) {
        reject(err)
      }
      resolve(result);
    });

  },
  //get 5 quiz questions by topic
  getByTopic: function (topic, resolve, reject) {

    connection.query(`SELECT * FROM quiz_table WHERE topic="${topic}"`, function (err, result, fields) {
      if (err) {
        reject(err)
      }
      if (topic) {
        questions = questions.filter(
          d => (topic ? d.topic.toLowerCase().indexOf(topic.toLowerCase()) >= 0 : true))

        for (i = 0; i < questions.length; i++) {
          if (questions[i].asked == false) {
            toBeAsked.push(questions[i])
          }
        }
        for (i = 0; i < 5; i++) {
          if (toBeAsked[i].asked == false) {
            resolve(toBeAsked[i].question)
          }


          resolve(result);
        }
      }

    });

  }

module.exports = sqlRepo