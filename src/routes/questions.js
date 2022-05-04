var function_module = require('../route_functions/questions.js')


 module.exports = function (app) {
   app.get('/api/questions', (req, res, next) => {
 
     var getResponse = function_module.func(req)
     getResponse.then((response) => {
       res.json(response)
     }).catch(err => {
        
        res.json({error: err})
       
     })
 
   })
 }