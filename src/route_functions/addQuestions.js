const spec = require('../spec.js');
const validator = require('validator');
const mysql = require('mysql');
const util = require('util');
const { table } = require('console');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'mysql'
});
connection.connect();
const query = util.promisify(connection.query).bind(connection);


exports.func = req => {
    return new Promise(async (resolve, reject) => {
        let question = req.body.question
        let answer =  req.body.answer 
        let [findTopic] = await query(`
                    SELECT * FROM lu_topic WHERE topic=?
                    `, req.body.topic);
                    let topicId
                    if(!findTopic){
                        let {insertId} = await query(`
                            INSERT INTO lu_topic
                            (topic) 
                            VALUES (?)
                        `, req.body.topic);
                        topicId = insertId
                    } else {
                        topicId = findTopic.id
                    }
                    let addQuestions = await query(`
                    INSERT INTO lu_questions
                    ( topic_id,question, answer) 
                     VALUES (?, ?, ?)`, [topicId, question, answer]);

                        resolve({ topicId ,question,answer });
                    
   console.log(req.body)
   resolve({})
    })
}