var function_module = require('../route_functions/addQuestions.js')


 module.exports = function (app) {
   app.post('/api/questions', (req, res, next) => {
 
     var getResponse = function_module.func(req)
     getResponse.then((response) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000//api/questions");
        
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onload = () => console.log(xhr.responseText);
        
        let data = `{
          "question": "node node node,
          "answer": "node node",
          "topic": "node"
        }`;
        
     }).catch(err => {
        
        res.json({error: err})
       
     })
 
   })
 }