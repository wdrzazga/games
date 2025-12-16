import arcade

class Road(arcade.Sprite):
	def __init__(self):
		super().__init__('road.png')
		self.center_y = 5000-1200
		self.center_x = 400

	def move(self, speed):
		self.center_y -= speed
