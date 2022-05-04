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
        try {
            let questions = await query(`SELECT * FROM lu_questions`)
            resolve(questions)

        } catch (err) {
            console.log(err)
            reject("something went wrong!")
        }

    })
}