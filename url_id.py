import json

# config = {}
config_path = "configuration/appsettings.json"
with open(config_path, 'r') as file:
  config = json.load(file)

while True:
  profile = 0
  url_array = []

  while True:
    profile = int(input("Profile No.: "))
    if profile <= 0:
      print("Invalid input.")
    else:
      break

  print(f"Selecting Profile {profile} with email: " + config[f"profile_{profile}"]["email"])

  while True: 
    count = int(input("\nNumber of url: "))
    if count <= 0:
      print("Invalid input.")
    else:
      break

  print("")

  for i in range(count):
    id = input(f"Enter url id {i + 1}: ")
    url = f"https://store.steampowered.com/join/completesignup?creationid={id}"
    url_array.append(url)

  file_path = f"data/url/url-{profile}.json"

  with open(file_path, "w") as json_file:
    json.dump(url_array, json_file)

  print("")