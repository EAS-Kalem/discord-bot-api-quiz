const express = require('express')
const res = require("express/lib/response");
let router = express.Router();
let quizRepo = require("../repos/quizRepo")
const app = express();
app.use(express.json());

const { Sequelize } = require('sequelize');



let timeout;



function timeoutFunction() {
    timeout = setTimeout(nextQuestion, 3000);
}

function nextQuestion() {
    return ("data")
}
//DESCRIPTION: Get all questions
//USE: GET http://localhost:3000/api
//TODO: **Admin only functionality to be added**
router.get('/', function (req, res, next) {
    quizRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All Questions retrived.",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});


//DESCRIPTION: Search score and total answered questions for the user
//USE: GET http://localhost:3000/api/searchscore/?name=kalem
//TODO: **Categorise based on percentage answered right (Noob, Student, Wise & Veteran)**
router.get('/searchscore', function (req, res, next) {
    let searchObject = {
        "name": req.query.name
    };
    quizRepo.searchScores(searchObject, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Individual score retrived.",
            "data": data
        });

    }, function (err) {
        next(err);
    });
});


// DESCRIPTION: Search questions.json for questions of a certian topic e.g. "node", "git"
// USE: GET http://localhost:3000/api/searchtopic/?topic=node
// TODO: **Only display 5 questions to be added***
router.get('/searchtopic', function (req, res, next) {
    let topicArray;
    let searchObject = {
        "topic": req.query.topic
    };
    quizRepo.searchTopic(searchObject, function (data) {
        topicArray = data
        let askMe 
        for (i = 0; i < 15; i++) {
            if (topicArray[i].asked == "false") {
               askMe = topicArray[i]
            }
            if (topicArray[i].asked == "true") {
                console.log('used')
            }
        
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "A " + req.query.topic + " quiz was created",
            "data": askMe
        });
    }
        timeoutFunction()

    }, function (err) {
        next(err);
    });
});


setTimeout(function () {
}, 3000);
// DESCRIPTION: Add questions to questions.json 
// USE: POST http://localhost:3000/api
// TODO: **Skill tag only functionality to be added (node questions can be added by users with the node tag)***
router.post('/', function (req, res, next) {
    quizRepo.insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Question Added",
            "data": data
        })
    }, function (err) {
        next(err)
    })
});


app.use('/api/', router);
app.listen(4000, () => {
    console.log('Node server is running on port 4000');
})

