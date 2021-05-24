var messagesinchat = '2'

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
var messagename = 'message';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Get username and room from URL
var { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true
});

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}


function eraseCookie(name) {
	createCookie(name, "", -1);
}

createCookie('user', username)

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
	outputRoomName(room);
	outputUsers(users);
});

// Message from server
socket.on('message', message => {
	console.log(message);
	outputMessage(message);

	// Scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
	e.preventDefault();


	// Get message text
	const msg = e.target.elements.msg.value;

	// Emit message to server
	socket.emit('chatMessage', msg);

	// Clear input
	e.target.elements.msg.value = '';
	e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  if (message.username == '-Xenity-'){
    const div = document.createElement('div');

  	div.classList.add(messagename);

  	div.innerHTML = `<p class="meta">${message.username} <p class="tag">(Admin)</p></p>
    <p class="text">
      ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);

	  } else if (message.username == '--VSCoder--' || message.username == 'Vivaan' || message.username == 'VSCoder' || message.username == 'VS' || message.username == 'Vivaan S.'){
    const div = document.createElement('div');

  	div.classList.add(messagename);

  	div.innerHTML = `<p class="meta">${message.username}</p><p class="tag">Admin</p>
    <p class="text">
      ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
  } else {
    const div = document.createElement('div');

  	div.classList.add(messagename);

  	div.innerHTML = `<p class="meta">${message.username}</p>

    <p class="text">
      ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
  };
}

// Add room name to DOM
function outputRoomName(room) {
	roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
	userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}


