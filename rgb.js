const square = document.querySelectorAll(".square");
const h1 = document.querySelector("h1");
const header = document.querySelector("header");
const style = document.querySelector("style");
const p = document.querySelectorAll("p");
const span = document.querySelectorAll("span");
var math;
var chosenSquare;
var rgb;
var h1Status;
var color;
var gameover = false;
var easy = false;
var key;
var wait = true;
var no = false;
function randomSquare(num) {
	math = Math.floor(Math.random() * num);
	return math;
}
function keySqaure(num) {
	displayStatus();
	if ( num === chosenSquare ) {
		win();
	} else {
		square[num].style.background = "#2d2d2d";
	}
}
function squareKeys(key) {
	if ( key.keyCode === 113 ) {
		keySqaure(0)
	}
	if ( key.keyCode === 119 ) {
		keySqaure(1)
	}
	if ( key.keyCode === 101 ) {
		keySqaure(2)
	}
	if ( key.keyCode === 97 ) {
		keySqaure(3)
	}
	if ( key.keyCode === 115 ) {
		keySqaure(4)
	}
	if ( key.keyCode === 100 ) {
		keySqaure(5)
	}
}
function enableKeys() {
		function getKeys(key) {
			if ( key.keyCode === 32 ) {
				reset();
				gameover = false;
				p[0].classList.add("selected");
				setTimeout(function() {p[0].classList.remove("selected"); }, 150);
			}
			if ( key.keyCode === 49 ) {
				easyMode();
			}
			else if ( key.keyCode === 50 ) {
				hardMode();
			}
			if ( !gameover ) {
				if( wait ) {
				setTimeout( function() {
					squareKeys(key);
					wait = false;
				}, 300);}
				if ( !wait ) {
					squareKeys(key);
				}
		}
	}
  document.addEventListener("keypress", getKeys);
	}
function randomH1() {
	if (!easy) { chosenSquare = randomSquare(6); }
	if (easy) { chosenSquare = randomSquare(3); }
	h1.textContent = square[chosenSquare].style.background.toUpperCase();
}
function randomMath() {
	math = Math.floor(Math.random() * 255) + 1;
	return math;
}
function randomRGB() {
	rgb = "rgb(" + randomMath() + "," + randomMath() + "," + randomMath() + ")";
	return rgb
}
function styling(evt) {
	evt.style.background = randomRGB();
}
function colorAll() {
	color = square[chosenSquare].style.background;
	for ( let i = 0; i < square.length; i++ ) {
		square[i].style.background = color;
	}
		header.style.background = color;
		style.textContent = `
		.highlight:hover {
			background:`+color+`;
			color: white;
			cursor: default;
		}
		.highlight {
			color:`+color+`
		}
		.selected {
			background:`+color+`;
			color: white;
			cursor: default;
		}
		`;
}
function differentStyles() {
	for ( let i = 0; i < square.length; i++ ) {
		styling(square[i]);
	} randomH1();
} differentStyles();

function reset() {
	wait = true;
	p[1].style.color = "white";
	setTimeout( function() { p[1].style.visibility = "hidden" }, 301);
	differentStyles();
	header.style.background = "#4093ad";
	style.textContent = "";
		for ( let i = 0; i < square.length; i++ ) {
			square[i].style.display = "block";
			if (easy) {
				if ( i >= 3) {
					square[i].style.backgroundColor = "#2d2d2d";
					setTimeout( function() {square[i].style.display = "none"; }, 300);
			}
		}
	}
}
function displayStatus() {
	if ( gameover ) {
		p[1].textContent = "Correct!"
	} else {
		p[1].textContent = "Wrong!"
	}
	p[1].style.visibility = "visible"
	p[1].style.color = "black";
}
function easyMode() {
	easy = true;
	reset();
	gameover = false;
	span[0].classList.add("selected");
	span[1].classList.remove("selected");
} easyMode();
function hardMode() {
	easy = false;
	reset();
	gameover = false;
	span[0].classList.remove("selected");
	span[1].classList.add("selected");
}
function win() {
		gameover = true;
		colorAll();
		for ( let x = 0; x < square.length; x++ ) {
			square[x].style.color = color;
	}
	displayStatus();
}
enableKeys();
for ( let i = 0; i < square.length; i++ ) {
	square[i].addEventListener("click", function() {
		if( this === square[chosenSquare] ) {
			win();
		}
		if (!gameover) {
			this.style.backgroundColor = "#2d2d2d";
			displayStatus();
		}
	});
}

p[0].addEventListener("click", function() {
		reset();
		gameover = false;
});

for ( let x = 0; x < span.length; x++ ) {
	span[x].addEventListener("click", function(){
		if( this === span[0] ) {
			easyMode();
		} else {
			hardMode();
		}
	});
}