import os
from flask import Flask, render_template

# . venv/bin/activate to load env
app = Flask(__name__, static_folder='./static')

@app.route('/')
def home(): return render_template("index.html", data = data)

@app.route('/comparison')
def comparison():
    return render_template('comparison.html', data = data)

# @app.route('/mds', methods=['GET', 'POST'])
# def mds():
#     if request.method == 'POST':
#         return redirect(url_for('home'))
#     # show the form, it wasn't submitted
#     return render_template('mds.html', data = data_MDS)

# <<<<<<<<<<<<<<<<<<<<<  data prepare  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# from pydub import AudioSegment

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

# <<<<<<<<<<<<<<<<<<<<<  data prepare  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

data = []
header = ['Sentence', 'Entity', 'Event', 'CG: A', 'CG: B', 'Why?', 'Pragmatics']
# dialog = ['A: The kid sister thing?', "B: %huh?", 'A: The kid sister thing?', 'B: Well no.']

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
        # line = line.rstrip('\r')
        # line = line.rstrip('\t')
        line = line.replace('.', '. ')
        line = line.replace("'", '’')
        line = line.replace('  ', ' ')
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
files = os.listdir("static/mp3/")
files.sort()

for i in files:
  if('mp3' in i):
    i = i.split('.')[0]
    if('_' in i): i = i.split('_')[0]
    audio.append(i)

data.append(list(set(audio)))
# # print(data[1])
# <<<<<<<<<<<<<<<<<<<<<  data prepare  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

# fullmp3 = []
# for i in audio:
#   if(len(i) < 5): to_clip(int(i), 2500)

# audio = []
# for i in files:
#   if('mp3' in i):
#     i = i.split('.')[0]
#     if('_' not in i): to_clip(int(i), 2500)
#     if('_' not in i): print(i)

# to_clip(4490, 2500)
# <<<<<<<<<<<<<<<<<<<<<  data prepare  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


if __name__ == "__main__": app.run(debug=True)
