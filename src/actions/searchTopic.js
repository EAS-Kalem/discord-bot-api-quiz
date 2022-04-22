module.exports = {
  name: "searchTopic",
  default: (cmd) => {
    return new Promise((resolve, reject) => {
      console.log("HIT");
      searchTopic(topic, resolve, reject).then(result => {
        connection.query(`SELECT * FROM quiz_table WHERE topic="${topic}"`, function (err, result, fields) {
          if (err) {
            reject(err)
          }
          if (topic) {
            console.log("Quiz about " + topic)
            waiting = "true"
            questions = []
            questions.push(result)
            d => (topic ? d.topic.toLowerCase().indexOf(topic.toLowerCase()) >= 0 : true)
            for (i = 0; i < 5; i++) {
              if (result[i]) {

                console.log(result[i])
              }
            }
          } else {
            console.log('not a valid topic')
          }
          resolve (questions[i])
        });
       // resolve({ status: "success", status_message: "quiz_created", discord_message: discord_response, lock: false })
      }).catch(err => {
        reject({ status: "error", status_message: "quiz_creation_failed" })
      })
    })
  }
}





