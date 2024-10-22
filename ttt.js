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
   cell.innerText = ox.player;
   ox.change();
}

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