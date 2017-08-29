var Sequelize = require('sequelize');
var dbInfo = require('./dbInfo');

module.exports = function(){
    var sequelize = new Sequelize(dbInfo.database, dbInfo.username, dbInfo.password, {
        host: dbInfo.host,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        logging: false
    });
    return sequelize;
}