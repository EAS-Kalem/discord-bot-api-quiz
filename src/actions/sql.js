//const Promise = require('promise');
const res = require('express/lib/response');
const mysql = require('mysql');
const { actions } = require('../spec');
const axios = require('axios').default;
const util = require('util');
const { memoryUsage } = require('process');


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
                case "stats":
                    const previousUsage = process.cpuUsage();
                    // { user: 38579, system: 6986 }

                    // spin the CPU for 500 milliseconds
                    const startDate = Date.now();
                    while (Date.now() - startDate < 500);

                    // At this moment you can expect result 100%
                    // Time is *1000 because cpuUsage is in us (microseconds)
                    const usage = process.cpuUsage(previousUsage);
                    const memory = process.memoryUsage(previousUsage);

                    const usageResult = 100 * (usage.user + usage.system) / ((Date.now() - startDate) * 1000)

                    console.log(usageResult);

                    // set 2 sec "non-busy" timeout
                    var heapFree = 0
                    setTimeout(function () {
                        console.log(usage.heapTotal);
                        console.log(memory.heapTotal);
                        console.log(memory.heapUsed);

                    }, 2000);
                    heapFree += parseInt(memory.heapTotal) - parseInt(memory.heapUsed)
                    resolve({ "status": "success", "status_message": "Question", "discord_message": "CPU " + usageResult + "\n Memory used" + process.memoryUsage(previousUsage).heapUsed + "\n Memory free" + heapFree });
                    break;
                //DONE
                case "owner":
                    resolve({ "status": "success", "status_message": "Get owner", "discord_message": "Kalem Hale" });
                    break;
                //NOT DONE*************************
                case "get":
                    connection.query("SELECT * FROM quiz_table", function (err, result, fields) {
                        if (err) {
                            reject({ "status": "unsuccsessful", "status_message": "Unable to get questions", "discord_message": "Unable to get questions" })
                        } else {
                            resolve({ "status": "success", "status_message": "Get all questions", "discord_message": result });
                        }
                    })

                    break;

                //DONE
                case "actions":
                    
                    resolve({ 
                        "status": "success",
                         "status_message": "Question",
                          "discord_message": "**ACTIONS** \n\n**Quiz Actions**\n**Create By Topic:**\ `!quiz start <topic> <numberOfQuestions>\`\n**Continue quiz:**\ `!quiz continue\` \n**Answer question:** \ `!quiz answer <answer>\`\n**End quiz:**\ `!quiz end\`\n\n**Other Actions**\n**Valid Actions:**\ `!quiz actions\`\n**Search your data:**\ `!quiz scores\`\n**Insert new question:**\ `!quiz insert <topic> <question> | <answer>\`\n**Quiz creator:**\ `!quiz owner\`\n**Get topics:**\ `!quiz topics\`" });
                    break;

                //DONE
                case "answer":
                    console.log('bob')
                    let [quizzExists] = await query(`
                    SELECT * FROM quizzes WHERE active = 1
                `)

                    if (!quizzExists) {
                        return reject({ "status": "unsucsessful", "status_message": "quiz in progress", "discord_message": "There is no quiz in progress. `!quiz start <topic> <question_count>`?" });

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
                `   )
                    let [checkIfAnswered] = await query(
                        `SELECT * FROM quiz_answers
                        WHERE quiz_question_id=? && user_id = ?`, [currentQuestion.quiz_question_id, userIDAnswer])
                    if (checkIfAnswered) {
                        return reject({ "status": "unsucsessful", "status_message": "quiz in progress", "discord_message": "You have already answered this question " +req.headers.user +" you dickhead." });

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

                //DONE
                case "start":
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
                            command: "!quiz continue"
                        }
                    });


                    break;

                //DONE
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
                            SELECT quiz_answers.result, lu_questions.question, quiz_answers.answer, quiz_users.nickname, quiz_users.id as user_id FROM quiz_answers
                            JOIN quiz_users ON quiz_users.id = quiz_answers.user_id
                            JOIN quiz_questions ON quiz_questions.id = quiz_answers.quiz_question_id
                            JOIN lu_questions ON quiz_questions.question_id = lu_questions.id
                            JOIN quizzes ON quizzes.id = quiz_questions.quiz_id
                            WHERE active = 1
                        `)

                        await query(`
                            UPDATE quizzes
                            SET 
                            active = 0
                            
                            WHERE active = 1
                        `)

                        for (i = 0; i < results.length; i++) {

                            let [user] = await query(`
                                SELECT * FROM scores_table
                                WHERE user_id = ?
                            `, results[i].user_id)

                            if (!user) {
                                let { insertId } = await query(`
                                    INSERT INTO scores_table
                                    (user_id, totalQuestions, totalScore)
                                    VALUES
                                    (?, 0, 0)
                                `, results[i].user_id)
                            }

                            if (results[i].result) {

                                await query(`
                                    UPDATE scores_table
                                    SET 
                                    totalQuestions = totalQuestions + 1,
                                    totalScore = totalScore + 1
                                    WHERE user_id = ?
                                `, results[i].user_id)

                            } else {
                                await query(`
                                    UPDATE scores_table
                                    SET 
                                    totalQuestions = totalQuestions + 1
                                    WHERE user_id = ?
                                `, results[i].user_id)
                            }

                        }




                        let questionsMap = {}

                        results.map(result => {
                            if (!questionsMap[result.question]) {
                                questionsMap[result.question] = []
                            }
                            questionsMap[result.question].push(`${result.nickname} answered with ${result.answer}.${result.result ? ':white_check_mark:' : ':red_square:'}`)
                        })

                        let resultMessage = ""
                        for (let key in questionsMap) {
                            resultMessage += `**Q: ${key}**\n`
                            resultMessage += questionsMap[key].join("\n")
                            resultMessage += "\n\n"
                        }

                        resolve({ "status": "success", "status_message": "quiz", "discord_message": resultMessage });

                    } else {
                        let { question: question_text, quiz_question_id } = question

                        await query(`
                            UPDATE quiz_questions
                            SET 
                            asked = 1
                            WHERE
                            id =?;
                        `, quiz_question_id)

                        resolve({
                            "status": "success",
                            "status_message": "quiz",
                            "discord_message": question_text,
                            "callback": {
                                timeout: 30,
                                command: "!quiz continue"
                            }
                        });

                    }
                    break;


                


                case "scores":
                    let [userScore] = await query(
                        `SELECT * FROM quiz_users
                    WHERE nickname=?`, req.headers.user)

                    console.log(userScore.id)

                    let [userIdSearch] = await query(
                        `SELECT * FROM scores_table
                        WHERE id=?`, userScore.id
                    )
                    if (userScore) {
                        resolve({ "status": "success", "status_message": "User found", "discord_message": "\n " + "****" + req.headers.user + "**** ****s Stats\nYour score is ****" + JSON.stringify(userIdSearch.totalScore) + "\n****You have answered a total of**** " + JSON.stringify(userIdSearch.totalQuestions) + " questions" });
                    }

                    break;


                case "end":
                    await query(`
                        UPDATE quizzes
                        SET 
                        active = 0
                        WHERE
                        active = 1;`)
                    resolve({ "status": "success", "status_message": "User found", "discord_message": "Quiz has been ended" });
                    break




                        let [something, ...second] = ["dsadas", "dsadsad", "dsadsasd"]

                        console.log(something) // dsadas
                        console.log(second) // ["dsadsad", "dsadsasd"]





            case "topics":
                let findAllTopics = await query(`
                SELECT topic FROM lu_topics `)
              let str = "**List of all available topics** \n"
                for (i=0; i<findAllTopics.length; i++){
                    str +=  findAllTopics[i].topic + "\n"
                 
                    console.log(findAllTopics[i].topic)
                }
   
    resolve({ "status": "success", "status_message": "User found", "discord_message": str });
                
                break

                case "insert":
                    //insert <topic> <question> <answer>
                    let [topic, ...questionAnswer] = rest
                    let [theQuestion, theAnswer] = questionAnswer.join(" ").split("|");

                    let [findTopic] = await query(`
                    SELECT * FROM lu_topics WHERE topic=?
                    `, topic);
                    let topicId
                    if(!findTopic){
                        let {insertId} = await query(`
                            INSERT INTO lu_topics
                            (topic) 
                            VALUES (?)
                        `, rest[0]);
                        topicId = insertId
                    } else {
                        topicId = findTopic.id
                    }
                    let addQuestions = await query(`
                    INSERT INTO lu_questions
                    ( topic_id,question, answer) 
                     VALUES (?, ?, ?)`, [topicId, theQuestion.trim(), theAnswer.trim()]);

                        resolve({ "status": "success", "status_message": "Question added", "discord_message": `Added the question: "${theQuestion}"` });
                    

                    break;


                default:
                // code block
            }
        } catch (err) {
            reject({ "status": "unsucsessful", "status_message": "User not found", "discord_message": err.message });

        }
    });
}
