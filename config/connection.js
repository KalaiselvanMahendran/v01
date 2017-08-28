var Sequelize = require('sequelize');

module.exports = function(){
    var sequelize = new Sequelize('vehicle_app', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
    });
    return sequelize;
}