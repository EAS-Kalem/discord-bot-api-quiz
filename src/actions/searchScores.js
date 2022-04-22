module.exports = {
    name: "searchIndividual",
    default: (cmd) => {
      return new Promise((resolve, reject) => {
        console.log("HIT");
        searchIndividual(individual, resolve, reject).then(result => {
            connection.query(`SELECT * FROM individual_table WHERE individual="${individual}"`, function (err, result, fields) {
              if (err) {
                reject(err)
              }
              if (individual) {
                questions = questions.filter(
                  d => (individual ? d.individual.toLowerCase().indexOf(individual.toLowerCase()) >= 0 : true))
              }
              resolve({"status": "success", "status_message": "quiz_created", "discord_message": result});
          });
         // resolve({ status: "success", status_message: "quiz_created", discord_message: discord_response, lock: false })
        }).catch(err => {
          reject({ status: "error", status_message: "quiz_creation_failed" })
        })
      })
    }
}