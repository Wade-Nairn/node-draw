var chalk = require('chalk');
var io = require('socket.io')();
var express = require('express');

// make an instance of an express server
var app = express();

// make the files in the the public folder accessable
app.use(express.static('./public'));

// start the express server
app.listen(9000);

// start the socket.io server
io.listen(9001);

//  Set up each socket connection
io.on('connection', function(socket){
	console.log(' - Connection:', socket.id);
	socket.on('draw_line', function(data){
		socket.broadcast.emit('line_drawn', data);
	});
});

console.log(chalk.bold('\n\n╔════════════════════════════════════════════════╗'));
console.log('║ Chat server running on ' + chalk.yellow('http://localhost:9000') + '   ║');
console.log('║ ' + new Date() + '       ║');
console.log(chalk.bold('╚════════════════════════════════════════════════╝'));
