var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('owner_info', {
        ownerId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        mobile: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
}
