const express = require('express')
const res = require("express/lib/response");
let router = express.Router();
let quizRepo = require("./repos/quizRepo")

const app = express();
// app.use(express.json());

// app.get('/', (req,res)=>{
//     res.send('hello from my app');
// });

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

router.post('/', function (req, res, next) {
    quizRepo.insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Pie Added",
            "data": data
        })
    }, function (err) {
        next(err)
    })
})

app.use('/api/', router); 

app.listen(3000, () => {
    console.log('Node server is running on port 6000');
})

