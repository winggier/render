# import json
# import pandas as pd
# import numpy as np
import os
from flask import Flask, render_template
from pydub import AudioSegment
# import flask.cli
# flask.cli.show_server_banner = lambda *args: None

app = Flask(__name__, static_folder='./static')

@app.route('/')
def home(): return render_template("index.html", data = data)

# @app.route('/mds', methods=['GET', 'POST'])
# def mds():
#     if request.method == 'POST':
#         return redirect(url_for('home'))
#     # show the form, it wasn't submitted
#     return render_template('mds.html', data = data_MDS)


# <<<<<<<<<<<<<<<<<<<<<  data prepare  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

# def to_clip(f, buf):
#   for i in clips:
#     if int(i[0]) == f: tar = i

#   # # path = "static/1006.wav"
#   # # path = "static/4092.wav"
#   path = "static/" + str(f) + ".mp3"
#   # print(path)
#   # print(tar)

#   sound = AudioSegment.from_mp3(path)

#   for idx, x in enumerate(tar[1:]):
#     outp = "./static/" + tar[0] + '_' + str(idx) + ".mp3"
#     outa = sound[x[0]-buf:x[1]+buf]
#     outa.export(outp, format="mp3")



data = []
header = ['Sentence', 'Entity', 'Event', 'CG: A', 'CG: B', 'Why?', 'Pragmatics']
# dialog = ['A: The kid sister thing?', "B: %huh?", 'A: The kid sister thing?', 'B: Well no.']
# dialog = ['A: Covid is real.', 'B: No it’s hoax.', 'A: Oh, you’re right!']

# data.append(header)
# data.append(dialog)
# data.append(entity)

path = "train/"
# savepath = "/home/username/newfolder/" 
# all_files = os.listdir(path)
# print(all_files)
dialogs = []
clips = []
print()
files = os.listdir(path)
files.sort()

for i in files:
  if('txt' in i):
    dialog = []
    clip = []
    head = 3000
    tail = 0
    c = 0
    dialog.append(i[i.index('_')+1:i.index('.')])
    # print(dialog[0])
    clip.append(dialog[0])

    f = open(path + i)
    line = f.readline()

    while(line):
      k = max(line.find('A:'), line.find('B:'))

      # valid line
      if(k > 0):        
        tail = int(float(line.split(' ')[0])*1000)
        # cut and add
        if(not c%10):
          clip.append([head, tail])
          head = tail


        # dialog
        line = line.rstrip('\n')
        line = line.replace('.', '. ')
        line = line.replace("'", '’')
        line = line.replace('  ', ' ')
        # line = line.replace('  ', ' ')
        k = max(line.find('A:'), line.find('B:'))
        dialog.append(line[k:])

        c += 1
  
      line = f.readline()

    f.close()
    dialogs.append(dialog)

    if(head != tail): clip.append([head, tail])
    clips.append(clip)

# print(len(dialogs))
data.append(dialogs)
# print(dialogs[0])

audio = []
path = "static/"

files = os.listdir(path)
files.sort()

for i in files:
  if('mp3' in i):
    i = i.split('.')[0]
    if('_' in i): i = i.split('_')[0]
    audio.append(i)

data.append(list(set(audio)))
# print(data[1])


# fullmp3 = []
# for i in audio:
#   if(len(i) < 5): to_clip(int(i), 2500)

# to_clip(4104, 2500)


if __name__ == "__main__": app.run(debug=True)




