//elements
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var resetButton = document.querySelector("#reset");
//vars
var currentDifficulty = squares.length;
var h1 = document.querySelector("h1");
var pickedColor = "";

//procedural function calls
init();

//set up squares and colors, init listeners
function init() 
{
	//set the squares up with colors and pick a new winning color
	squaresReset(squares.length);
	//set up all listeners for the apps
	createListeners();
}

function createListeners(){
	//add click listeners to squares
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickColor = this.style.background;

			if (clickColor === pickedColor) {
				correctColorGuess(pickedColor);
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try again";
			}
		});
	}

	//reset button listener
	resetButton.addEventListener("click", function(){
	//generate new colors applied to squares,set new picked color
		squaresReset(currentDifficulty);
	});

	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].difficulty = (i+1) * 3;// find a way to generate this number(Math.floor(100/modeButtons[i].style.width));
		modeButtons[i].addEventListener("click", function(){
			//remove selected from all other buttons, add it to the clicked one
			for (var j = 0; j < modeButtons.length; j++){
				modeButtons[j].classList.remove("selected");
			}
			this.classList.add("selected");

			//reset with the correct number of squares
			squaresReset(this.difficulty);
		});
	}
}

//uses squaresToShow as the number of squares to display, color and choose from
function squaresReset(squaresToShow){
	currentDifficulty = squaresToShow;
	for(var i = 0; i < squaresToShow; i++){
		//initial color setup
		var r = (Math.floor((Math.random() * 255))).toString();
		var g = (Math.floor((Math.random() * 255))).toString();
		var b = (Math.floor((Math.random() * 255))).toString();
		squares[i].style.background = "rgb(" + r + ", " + g + ", "+ b + ")";
		squares[i].style.display = "block";
	}

	for(var i = squaresToShow; i < squares.length; i++){
		squares[i].style.display = "none";
	}

	//set the 'winning' color
	var selectedSquareIndex = Math.floor(Math.random() * squaresToShow);
	pickedColor = squares[selectedSquareIndex].style.background;
	//set the initial display
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New colors";
	h1.style.background = "steelblue";
}

//called when corect color square is clicked
//updates display and colors
function correctColorGuess(color){
	messageDisplay.textContent = "Correct";
	resetButton.textContent = "Play again?";

	h1.style.background = color;
	for(var i = 0; i < squares.length; i++)
	{
		squares[i].style.background = color;
	}
}
