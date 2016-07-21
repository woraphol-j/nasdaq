'use strict';

const path = require('path');

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: 'recruiter',
			password: 'recruiter',
			database: 'nasdaq'
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: path.join(__dirname, '/db/migrations')
		}
	},
	test: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: 'recruiter',
			password: 'recruiter',
			database: 'nasdaq_test'
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: path.join(__dirname, '/db/migrations')
		}
	}
};
