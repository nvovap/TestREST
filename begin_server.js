var fs = require('fs')

fs.mkdirSync('public');
fs.mkdirSync('public/img');


var pg = require('pg')


var config = {
  user: process.env.USERPOSTGRES || 'user',
  password: process.env.PSWPOSTGRES || '123',
  host: process.env.HOSTPOSTGRES || 'localhost',
  database: "portfolio",
  idleTimeoutMillis: 10000000, // close idle clients after 1 second
  connectionTimeoutMillis: 10000000, // return an error after 1 second if connection could not be established
  ssl: true,
  port: process.env.PORTPOSTGRES || 5432
};



var pool = new pg.Pool(config);


pool.connect(function (err, client, done) {
  if (err) {
    console.error('error fetching client from pool', err)
  } else {

  	client.query('CREATE DATABASE portfolio;', function (err, result) {
  		client.end()
        pool.end()
	});
  }
});
