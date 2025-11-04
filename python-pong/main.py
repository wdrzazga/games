import math

import arcade

RADIAN = math.pi/180

class GameView(arcade.View):
    def __init__(self):
        super().__init__()
        self.background_color = arcade.color.BLACK
        self.spriteList = arcade.SpriteList()
        self.angle = 45 * RADIAN

        bat2 = arcade.Sprite("resources/images/Bat.png")
        ball = arcade.Sprite("resources/images/ball.png")
        bat1 = arcade.Sprite("resources/images/Bat.png")

        bat1.center_x, bat1.center_y = 15, 300
        bat2.center_x, bat2.center_y = 785, 300
        ball.center_x, ball.center_y = 30, 300

        self.spriteList.append(bat1)
        self.spriteList.append(bat2)
        self.spriteList.append(ball)

    def on_draw(self) -> bool | None:
        self.clear()
        self.spriteList.draw()

    def on_update(self, delta_time: float) -> bool | None:
        pass

if __name__ == "__main__":
    window = arcade.Window(800, 600, 'Pong')
    game = GameView()
    window.show_view(game)

    arcade.run()
