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
    // console.log('pool created');
}
 
async function close() {
    await oracledb.getPool().close();
}

function execute(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
        let conn;

        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;
        // console.log('attempting to execute:', statement);
        try {
            // console.log('getting connection');
            try {
                conn = await oracledb.getConnection();
            } catch (e) {
                const pool = await oracledb.createPool(dbPool);
                conn = await oracledb.getConnection();
            }
            
            // console.log('conn:', conn);
            const result = await conn.execute(statement, binds, opts);

            resolve(result);
        } catch (err) {
            console.log('somethin went wrong:', err);
            reject(err);
        }
    });
}

function executeMany(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
        let conn;

        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;
        // console.log('attempting to execute:', statement);
        try {
            // console.log('getting connection');
            try {
                conn = await oracledb.getConnection();
            } catch (e) {
                const pool = await oracledb.createPool(dbPool);
                conn = await oracledb.getConnection();
            }
            
            // console.log('conn:', conn);
            const result = await conn.executeMany(statement, binds, opts);

            resolve(result);
        } catch (err) {
            console.log('somethin went wrong:', err);
            console.log('statement:', statement);
            console.log('binds:', binds);
            console.log('opts:', opts);
            reject(err);
        }
    });
}


const STRING = oracledb.STRING
const getConnection = oracledb.getConnection;

module.exports = {getConnection, initialize, close, execute, executeMany, STRING};