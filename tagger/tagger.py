import json
import time
import pandas as pd


file = open('./src/json/artists.json', 'r', encoding='utf-8')
artist_json = json.load(file)
#dic_key = list(artist[0].keys())
#print(dic_key[2:-1])

temp_keys = []
for artist in artist_json:
    dic_key = artist.keys()
    dic_key_list = list(artist.keys())

    for key in dic_key_list:
        if key in ["artists_id", "name", "original_name", "homepage", "tags"]:
            continue
        if not key in temp_keys:
            temp_keys.append(key)

    #print(dic_key_list[2:-1])
for a in ["original_name", "name"]:
    temp_keys.insert(0, a)
#print(temp_keys)



file = pd.DataFrame(columns=temp_keys)

i = 0
for artist in artist_json:
    #file.loc[i, ['id']] = artist['artists_id']
    file.loc[i, ['name']] = artist['name']
    if 'original_name' in artist.keys():
        file.loc[i, ['original_name']] = artist['original_name']


    for bio in temp_keys:
        if bio in artist:
            if isinstance(artist[bio], list):
                file.loc[i, [bio]] = "/".join(artist[bio])
            else:
                try:
                    file.loc[i, [bio]] = artist[bio]
                except:
                    file.loc[i, [bio]] = None
        else:
            file.loc[i, [bio]] = None
    i += 1


#print(file)
new_file = file.reset_index().rename(columns={"index":"id"})
new_file['id'] = new_file['id'] + 1
#print(new_file)

print("\nJSON done!\n")
time.sleep(1)

new_file.to_csv('./tagger/tagger.csv', encoding='utf-8', index=None)