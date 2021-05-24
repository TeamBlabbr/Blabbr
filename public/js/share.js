// Unused

let room = document.getElementById('room-name').textContent;

let link = "https:\/\/Orbit.teamdroplet.repl.co"


function mail (){
  window.open("mailto:?subject=Join my Orbit room!&body=Join my Orbit room! "+link+" I'm in room \""+room+'""');
}

function tweet (){
  window.open("https://twitter.com/intent/tweet?url="+link+"&text=Join my Orbit room! I'm in room \""+room+'""');
}

function face (){
  window.open("https://www.facebook.com/sharer/sharer.php?u="+link)
}