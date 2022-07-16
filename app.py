# import json
# import pandas as pd
# import numpy as np
from flask import Flask, request, make_response, redirect, render_template, url_for
import os
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
# df = pd.read_csv('static/584.csv')
# print(df.head())


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
print()
files = os.listdir(path)
files.sort()

for i in files:
  if('txt' in i):
    dialog = []
    dialog.append(i[i.index('_')+1:i.index('.')])
    # print(dialog[0])

    f = open(path + i)
    line = f.readline()
    while(line):
      line = line.rstrip('\n')
      line = line.replace('.', '. ')
      line = line.replace("'", '’')
      line = line.replace('  ', ' ')

      k = max(line.find('A:'), line.find('B:'))
      if(k > 0):
        dialog.append(line[k:])
      line = f.readline()
    f.close()
    dialogs.append(dialog)

print(len(dialogs))
data.append(dialogs)
# print(dialogs[0])

audio = []
path = "static/"

files = os.listdir(path)
files.sort()

for i in files:
  if('mp3' in i):
    audio.append(i.split('.')[0])

data.append(audio)
# print(audio)

if __name__ == "__main__": app.run(debug=True)


