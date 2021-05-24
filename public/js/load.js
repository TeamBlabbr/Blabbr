console.warn("If you were asked to paste anything here, it may comprimise your data. Don't type in anything you don't know or understand unless it is from a trustable source.")

window.addEventListener("load", function() {
	const loader = document.querySelector(".preloader");
	const text = document.querySelector(".title");
	const desc = document.querySelector(".desc");

	loader.className += " done";
	text.className -= " inactive";

	desc.className -= " inactive";
});