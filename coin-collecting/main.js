class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.player = null;
    }

    preload() {
        this.load.image('player', 'player.png');
    }

    create() {
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        // Handle player input and movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

    }
}
