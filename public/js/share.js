// Unused

let room = document.getElementById('room-name').textContent;

let link = "https:\/\/blabbr.repl.co"


function mail (){
  window.open("mailto:?subject=Join my Blabbr room!&body=Join my Blabbr room! "+link+" I'm in room \""+room+'""');
}

function tweet (){
  window.open("https://twitter.com/intent/tweet?url="+link+"&text=Join my Blabbr room! I'm in room \""+room+'""');
}

function face (){
  window.open("https://www.facebook.com/sharer/sharer.php?u="+link)
}