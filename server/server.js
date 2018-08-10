require('./config/config.js');
var express = require('express');
var bodyParser = require('body-parser');

var oracledb = require('./db/oracledb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', async (req, res) => {
    try {
        var todo = new Todo({
            text: req.body.text
        });

        await todo.save();
        res.send(todo);
    } catch (e) {
        res.status(400).send();
    }
});

app.listen(port, async () => {
    await oracledb.initialize();
    console.log(`Started on port ${port}`); 
});
// await oracledb.close();