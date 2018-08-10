// require('../config/config');
const expect = require('expect');
const request = require('supertest');
// const ready = require('readyness');

var database = require('./../db/oracledb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

before(async () => {
    try {
        await database.getConnection()
    } catch {
        await database.initialize();
    }
    result = await database.execute('truncate table todos');
    // done();
});



describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(res.body.text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should create a second todo', (done) => {
        var text = 'Test todo text 2';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    expect(todos[1].text).toBe(res.body.text);
                    done();
                }).catch((e) => done(e));
            });
    });
});