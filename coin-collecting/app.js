const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3 }, // Add gravity
            debug: false
        }
    },
    scene: [MainScene]
};

const game = new Phaser.Game(config);
