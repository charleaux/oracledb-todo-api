const oracledb = require('oracledb');

require('../config/config.js');

const dbPool = {
    user:  process.env.dbPoolUser,
    password: process.env.dbPoolPassword,
    connectString: process.env.dbPoolConnectString,
    poolMin: parseInt(process.env.dbPoolPoolMin),
    poolMax: parseInt(process.env.dbPoolPoolMax),
    poolIncrement: parseInt(process.env.dbPoolPoolIncrement)
}

async function initialize() {
    // console.log(JSON.stringify(dbConfig.dbPool, undefined, 2));
    const pool = await oracledb.createPool(dbPool);
}
 
async function close() {
    await oracledb.getPool().close();
}

function simpleExecute(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
        let conn;

        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;

        try {
            conn = await oracledb.getConnection();

            const result = await conn.execute(statement, binds, opts);

            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
}

const STRING = oracledb.STRING

module.exports = {initialize, close, simpleExecute, STRING};