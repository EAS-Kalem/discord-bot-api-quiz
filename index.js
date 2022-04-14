const express = require('express')
const res = require("express/lib/response");
let router = express.Router();
let quizRepo = require("./repos/quizRepo")

const app = express();
app.use(express.json());

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

router.get('/search/:id', function (req, res, next) {
    quizRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "individual score retrived.",
                "data": data
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The score for '" + req.params.id + " ' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The score for '" + req.params.id + " ' could not be found.",
                }
            });
        }
    }, function (err) {
        next(err);
    });
});


router.get('/search/:topic', function (req, res, next) {
    let searchObject = {
        "topic": req.query.name
    };
    quizRepo.search(searchObject, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Search topic question retrived.",
            "data": data
        });

    }, function (err) {
        next(err);
    });
});
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

app.listen(3000, () => {
    console.log('Node server is running on port 6000');
})

