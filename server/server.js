require('./config/config.js');
var express = require('express');
var bodyParser = require('body-parser');

var {oracledb} = require('./db/oracledb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;
console.log(process.env);
app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
//     var todo = new Todo({
//         text: req.body.text
//     });

//     todo.save().then((doc) => {
//         req.send(doc);
//     }, (e) => {
//         re.status(400).send();
//     })
// });

app.listen(port, () => {
    console.log(`Started on port ${port}`); 
});
