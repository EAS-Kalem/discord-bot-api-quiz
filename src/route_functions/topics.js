const spec = require('../spec.js');
const validator = require('validator');
const mysql = require('mysql');
const util = require('util');


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
        let topics = await query(`
        SELECT topic FROM lu_topic`)

        resolve(topics)

        } catch(err) {
             console.log(err)
            reject("something went wrong!")
        }
    })
}