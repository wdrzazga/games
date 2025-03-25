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
    constructor() {
        super('MainScene');
        this.player = null;
        this.playerStamina = 100;
        this.shiftCounter = 0;
    }

    preload() {
        this.load.image('player', 'player.png');
        this.load.image('coin', 'coin.png');
    }

    create() {
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setDepth(2);
        this.coinObject = new Coin(this);
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
        document.getElementById('time').innerText = Math.floor(time);
    }

    updateInfo2() {
        document.getElementById('stamina').innerText = Math.floor(this.playerStamina);
        coinsP.innerText = coins
    }



    checkCollision(){
        const coords =  this.distance([this.player.x, this.player.y], [this.coinObject.x, this.coinObject.y]);

        if (coords[0] < MainScene.REQUIRED_DISTANCE &&  coords[1] < MainScene.REQUIRED_DISTANCE) {
            return true
        } else {
            return false
        }
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
        if (this.checkCollision()){
            this.coinObject.changeLocation()
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
    constructor(name, price, onbuy, removable){
        this.name = name;
        this.price = Number(price);
        this.onbuy = onbuy;
        this.removable = Boolean(removable);
    }
}

function moreStamina(){
    console.log('Stamina shopping');
    //game.scene.scenes[0].player
    MainScene.MAX_STAMINA += 20;
}

class Shop {
    constructor(){
        this.items = [new Item('stamina-bonus', 20, moreStamina, false)];
    }

    buy(itemName){
        this.items.forEach(item => {
            if (item.name === itemName){
                    if (coins >= item.price){
                        item.onbuy();
                        coins -= item.price;
                        game.scenes.scene[0].updateInfo2();
                    }
                }
        });

    }
}


const shop = new Shop();

