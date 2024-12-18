const maze = [
    [1, 'S', 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1],
    [1, 0,   0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0,   1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0,   0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 1,   1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0,   0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0,   1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0,   0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1,   1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1,   1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0,   0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1],
    [1, 0,   1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0,   0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 1,   0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 1,   1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 1,   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'E', 1, 1]
];

const mazeContainer = document.getElementById('maze');


function drawMaze(player) {
	mazeContainer.innerHTML = '';
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            const cell = document.createElement('div');

            if (maze[row][col] === 1) {
                cell.classList.add('wall');
                cell.textContent = '';
            } else if (maze[row][col] === 0) {
                cell.classList.add('path');
				cell.innerHTML =  player.x === col && player.y === row ?'<img src="player.png"/>' : '';                
            } else if (maze[row][col] === 'S') {
                cell.classList.add('start');
                cell.textContent = 'S'; // Start point
				cell.innerHTML =  player.x === col && player.y === row ?'<img src="player.png"/>' : '';
            } else if (maze[row][col] === 'E') {
                cell.classList.add('end');
                cell.textContent = 'E'; // End point
				cell.innerHTML =  player.x === col && player.y === row ?'<img src="happyPlayer.png"/>' : '';
            }

            mazeContainer.appendChild(cell);
        }
    }
}

class Player {
	constructor() {
		this.x = 1;
		this.y = 0;
	}
}

const player = new Player();
drawMaze(player);

function move(event){
	console.log(event);
	if (event.key === 'w') {
		if (player.y > 0)
			if (maze[player.y-1][player.x] != 1)
				player.y -= 1;
	}
	else if (event.key === 's') {
	    if (player.y >= maze.length - 1)
	        return;

	    if (maze[player.y + 1][player.x] != 1
	        && maze[player.y + 1][player.x] != undefined) {
	    	    player.y ++;
	    }
	}
	else if (event.key === 'a') {
		if (player.x > 0) {
			if (maze[player.y][player.x-1] != 1) player.x --;
		}
	}
	else if (event.key === 'd') {
	    if (maze[player.y][player.x+1] != 1)
		    player.x ++;
	}
	
	writeCoords(player);
	drawMaze(player);	
}

function writeCoords(player){
	document.getElementById("coordinates").innerText = `x: ${player.x} y: ${player.y}`;
}
