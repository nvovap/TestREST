var fs = require('fs')

fs.mkdirSync('public');
fs.mkdirSync('public/img');


var pg = require('pg')


var config = {
  user: "postgres",
  password: "123",
  host: "10.10.1.243",
  database: "map_new_york",
  idleTimeoutMillis: 10000000, // close idle clients after 1 second
  connectionTimeoutMillis: 10000000, // return an error after 1 second if connection could not be established
  ssl: true,
  port: 5432
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
