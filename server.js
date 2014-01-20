/*jshint node:true, strict: false */

var express = require('express'),
    eson = require('eson'),
    mongo = require('mongodb'),
    winston = require('winston');

var app = express();

var config = eson()
    .use(eson.env('STONED_'))
    .use(eson.args())
    .read(__dirname + '/config-' + app.get('env') + '.json');

app.locals.config = config;

app.use(express.json());
app.use(express.urlencoded());

mongo.MongoClient.connect(config.database, function(err, database) {
    app.locals.database = database;

    winston.info('Listening on port %d', config.port);

    app.listen(config.port);
});