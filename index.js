// we dont need it to send us crash reports in email! i made it so it never crashes! tryit: im on mobile so 
/* /admin:crash */

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
var botName = 'Blabbot';
const server = http.createServer(app);
const io = socketio(server);
const fs = require('fs');
const prefix = '/';
var lines = 0;
let s = new Date();
var prompt = require('prompt');
const admin = 'admin:'
const limit = 1000;
const commands = [prefix + 'clear', prefix + 'help', prefix + admin + 'crash'];
var profanity = require('@2toad/profanity').profanity;

app.get("/home", (req, res) => {res.sendFile(__dirname + "/public/index.html")})

app.get("/chat", (req, res) => {res.sendFile(__dirname + "/public/chat.html")})

app.get("/documentation", (req, res) => {res.sendFile(__dirname + "/public/docs.html")})

app.get("/invite", (req, res) => {res.sendFile(__dirname + "/public/invite.html")})

app.get("/join", (req, res) => {res.sendFile(__dirname + "/public/join.html")})



function tryCommands(mesg, userr) {
	if (mesg == prefix + 'clear') {
		io.to(userr.room).emit('message', formatMessage('Commands', '<meta http-equiv="refresh" content="0">Clearing, please wait..'));

	} else if (mesg == prefix + admin + 'crash') {
		admincrash();
	} else if (mesg == prefix + 'help') {
		io.to(userr.room).emit('message', formatMessage('Commands', 'Commands:<br><ul><li>' + prefix + 'help: Displays this message</li><li>' + prefix + 'clear: Clears messages (for all users)</li><li>' + prefix + 'rename: Change your name (REMOVED, WILL NOT WORK)</li></ul>'))
	};
};


/*
var d = new Date();
const hours = d.getHours();
const mins = d.getMinutes();
 */

const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers
} = require('./utils/users');


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Run when client connects
io.on('connection', socket => {
	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);


		socket.join(user.room);

		// Welcome current user
		socket.emit('message', formatMessage(botName, 'Welcome to "' + room + ',"' + username + "!"));

		// Broadcast when a user connects
		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				formatMessage(botName, `${user.username} has joined the chat`)
			);

		// Send users and room info
		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: getRoomUsers(user.room)
		});
	});

	/*
		var person = prompt("Please enter your new name",+user.username);
		window.location = ('https://Blabbr.teamblabbr.repl.co/chat.html?username='+person+'&room='+user.room);
	*/

	// Listen for chatMessage
	socket.on('chatMessage', msg => {
		const user = getCurrentUser(socket.id);

		if (commands.includes(msg)) {
			tryCommands(msg, user);
		} else {
			try {
				io.to(user.room).emit('message', formatMessage(user.username, msg));
			}
			catch (err) {
				console.error('Chat Crashed— Auto rerunning/reran. Error:\n' + err)
			}
			lines++

			fs.writeFile('history.txt', user.username + ' posted ' + msg + ' Posted in ' + user.room + ' ' + msg + ' (Time: ' + s + ') \n \n', { flag: 'a+' }, err => { // o
				if (err) {
					console.error(err)
				}

				if (lines > limit) {
					fs.writeFile('history.txt', '', function() {
						lines = '0';
						console.log('done')
					})
				}
			})
		}
	});


	// Runs when client disconnects
	socket.on('disconnect', () => {
		const user = userLeave(socket.id);

		if (user) {
			io.to(user.room).emit(
				'message',
				formatMessage(botName, `${user.username} has left the chat.`)
			);

			// Send users and room info
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room)
			});
		}

	});
});




process.on('uncaughtException', function(err) {
	console.log('\nError was found. Server restarted.\nError: ' + err);
});




const PORT = process.env.PORT || 3000;

app.get('*', (req, res) => {res.sendFile(__dirname + "/public/404.html")})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




