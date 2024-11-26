class Maze {
    static walls =  [
                       [1, 1, 0, 0, 0],
                       [0, 1, 0, 1, 0],
                       [0, 0, 0, 1, 0],
                       [0, 1, 1, 1, 0],
                       [0, 0, 0, 0, 0]
                   ];

    constructor(player){
        this.player = player;
        this.draw();
    }

    draw() {
        let maze = '<table>';
        for (let i = 0; i < Maze.walls.length; i++) {
            let row = '';
            for (let j = 0; j < Maze.walls[i].length; j++) {
                row += Maze.walls[i][j] === 1 ? '<td>#</td>' : '<td>&nbsp;</td>'; // ▓ ściana,   ' ' - przejście
            }
            maze += "<tr>" + row + "</tr>";
        }

        maze += '</table>';

        const mazeDiv = document.getElementById("maze");
        mazeDiv.innerHTML = maze;
    }
}

class Player {
    constructor() {
        this.name = "Zgredek";
        this.pos = [0, 2];
    }
}

document.addEventListener("DOMContentLoaded", function() {

    const maze = new Maze(new Player());

});
