var test = require('./test.json');

console.log(JSON.stringify(test, undefined, 2));


console.log('Department:', test['OMB'].name);
// console.log('Primary Activity:', test.primaryActivities[0].name)
// console.log('Sub Activity:', test.primaryActivities[0].subActivities[0].name)