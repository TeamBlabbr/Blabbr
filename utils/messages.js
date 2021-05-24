const moment = require('moment');

function formatMessage(username, text) {
  
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
	
  return {
    username,
    text,
    time
	
  };
}

module.exports = formatMessage;

