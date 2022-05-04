const express = require('express')
const res = require("express/lib/response");
let router = express.Router();
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const cors = require('cors');
app.use(cors({
  methods: ['GET','POST','UPDATE','PUT','PATCH'],
    origin: '*'
}));

  // Add all routes
  fs.readdirSync(path.join(__dirname, "routes")).forEach(function(file) {
    if (file[0] === ".") {
      return;
    }
    require(path.join(__dirname, "routes", file))(app);
  });
  

app.listen(3000, () => {
    console.log('Node server is running on port 3000');
})

