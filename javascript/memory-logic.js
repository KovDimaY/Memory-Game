var ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var COLORS = ["Blue", "Red", "White", "Black", "Yellow", "Lime", "Aqua", "Green", "DarkViolet", "Bisque", "Grey", "Magenta", "SaddleBrown", "Orange", "DarkCyan"];

var memory_array = [];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var globalTimer;
var globalGameMode;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function startGame(){
	var options = document.getElementsByClassName('options');
	options[0].style.display = 'none';
	loadingSimulation = setInterval(progressSim, 25);
	setTimeout("document.getElementById('loader').style.display = 'block';", 75);
	
}

function readNumberOfElements(){
	var radioBtns = document.getElementsByName("difficulty");
	for(i = 0; i < radioBtns.length; i++) {
		if (radioBtns[i].checked){
			var numElements = radioBtns[i].value;
		}
	}
	return numElements;
}

function readTypeOfElements(){
	var radioBtns = document.getElementsByName("mode");
	for(i = 0; i < radioBtns.length; i++) {
		if (radioBtns[i].checked){
			var typeElements = radioBtns[i].value;
		}
	}
	return typeElements;
}

function generateNumericData(numberOfElements){
	memory_array = [];
	for(i = 0; i < numberOfElements/2; i++) {
		memory_array.push(i+1);
		memory_array.push(i+1);
	}
	newBoard();
}

function generateCharData(numberOfElements){
	memory_array = [];
	for(i = 0; i < numberOfElements/2; i++) {
		memory_array.push(ALPHABET[i]);
		memory_array.push(ALPHABET[i]);
	}
	newBoard();
}

function newBoard(){
	var board = document.getElementById('memory_board');
	var timer = document.getElementById('timer');
	timer.style.display = 'block';
	board.style.display = 'block';
	board.style.height = 10 + memory_array.length/6 *132 + "px";

	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" class="card" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	board.innerHTML = output;
	globalTimer = setInterval(setTime, 1000);
}

function memoryFlipTile(tile,val){
	var openBackground = '#FFF';
	var openText = val;
	if (globalGameMode == "colors") {
		openBackground = COLORS[val-1];
		openText = "\n";
	} else if (globalGameMode == "pictures") {
		openBackground = 'url(images/paintings/picture_' + val + '.jpg) no-repeat';
		openText = "\n";
	}
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = openBackground;
		tile.innerHTML = openText;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					winGameSubroutine();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(images/tile_bg.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(images/tile_bg.jpg) no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

function winGameSubroutine() {
	var timeString = "";
	if (parseInt(totalSeconds/3600) == 1) {
		timeString += "1 hour, ";
	} else if (parseInt(totalSeconds/3600) != 0){
		timeString += parseInt(totalSeconds/3600) + " hours, ";
	}
	if (parseInt(totalSeconds/60)%60 == 1) {
		timeString += parseInt(totalSeconds/60)%60 + " minute, ";
	} else if (parseInt(totalSeconds/60)%60 != 0) {
		timeString += parseInt(totalSeconds/60)%60 + " minutes, ";
	}
	if (totalSeconds%60 == 1) {
		timeString += totalSeconds%60 + " second";
	} else if (totalSeconds%60 != 1) {
		timeString += totalSeconds%60 + " seconds";
	}
	clearInterval(globalTimer);
	totalSeconds = -1;
	setTime();
	alert("Congratulations! Board cleared! \nYour time is " + timeString + " for " + memory_array.length/2 + 
			" pairs. \n\nPress \"OK\" button to start a new game.");

	var board = document.getElementById('memory_board');
	var timer = document.getElementById('timer');
	var options = document.getElementsByClassName('options');

	board.innerHTML = "";
	board.style.display = 'none';
	timer.style.display = 'none';
	options[0].style.display = 'block';
}