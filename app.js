/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: "hoangnn"}));
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env'))
{
	app.use(express.errorHandler());
}

var port = 3309;
var io = require('socket.io').listen(app.listen(port));

io.sockets.on("connection", function (socket) {
	socket.emit("sendchat", {message: "Welcome to chat"});
	socket.on("send", function (data) {
		io.sockets.emit("sendchat", data);
	});
});

app.get("/", function(req, res){
	res.render("salary");
});

app.get('/users', user.list);
var log = require("./controller/log")(io);
app.all("/report", log.report);
app.all("/info", log.statistic);
app.get("/luong", function(req, res){
	res.render("salary");
});

/*
var routes = require("./routes")(io);
app.get('/update', routes.update);
*/