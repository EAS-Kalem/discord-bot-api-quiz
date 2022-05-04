var function_module = require('../route_functions/topics.js')


 module.exports = function (app) {
   app.get('/api/topics', (req, res, next) => {
 
     var getResponse = function_module.func(req)
     getResponse.then((response) => {
       res.json(response)
     }).catch(err => {
        
        res.json({error: err})
       
     })
 
   })
 }