var myInput = document.getElementById('room');

const urlParams = new URLSearchParams(queryString);

const roomid = urlParams.get('roomid')


function setroom(){
  myInput.value = roomid;
}
