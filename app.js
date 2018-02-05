var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var cons = require('consolidate');
var index = require('./routes/index');
var users = require('./routes/users');

var port = process.env.PORT || '3000';
app.set('port', port);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/v1', users);

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
module.exports = app;