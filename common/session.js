var dbInfo = require('.././config/dbInfo');

module.exports = function(MySQLStore) {

	var options = {
	    host: dbInfo.host,
	    user: dbInfo.username,
	    password: dbInfo.password,
	    database: dbInfo.database
	};
	 
	return new MySQLStore(options);
}