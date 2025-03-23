const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: 'map',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [MainScene]
};

const game = new Phaser.Game(config);
