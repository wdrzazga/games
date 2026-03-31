import ollama

def llama(prompt):
	output = ollama.generate(model='qwen3-coder:30b', prompt=prompt)
	return output['response']

inventory = []
def exctract(message):
	list_form = eval(message)
	return {'event': list_form[0], 'inv_command': list_form[1]}
def inv_command(command):
	seperated = command.split(' ')
	cmd_type = seperated[0]
	item = command.replace(cmd_type + ' ', '')
	if cmd_type == 'a':
		inventory.append(item)
	elif cmd_type == 'r':
		inventory.remove(item)


event = "None, you are making the first event"
choice = "None"
while True:
	prompt1 = ("""You are a tool in a maze adventure game. 
	Generate the next event and according to the event add or remove an item from the inventory.
	Respond by the pattern: ['New event', 'inventory command']
	To the inventory command input put "r item to remove", "a item to add", or leave blank if there are no changes to the inventory.
	It is very important to respond by the pattern and not add anything else to the message except the python list, or the game will have an error and crash."""
	+ "\n Previous event: " + 'None, you are making the first event' +
	" inventory: " + ('empty' if inventory else str(inventory)) + "player action" + choice)
	data = exctract(llama(prompt1))
	event = data['event']
	print(event)
	print("inventory: " + str(inventory))
	if len(data['inv_command']):
		inv_command(data['inv_command'])
	choice = input("What is your action?: ")

