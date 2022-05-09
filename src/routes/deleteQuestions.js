var function_module = require('../route_functions/deleteQuestions.js')


 module.exports = function (app) {
   app.delete('/api/questions', (req, res, next) => {
 
     var getResponse = function_module.func(req)
     getResponse.then((response) => {
       
     }).catch(err => {
        
        res.json({error: err})
       
     })
 
   })
 }