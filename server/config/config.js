var fs = require('fs');
var env = process.env.NODE_ENV || 'development';
console.log('env ********', env);

if (env === 'development' || env === 'test') {
    var config = require('./config.json')
    // console.log('env:', env);
    if (fs.existsSync(__dirname + '/config.mine.json')) {
        config = require('./config.mine.json');
    }

    var envConfig = config[env];
    // console.log(JSON.stringify(envConfig));
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });

}
