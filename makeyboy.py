import json

data = {}
data['baseMap'] = []

temp = 0
for i in range(0,20):
    if i < 18:
        for j in range(0,20):
            data['baseMap'].append({
                "id" : f"{temp}",
                "entireRow" : "0",
                "columnNumber" : f"{j}",
                "rowNumber" : f"{i}",
                "tile" : "background_0"
            })
    elif i < 19:
        for j in range(0,20):
            data['baseMap'].append({
                "id" : f"{temp}",
                "entireRow" : "0",
                "columnNumber" : f"{j}",
                "rowNumber" : f"{i}",
                "tile" : "grass_0"
            })
    else:
        for j in range(0,20):
            data['baseMap'].append({
                "id" : f"{temp}",
                "entireRow" : "0",
                "columnNumber" : f"{j}",
                "rowNumber" : f"{i}",
                "tile" : "ground_0"
            })
    temp = temp + 1

# for i in range(0,16):
#     for j in range(0,4):
#         data['baseMap'].append({
#             "id" : f"{temp}",
#             "entireRow" : "0",
#             "columnNumber" : f"{j}",
#             "rowNumber" : f"{i}",
#             "tile" : "wood_0"
#         })
#         temp = temp + 1


with open("data.json", "w") as outfile:
    json.dump(data, outfile, indent=4)