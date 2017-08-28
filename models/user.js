var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('user', {
        userId: {
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
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        passwordResetToken: {
            type: Sequelize.TEXT,
            field: 'password_reset_token',
            allowNull: true
        },
        authToken: {
            type: Sequelize.TEXT,
            field: 'auth_token',
            allowNull: true
        },
        userRole: {
            type: Sequelize.INTEGER,
            field: 'user_role',
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