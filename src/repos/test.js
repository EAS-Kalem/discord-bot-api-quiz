const mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'mysql'
});

connection.connect();


let sqlRepo = {
  //GET ALL QUESTIONS
  //GET from quiz_table DB
  get: function (resolve, reject) {
    connection.query("SELECT * FROM quiz_table", function (err, result, fields) {
      if (err) {
        reject(err)
      }
      resolve(result);
      console.log(result);
    });

  },
  //GET INDIVIDUAL DATA
  //GET from individual_table DB
  searchIndividual: function (individual, resolve, reject) {
    connection.query(`SELECT * FROM individual_table WHERE individual="${individual}"`, function (err, result, fields) {
      if (err) {
        reject(err)
      }
      if (individual) {
        questions = questions.filter(
          d => (individual ? d.individual.toLowerCase().indexOf(individual.toLowerCase()) >= 0 : true))
      }
      resolve(result);
    });
  },

  //GET 5 QUIZ QUESTIONS BY TOPIC
  //GET from quiz_table DB
  searchTopic: function (topic, resolve, reject) {
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

    // },
    // insert: function (newQuestion, resolve, reject) {
    //   const myArray = newQuestion.split("+");
    //   console.log(myArray[0]);
    //   connection.query(`INSERT quiz_table 
    //   (question, answer, topic, asked)  
    //   VALUES

//     resolve(result);
//   });
// },

  }
};

module.exports = sqlRepo