//const Promise = require('promise');
const res = require('express/lib/response');
const mysql = require('mysql');
const { actions } = require('../spec');
const fs = require('fs');
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
    console.log('Hit Switch')
    return new Promise(async (resolve, reject) => {
        let [botName, action, ...rest] = req.params.command.split(",");
        console.log(botName, action, ...rest)
        try {


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


                case "answer":
                    let [quizzExists] = await query(`
                    SELECT * FROM quizzes WHERE active = 1
                `)
                if (!quizzExists) {
                    return reject({ "status": "unsucsessful", "status_message": "quiz in progress", "discord_message": "There is no quiz in progress. `!quiz create <topic> <question_count>`?" });

                }
                    console.log('hit')
                    let [userAnswer] = await query(
                        `SELECT * FROM quiz_users
                    WHERE nickname=?`, req.headers.user)
                    let userIDAnswer
                    if (!userAnswer) {
                        // create the user
                        let { insertId } = await query(
                            `INSERT INTO quiz_users
                    (nickname) 
                    VALUES
                    (?)`, req.headers.user)
                        userIDAnswer = insertId
                    } else {
                        userIDAnswer = userAnswer.id
                    }

                    let [currentQuestion] = await query(
                        `SELECT quiz_questions.id as quiz_question_id, lu_questions.answer FROM quizzes
                    INNER JOIN quiz_questions
                    ON quiz_questions.quiz_id = quizzes.id
                    INNER JOIN lu_questions
                    ON quiz_questions.question_id = lu_questions.id

                    WHERE asked = 1 AND active = 1

                    ORDER BY quiz_questions.id DESC
                    LIMIT 1
                `)
                    let [checkIfAnswered] = await query(
                        `SELECT * FROM quiz_answers
                    WHERE quiz_question_id=? && user_id = ?`, [currentQuestion.quiz_question_id, userIDAnswer])
                    if (checkIfAnswered) {
                        return reject({ "status": "unsucsessful", "status_message": "quiz in progress", "discord_message": "You have already answered this question you dickhead." });

                    }
                    let answer = rest.join(" ")
                    let correct = answer.toLowerCase() == currentQuestion.answer.toLowerCase()
                    await query(
                        `INSERT INTO quiz_answers
                    (result, user_id, quiz_question_id, answer)
                    VALUES
                    (?, ?, ?, ?)
                `, [correct, userIDAnswer, currentQuestion.quiz_question_id, answer])



                    resolve({ "status": "success", "status_message": "answer", "discord_message": `Thanks ${req.headers.user}, your answer was recieved` });

                    break;


                case "create":
                    let [quizExists] = await query(`
                SELECT * FROM quizzes WHERE active = 1
            `)
                    if (quizExists) {
                        return reject({ "status": "unsucsessful", "status_message": "quiz in progress", "discord_message": "There is already a quiz in progress. `!quiz end`?" });

                    }
                    let rows = await query(`
                SELECT * FROM lu_topics 
                INNER JOIN lu_questions
                ON lu_topics.id=lu_questions.topic_id
                WHERE topic=?
            `, rest[0])
                    console.log(rest[0])
                    let currentIndex = rows.length, randomIndex;
                    while (currentIndex != 0) {
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex--;
                        [rows[currentIndex], rows[randomIndex]] = [
                            rows[randomIndex], rows[currentIndex]];
                    }
                    let questions = rows.slice(0, +rest[1])
                    let [user] = await query(
                        `SELECT * FROM quiz_users
                    WHERE nickname=?`, req.headers.user)
                    let userID
                    if (!user) {
                        // create the user
                        let { insertId } = await query(
                            `INSERT INTO quiz_users
                    (nickname) 
                    VALUES
                    (?)`, req.headers.user)
                        userID = insertId
                    } else {
                        userID = user.id
                    }
                    console.log(userID)
                    let { insertId: quizId } = await query(`
                    INSERT INTO quizzes
                    (user_id, active) 
                    VALUES
                    (?,?)
                `, [userID, true])
                    let { quizQuestions } = await query(`
                INSERT INTO quiz_questions
                (quiz_id, question_id, asked) 
                VALUES
                ${questions.map((question, idx) => idx == 0
                        ? `(${quizId},${question.id},TRUE)`
                        : `(${quizId},${question.id},FALSE)`)}
            `)

                    resolve({
                        "status": "success",
                        "status_message": "quiz",
                        "discord_message": questions[0].question,
                        "callback": {
                            timeout: 30,
                            command: "quiz,continue"
                        }
                    });


                    break;


                case "continue":

                    let [quizExist] = await query(`
                        SELECT * FROM quizzes WHERE active = 1
                    `)
                    if (!quizExist) {
                        return reject({ "status": "unsucsessful", "status_message": "quiz in progress", "discord_message": "There is no quiz in progress. `!quiz create <topic> <question_count>`?" });

                    }
                    let [question] = await query(
                        `SELECT quiz_questions.id as quiz_question_id, lu_questions.question FROM quizzes
                    INNER JOIN quiz_questions
                    ON quiz_questions.quiz_id = quizzes.id
                    INNER JOIN lu_questions
                    ON quiz_questions.question_id = lu_questions.id
                    
                    WHERE asked = 0 AND active = 1
                    
                    LIMIT 1`, )



                    if (!question) {
                        let results = await query(`
                            SELECT quiz_answers.result, quiz_users.nickname, quiz_users.id as user_id FROM quiz_answers
                            JOIN quiz_users ON quiz_users.id = quiz_answers.user_id
                            JOIN quiz_questions ON quiz_questions.id = quiz_answers.quiz_question_id
                            JOIN quizzes ON quizzes.id = quiz_questions.quiz_id
                            WHERE active = 1
                        `)

                        await query(`
                            UPDATE quizzes
                            SET 
                            active = 0
                            WHERE
                            active = 1;
                        `);

                        fs.writeFileSync( results.JSON, results,utf8 )
                        resolve({ "status": "success", "status_message": "quiz", "discord_message": JSON.stringify(results) });

                    } else {
                        let { question: question_text, quiz_question_id } = question
                        await query(`
                            UPDATE quiz_questions
                            SET 
                            asked = 1
                            WHERE
                            id =?;
                        `, quiz_question_id)
                        resolve({ "status": "success", "status_message": "quiz", "discord_message":question_text  });

                    }


                    break;
              



                case "searchscores":
                    let [userScore] = await query(
                        `SELECT * FROM quiz_users
                    WHERE nickname=?`, req.headers.user)

                    console.log(userScore.id)

                    let [userIdSearch] = await query(
                        `SELECT * FROM scoresTable
                        WHERE`
                    )
                    if (userScore) {
                        resolve({ "status": "success", "status_message": "User found", "discord_message": userScore.name });
                    }

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
                    };
                    break;

                default:
                // code block
            }
        } catch (err) {
            reject({ "status": "unsucsessful", "status_message": "User not found", "discord_message": err.message });

        }
    });
}
