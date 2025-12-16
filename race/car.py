import arcade
class Car(arcade.Sprite):
	def __init__(self):
		super().__init__('car.png')
		self.center_x = 100
		self.center_y = 50


