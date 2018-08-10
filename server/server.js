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
        console.log(todo);
        res.send(todo);
    } catch (e) {
        res.status(400).send();
    }
});

app.get('/todos', async (req, res) => {
    try {
        var todos = await Todo.find();
        res.send({todos});
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        var todo = await Todo.findById({_id: req.params.id});
        console.log('req.params:', req.params.id);
        console.log('todo', todo)
        res.send(todo);
    } catch (e) {
        res.status(400).send(e);
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