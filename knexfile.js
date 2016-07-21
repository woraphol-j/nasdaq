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
	},
	production: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: path.join(__dirname, '/db/migrations')
		}
	}
};
