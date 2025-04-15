let coinsP = document.getElementById("coins");
let coins = 0;

class Coin {

    constructor(scene) {
        this.scene = scene;
        this.x = 0;
        this.y = 0;
        this.coinImage = this.scene.physics.add.sprite(this.x, this.y, 'coin');
        this.changeLocation();

    }

    changeLocation() {
        this.x = 20+ Math.floor(Math.random() * 800-40)
        this.y = 20+Math.floor(Math.random() * 600-40)
        this.coinImage.x = this.x
        this.coinImage.y = this.y
    }
}

class MainScene extends Phaser.Scene {
    static MAX_STAMINA = 100;
    static STAMINA_RECOVERY = 0.1;
    static REQUIRED_DISTANCE = 100;
    static PLAYER_IMAGE_PATH = 'player.png'
    static YELLOW_PLAYER_IMAGE_PATH = 'yellowPlayer.png'
    constructor() {
        super('MainScene');
        this.player = null;
        this.playerStamina = 100;
        this.shiftCounter = 0;
    }

    preload() {
        this.load.image('player', MainScene.PLAYER_IMAGE_PATH);
        this.load.image('yellow-player', MainScene.YELLOW_PLAYER_IMAGE_PATH);
        this.load.image('coin', 'coin.png');
    }

    create() {
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setDepth(2);
        this.coinObjects = [new Coin(this)];
        //this.coinImg = this.
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    updateInfo(time) {
        this.updateInfo2();
    }

    updateInfo2() {
        document.getElementById('stamina').innerText = Math.floor(this.playerStamina);
        coinsP.innerHTML = `${coins}&nbsp;<img src="coin.png" class="smallImg">`
    }

    checkCollision(){
        for (let i = 0; i <this.coinObjects.length; i++) {
            const coords =  this.distance([this.player.x, this.player.y], [this.coinObjects[i].x, this.coinObjects[i].y]);
            if (coords[0] < MainScene.REQUIRED_DISTANCE &&  coords[1] < MainScene.REQUIRED_DISTANCE) {
                return i;
            }
        }
        return -1;
    }

    distance(pos1, pos2){
        let x1 = pos1[0];
        let y1 = pos1[1];
        let x2 = pos2[0];
        let y2 = pos2[1];

        let yDistance = Math.abs(y1 - y2);
        let xDistance = Math.abs(x1 - x2);
        return [yDistance, xDistance];
    }

    update(time, delta) {
        let speed = 4;
        this.updateInfo(time);
        const cIndex = this.checkCollision();
        if (cIndex > -1){
            this.coinObjects[cIndex].changeLocation()
            coins += 1
            coinsP.innerText = coins
        }
        if (this.cursors.shift.isDown && this.playerStamina > 1) {
            speed = 8;
            this.playerStamina -= 0.30;

        } else {
            if (this.playerStamina < MainScene.MAX_STAMINA) {
                this.playerStamina += MainScene.STAMINA_RECOVERY;
            }
        }
        if (this.cursors.left.isDown || this.aKey.isDown) {
            this.player.x -= speed;
        } if (this.cursors.right.isDown || this.dKey.isDown) {
            this.player.x += speed;
        } if (this.cursors.down.isDown || this.sKey.isDown) {
            this.player.y += speed;
        } if (this.cursors.up.isDown || this.wKey.isDown) {
            this.player.y -= speed;
        }
    }
}

class Item {
    constructor(name, price, onbuy, removable, imgPath){
        const mapContainer = document.getElementById('mapContainer');
        //const mainTable = document.getElementById('mainTable');
        const mainTable = document.getElementsByTagName('tbody')[0];

        this.name = name;
        this.price = Number(price);
        this.onbuy = onbuy;
        this.removable = Boolean(removable);
        this.imgPath = imgPath;
        this.createElements();

        mapContainer.setAttribute('rowspan',
            Number(mapContainer.getAttribute('rowspan')) + 1);
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        mainTable.appendChild(row);
        row.appendChild(cell);
        cell.appendChild(this.text);
        cell.appendChild(this.btn);
        cell.style.display = 'flex';
        this.btn.setAttribute('onclick', `shop.buy("${this.name}")`);
    }

    createElements(){
        let visualName = this.name.replace('-', ' ');
        this.btn = document.createElement('button');
        this.btn.innerHTML = `${this.price}<img src="coin.png" class="smallImg">`;
        this.image = document.createElement('img');
        this.image.setAttribute('src', this.imgPath);
        this.image.classList.add('smallImg');
        this.text = document.createElement('p');
        this.text.innerHTML = `<img src="${this.imgPath}" class="smallImg">${visualName}`;
    }
}

function moreStamina(){
    console.log('Stamina shopping');
    MainScene.MAX_STAMINA += 20;
}
function yellowSkin() {
    //MainScene.PLAYER_IMAGE_PATH = 'yellowPlayer.png';
    game.scene.scenes[0].player.setTexture('yellow-player');
}

function newCoin() {
    const s = game.scene.scenes[0];
    s.coinObjects.push(new Coin(s));
}

class Shop {
    constructor(){
        const yellowSkinBtn = document.getElementById('buy-yellow-skin');
        const secondCoinBtn = document.getElementById('buy-second-coin');
        this.items = [new Item('stamina-bonus', 20, moreStamina, false, 'more_stamina.png')
                    , new Item('yellow-skin', 10, yellowSkin, true, 'yellowPlayer.png')
                    , new Item('second-coin', 60, newCoin, true, 'coin.png')];
    }

    buy(itemName){
        this.items.forEach(item => {
            if (item.name === itemName){
                    if (coins >= item.price){
                        item.onbuy();
                        coins -= item.price;
                        if (item.removable){
                            this.items = this.items.filter(item_ => item_ !== item);
                            item.btn.remove();
                        }

                        game.scene.scenes[0].updateInfo2();
                    }
                }
        });

    }
}


const shop = new Shop();

