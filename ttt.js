class Ox {

    constructor(){
        this.player = 'o';
    }

    change() {
        if (this.player === 'o'){
            this.player = 'x';
        }
        else {
            this.player = 'o';
        }
    }
}

let ox = new Ox();

function clickCell(id){
   let cell = document.getElementById(id);
   if (cell.innerText === 'o' || cell.innerText === 'x') {return;}

   cell.innerText = ox.player;
   ox.change();
   checkWinning();
}

function checkWinning(){
    let td11 = document.getElementById("cell11").innerText;
    let td21 = document.getElementById("cell21").innerText;
    let td31 = document.getElementById("cell31").innerText;

    let td12 = document.getElementById("cell12").innerText;
    let td22 = document.getElementById("cell22").innerText;
    let td32 = document.getElementById("cell32").innerText;

    let td13 = document.getElementById("cell13").innerText;
    let td23 = document.getElementById("cell23").innerText;
    let td33 = document.getElementById("cell33").innerText;

    if ((td11 === td21 && td21 === td31)
      ||(td11 === td12 && td12 === td13)
      ||(td11 === td22 && td22 === td33)){
        window.alert(td11 + " won");
        location.reload();
     }

    else if ((td21 === td22 && td22 === td23)
    ||(td12 === td22 && td22 === td32)
    ||(td31 === td22 && td22 === td13)){
        window.alert(td22 + " won");
        location.reload();
    }

    else if ((td33 === td32 && td32 === td31)
    || (td33 === td23 && td23 === td13)) {
        window.alert(td33 + " won");
        location.reload();
    }

    console.log('-----------------------');
    var emptyCells = 0;
    [td11, td21, td31, td12, td22, td32, td13, td23, td33].forEach(cell =>{
            if (cell == ''){
                emptyCells++;
            }
            else if (cell == ' '){
                emptyCells++;
            }
        });

    if (emptyCells === 0){
        window.alert("draw");
        location.reload();
    }
}//end checkWinning

function click1() {
   console.log("klikak 1 " + ox.player);
   clickCell('cell11');
}
function click2() {
   console.log("klik 2");
   clickCell('cell21');
}

function click3() {
   console.log("klik 3");
   clickCell('cell31');
}

function click4() {
   console.log("klikok 4");
   clickCell('cell12');
}

function click5() {
   console.log("klik 5");
   clickCell('cell22');
}

function click6() {
   console.log("klik6");
   clickCell('cell32');
}

function click7() {
   console.log("klikniécie 7");
   clickCell('cell13');
}

function click8() {
   console.log("8 klik");
   clickCell('cell23');
}

function click9() {
   console.log("9klik9");
   clickCell('cell33');
}

window.onload = function() {
       const zh = String.fromCharCode(0x17c);
       const lh = String.fromCharCode(0x0142);
       const eOgonek = String.fromCharCode(0x0119);
       document.title = "Kó"+lh+"ko i Krzy"+zh+"yk, dwóch graczy na planszy stawia kó"+lh+"ka i krzy"+zh+"yki, ten który otrzyma 3 znaki z rz"+eOgonek+"du wygrywa.";
};
