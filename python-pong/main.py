import math
import arcade

from constants import Constants

RADIAN = math.pi / 180
UP = 65362
DOWN = UP + 2
W = 119
S = 115
BAT_SPEED = 2
DIRS = ([1, 1], [1, -1], [-1, -1], [-1, 1])


class GameView(arcade.View):
    def __init__(self):
        super().__init__()
        self.background_color = arcade.color.BLACK
        self.spriteList = arcade.SpriteList()
        self.angle = 45 * RADIAN
        self.current_dir = 0

        bat2 = arcade.Sprite("resources/images/Bat.png")
        ball = arcade.Sprite("resources/images/ball.png")
        bat1 = arcade.Sprite("resources/images/Bat.png")

        bat1.center_x, bat1.center_y = 15, 300
        bat2.center_x, bat2.center_y = 785, 300

        self.spriteList.append(bat1)
        self.spriteList.append(bat2)
        self.spriteList.append(ball)

        self.reset_ball(0)

        self.key_state = self._initialize_key_state()

    KEYS = {
        W: arcade.key.W,
        S: arcade.key.S,
        DOWN: arcade.key.DOWN,
        UP: arcade.key.UP
    }

    def _initialize_key_state(self):
        return {key: False for key in (
            W, S, UP, DOWN
        )}

    def on_draw(self) -> bool | None:
        self.clear()
        self.spriteList.draw()

    def on_update(self, delta_time: float) -> bool | None:
        # print(datetime.now())
        if self.key_state[W]:
            self.spriteList[0].center_y += BAT_SPEED
        if self.key_state[S]:
            self.spriteList[0].center_y -= BAT_SPEED
        if self.key_state[UP]:
            self.spriteList[1].center_y += BAT_SPEED
        if self.key_state[DOWN]:
            self.spriteList[1].center_y -= BAT_SPEED

        self.update_ball()

    def update_ball(self):
        ball = self.spriteList[2]
        ball.center_x += DIRS[self.current_dir][0]
        ball.center_y += DIRS[self.current_dir][1]
        self.check_bounce()

    def check_bounce(self):
        ball = self.spriteList[2]
        bat1 = self.spriteList[0]
        bat2 = self.spriteList[1]
        if ball.center_y <= 0 or ball.center_y >= Constants.HEIGHT:
            self.current_dir += 1
            self.current_dir = 0 if self.current_dir == 4 else self.current_dir
        elif ball.center_x <= -3:
            self.score(0)
        elif ball.center_x >= Constants.WIDTH:
            self.score(1)

        #TODO handle bat defelection
        # if ball.center_y > (bat1.center_y + 25) and

    def score(self, player: int):
        ball = self.spriteList[2]
        self.reset_ball(player)

    def reset_ball(self, player_direction):
        ball = self.spriteList[Constants.BALL_INDEX]

        ball.center_x = 300
        ball.center_y = 400
        if player_direction == 0:
            self.current_dir = 0
        elif player_direction == 1:
            self.current_dir = 2

    def on_key_press(self, symbol, modifiers: int) -> bool | None:
        if symbol in self.key_state.keys():
            self.key_state[symbol] = True
        # zprint(symbol, UP, DOWN)

    def on_key_release(self, symbol: int, modifiers: int) -> bool | None:
        if symbol in self.key_state:
            self.key_state[symbol] = False


if __name__ == "__main__":
    window = arcade.Window(Constants.WIDTH, Constants.HEIGHT, 'Pong')
    game = GameView()
    window.show_view(game)

    arcade.run()
