var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('address', {
        addressId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        no: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        area: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        city: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        pincode: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        country: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        countryCode: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'country_code'
        },
        lat: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        lng: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        placeId: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'place_id'
        }
    }, {
        freezeTableName: true
    });
}
