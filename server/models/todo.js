const _ = require('lodash');
const uuidv4 = require('uuid/v4');

var database = require('../db/oracledb');


class Todo {
    constructor ({text, completedAt, completed}) {
        this._id = uuidv4();
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
            let result = await database.execute(sql, binds, options);
            // console.log(result);
            return result;
        } catch (e) {
            throw new Error(e);
        }

    }
    static async findById(todo) {
        try {
            let sql = `select
                            t.id as "id",
                            json_value(t.document, '$._id') as "_id",
                            t.document.text as "text",
                            json_value(t.document, '$.completedAt') as "completedAt",
                            json_value(t.document, '$.completed') as "completed"
                        from
                            todos t `;
            
            if (todo !== undefined) {
                sql = sql.concat(`where json_value(t.document, '$._id') = '${todo._id}' `);
            }
            sql = sql.concat('order by id');
            const result = await database.execute(sql);
            return result.rows;
        } catch (e) {
            return e;
        }
    }
    static async find(todo) {
        try {
            let sql = `select
                            t.id as "id",
                            json_value(t.document, '$._id') as "_id",
                            t.document.text as "text",
                            json_value(t.document, '$.completedAt') as "completedAt",
                            --t.document.completedat as "completedAt",
                            json_value(t.document, '$.completed') as "completed"
                            --t.document.completed as "completed"
                        from
                            todos t `;
            sql = `select t.id as "id", t.document as "document" from todos t
            `
            
            if (todo !== undefined) {
                sql = sql.concat(`where t.document.text = '${todo.text}' `);
            }
            sql = sql.concat('order by id');
            const result = await database.execute(sql);
            let objResult = []
            result.rows.forEach((row) => {
                let tmpRow = JSON.parse(row.document);
                tmpRow.id = row.id;
                objResult.push(tmpRow);
            })
            // console.log(objResult)
            return objResult;
        } catch (e) {
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