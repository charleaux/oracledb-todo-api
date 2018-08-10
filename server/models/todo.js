const _ = require('lodash');

var database = require('../db/oracledb');


class Todo {
    constructor ({text, completedAt, completed}) {
        this.text = text;
        this.completedAt = undefined;
        this.completed = false;
    }
    async save() {
        try {
            if (this.text === undefined) {
                // console.log('No object specified');
                throw new Error('No object specified');
            }
            let sql = "insert into todos (document) values (:document)";
            let binds = {document: `${JSON.stringify(this)}`};
            var options = {
                autoCommit: true,
                bindDefs: {
                  document: { type: database.STRING }
                }};
            // console.log(sql, binds, options);
            // let result = 
            return await database.execute(sql, binds, options);
        } catch (e) {
            throw new Error(e);
        }

    }
    static async find(todo) {
        let sql = '';
        try {
            // console.log(todo.text);
            sql = `select
                            t.id as "id",
                            t.document.text as "text",
                            json_value(t.document, '$.completedAt') as "completedAt",
                            json_value(t.document, '$.completed') as "completed"
                        from
                            todos t `;
            
            if (todo !== undefined) {
                sql = sql.concat(`where t.document.text = '${todo.text}' `);
            }
            // console.log(sql);
            sql = sql.concat('order by id');
            // console.log(sql);
            const result = await database.execute(sql);
            return result.rows;
        } catch (e) {
            console.log(sql);
            return e;
        }
    }
    static async insertMany(todos) {
        try {
            let sql = "insert into todos (document) values (:document)";
            let binds = [];
            todos.forEach(todo => {
                binds = binds.concat({document: `${JSON.stringify(todo)}`});
            });
            var options = {
                autoCommit: true,
                bindDefs: {
                  document: { type: database.STRING, maxSize: 256 }
                }
            };
            return await database.executeMany(sql, binds, options);
        } catch (e) {
            return e;
        }
    }
}


module.exports = {Todo};