var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('category', {
        categoryId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: true,
        }
    }, {
        freezeTableName: true
    });
}