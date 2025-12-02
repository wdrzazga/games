import math
import arcade

from constants import Constants

RADIAN = math.pi / 180
UP = 65362
DOWN = UP + 2
W = 119
S = 115
BAT_SPEED_INITIAL = 2


class GameView(arcade.View):
    def __init__(self):
        super().__init__()
        self.background_color = arcade.color.BLACK
        self.spriteList = arcade.SpriteList()
        self.score_p1 = 0
        self.score_p2 = 0
        self.ball_speed_y = 1
        self.ball_speed_x = 1
        self.bat_speed = BAT_SPEED_INITIAL

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
            self.spriteList[0].center_y += self.bat_speed
        if self.key_state[S]:
            self.spriteList[0].center_y -= self.bat_speed
        if self.key_state[UP]:
            self.spriteList[1].center_y += self.bat_speed
        if self.key_state[DOWN]:
            self.spriteList[1].center_y -= self.bat_speed

        self.update_ball()

    def update_ball(self):
        ball = self.spriteList[2]
        ball.center_x += self.ball_speed_x
        ball.center_y += self.ball_speed_y
        self.check_bounce()

    def check_bounce(self):
        ball = self.spriteList[2]
        bat1 = self.spriteList[0]
        bat2 = self.spriteList[1]
        if ball.center_y <= 0 or ball.center_y >= Constants.HEIGHT:
            self.ball_speed_y *= -1
        elif ball.center_x <= -3:
            self.score(0)
        elif ball.center_x >= Constants.WIDTH:
            self.score(1)
        self.check_bat_deflection()

        #TODO handle bat defelection
        # if ball.center_y > (bat1.center_y + 25) and

    def check_bat_deflection(self):
        ball = self.spriteList[2]
        bat1 = self.spriteList[0]
        bat2 = self.spriteList[1]

        bat1_deflect = ball.center_y < (bat1.center_y + (bat1.height // 2)) and ball.center_y > (bat1.center_y - (bat1.height // 2))
        bat2_deflect = ball.center_y < (bat2.center_y + (bat2.height // 2)) and ball.center_y > (bat2.center_y - (bat2.height // 2))
        if (bat1_deflect and ball.center_x <= 30) or (bat2_deflect and ball.center_x >= Constants.WIDTH - 30):
            self.ball_speed_y *= 1.25
            self.ball_speed_x *= -1.25
            self.bat_speed *= 1.1


    def score(self, player: int):
        ball = self.spriteList[2]
        self.bat_speed = BAT_SPEED_INITIAL
        self.reset_ball(player)
        if player == 0:
            self.score_p2 += 1
        else:
            self.score_p1 += 1

        self.window.set_caption("Pong | P1:" + str(self.score_p1) + " P2:" + str(self.score_p2))

    def reset_ball(self, player_direction):
        ball = self.spriteList[Constants.BALL_INDEX]

        ball.center_x = 300
        ball.center_y = 400
        if player_direction == 0:
            self.ball_speed_x, self.ball_speed_y = 1, 1
        elif player_direction == 1:
            self.ball_speed_x, self.ball_speed_y = -1, 1

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


