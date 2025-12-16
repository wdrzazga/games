import arcade
from car import Car
from road import Road


class GameView(arcade.View):
	def __init__(self):
		super().__init__()
		self.background_color = arcade.color.BLACK
		self.spriteList = arcade.SpriteList()

		self.spriteList.append(Car())
		self.spriteList.append(Road())

	def on_draw(self) -> bool | None:
		self.clear()
		self.spriteList.draw()
		arcade.draw_circle_filled(0, 0, 20, arcade.color.CYAN)

	def on_update(self, delta_time: float) -> bool | None:
		road = Road()
		road = self.spriteList[1]
		road.move(1)


if __name__ == "__main__":
	window = arcade.Window(800, 600)
	game = GameView()
	window.show_view(game)
	arcade.run()
