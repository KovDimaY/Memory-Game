var memory_array = [];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var timer;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function readNumberOfElements(){
	var radioBtns = document.getElementsByName("difficulty");
	for(i = 0; i < radioBtns.length; i++) {
		if (radioBtns[i].checked){
			var numElements = radioBtns[i].value;
		}
	}
	generateData(numElements);
}

function generateData(numberOfElements){
	memory_array = [];
	for(i = 0; i < numberOfElements/2; i++) {
		memory_array.push(i+1);
		memory_array.push(i+1);
	}
	newBoard();
}

function newBoard(){
	var board = document.getElementById('memory_board');
	var options = document.getElementById('difficultySelector');
	options.style.display = 'none';
	board.style.display = 'block';
	board.style.height = 10 + memory_array.length/6 *132 + "px";

	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	board.innerHTML = output;
	timer = setInterval(setTime, 1000);
}

function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
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
	clearInterval(timer);
	totalSeconds = 0;
	alert("Congratulations! Board cleared! \nYour time is " + timeString + " for " + memory_array.length/2 + 
			" pairs. \n\nPress \"OK\" button to start a new game.");
	document.getElementById('memory_board').innerHTML = "";
	newBoard();
}