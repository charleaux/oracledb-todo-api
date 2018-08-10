require('./config/config.js');
var express = require('express');
var bodyParser = require('body-parser');

var database = require('./db/oracledb');
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

async function init() {
    await database.initialize();
    app.listen(port, () => {
        console.log(`Started on port ${port}`); 
    });
}


init()

process.on('exit', database.close);

module.exports = {app};