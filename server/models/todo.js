var database = require('../db/oracledb');
class Todo {
    constructor ({text}) {
        this.text = text;
    }
    async save() {
        try {
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
            console.log(e);
        }

    }
    static async find() {
        try {
            const sql = 'select t.id as "id", t.document.text as "text" from todos t order by t.id';
            const result = await database.execute(sql);
            return result.rows;
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = {Todo};