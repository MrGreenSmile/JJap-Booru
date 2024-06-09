import re
import json
from glob import glob


root_path = "./public/illust/"

temp_list = glob(root_path + "*")
artist_list = []
for list in temp_list:
    artist_list.append(list.split('\\')[1])
#print(artist_list)

#print(glob(root_path + '/' + artist_list[0] + '/*'))


def sorter(path):
    compiler = re.compile(r'\d+')

    date = path.split('/')[1].split('_')[0]
    p_number = 0
    if '_p' in path:
        p_number = -int(compiler.search(path.split('/')[1].split('p')[1]).group())
    twitter_name = len(path.split('/')[1].split('@')[0].split('_'))

    return date, p_number, twitter_name

print("Error in : ")

illusts = []
for name in artist_list:
    try:
        temp_path = glob(root_path + '/' + name + '/*/*')

        illust_path = []
        for path in temp_path:
            illust_path.append('/'.join(path.split('\\')[1:]))

        illust_path.sort(reverse=True, key=lambda path:(sorter(path)[2]))
        illust_path.sort(reverse=True, key=lambda path:(sorter(path)[0], sorter(path)[1]))


        temp_illust = {
            "name":name,
            "illust":illust_path
        }
        illusts.append(temp_illust)
    except:
        print("- " + name)
    #print(temp_illust["name"])
#print(illusts[0])

print("-")
print("Artists : " + str(len(artist_list)))
print("CSV done.")


with open('./src/json/illusts.json', 'w', encoding='utf-8') as temp_json:
    json.dump(illusts, temp_json, indent=2)
