// imports and variables
const open = document.getElementById('open');
const exit = document.getElementById('exit');
// chat commands

// Sets title to room name
function myFunction() {
	document.title = "Blabbr - " + room;
}

// detects, then displays characters left in an input
$(document).ready(function() {
	var len = 0;
	var maxchar = 150;

	$('.message').keyup(function() {
		len = this.value.length
		if (len > maxchar) {
			return false;
		}
		else if (len > 0) {
			$("#remaining").html((len) + '/150');
		}
		else {
			$("#remaining").html(+(len) + '/150');
		}
	})
});

// Chat Sidebar
function sidebar() {
	$('.chat-sidebar').toggleClass(" active");
};




// Run Scripts

myFunction();

new ClipboardJS('.copybtn');