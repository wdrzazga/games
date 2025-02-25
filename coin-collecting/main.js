class Coin {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.changeLocation();
    }
    changeLocation() {
        this.x = Math.floor(Math.random() * 800)
        this.y = Math.floor(Math.random() * 600) //TODO
    }
}
class MainScene extends Phaser.Scene {
    static MAX_STAMINA = 100;
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
        this.coinObject = new Coin();
        this.coinImg = this.physics.add.sprite(this.coinObject.x, this.coinObject.y, 'coin');
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    updateInfo(time) {
        document.getElementById('stamina').innerText = Math.floor(this.playerStamina);
        document.getElementById('time').innerText = Math.floor(time);
    }
    checkCollision(){
        if (this.player.x )
    }

    distance(){
        
    }

    update(time, delta) {
        let speed = 4;
        this.updateInfo(time);
        this.checkCollision()
        if (this.cursors.shift.isDown && this.playerStamina > 1) {
            speed = 8;
            this.playerStamina -= 0.25;

        } else {
            if (this.playerStamina < MainScene.MAX_STAMINA) {
                this.playerStamina += 0.1;
            }
        }
        if (this.cursors.left.isDown) {
            this.player.x -= speed;
        } if (this.cursors.right.isDown) {
            this.player.x += speed;
        } if (this.cursors.down.isDown) {
            this.player.y += speed;
        } if (this.cursors.up.isDown) {
            this.player.y -= speed;
        }
    }
}
