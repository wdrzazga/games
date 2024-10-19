function c1() {
   console.log("klik");
}

        window.onload = function() {
            const zh = String.fromCharCode(0x17c);
            const lh = String.fromCharCode(0x0142);
            const eOgonek = String.fromCharCode(0x0119);
            document.title = "Kó"+lh+"ko i Krzy"+zh+"yk, dwóch graczy na planszy stawia kó"+lh+"ka i krzy"+zh+"yki, ten który otrzyma 3 znaki z rz"+eOgonek+"du wygrywa.";
        };