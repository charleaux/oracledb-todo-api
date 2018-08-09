var oracledb = require('../db/oracledb');
class Todo {
    constructor (text) {
        this.text = text;
    }
    async save() {
        let sql = "insert into todos (document) values (:document)";
        let binds = {document: `${JSON.stringify(this)}`};
        var options = {
            autoCommit: true,
            bindDefs: {
              document: { type: oracledb.STRING }
            }};
        console.log(sql, binds, options);
        let result = await oracledb.simpleExecute(sql, binds, options);
        
    }
}

const dropTodosTable = 'DROP TABLE TODOS';
const createTodosTable = `CREATE TABLE TODOS (
    id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) NOT NULL primary key,
    created timestamp default current_timestamp,
    document VARCHAR2 (32767)
        CONSTRAINT todo_document_ensure_json CHECK (document IS JSON)
)`

async function test() {
    
    try {
        await oracledb.initialize();
        await oracledb.simpleExecute(dropTodosTable);
        await oracledb.simpleExecute(createTodosTable);
        
        let todo1 = new Todo('This is a test');
        await todo1.save();

        let todo2 = new Todo('This is the second test');
        await todo2.save();

        await oracledb.close();
    } catch (e) {
        console.log(e);
    }
  
    
}


test();
// console.log(JSON.stringify(me));