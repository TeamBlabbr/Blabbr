// imports and variables
const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const enter = document.getElementById('submit');
const rename = document.getElementById('rename').value;

// chat commands

// Sets title to room name
function myFunction() {
  document.title = "Blabbr - "+room;
}

// Chat Sidebar
function sidebar(){
  $('.chat-sidebar').toggleClass(" active");
};

/* Change Username */
function menuclose(){
  modal_container.classList.remove('show');
}

window.onclick = function(event) {
  if (event.target == modal_container) {
    menuclose();
  }
}

enter.addEventListener('click', function(){
  console.log(document.getElementById("rename").value)

  window.location = ('https://Blabbr.teamblabbr.repl.co/chat.html?username='+ document.getElementById("rename").value +'&room='+room);
})

function menuopen(){
  modal_container.classList.add('show');
}


// Extra stuff

window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CDL2P47523');


// Run Scripts

myFunction();
document.getElementById("rename").value = username;