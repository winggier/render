# import json
# import pandas as pd
# import numpy as np
from flask import Flask, request, make_response, redirect, render_template, url_for
# import flask.cli
# flask.cli.show_server_banner = lambda *args: None

app = Flask(__name__)

@app.route('/')
def home(): 
  # return render_template("project_index.html", data = data)
  return render_template("index.html", data = data)
  # return render_template("cg_index.html")


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
dialog = ['B: I see.', 
'A: {laugh} I think. {laugh}. No I have to come back because I don’t think all my stuff will fit in, in our vehicles. So I have to come back. But, yeah. (( ))'
, 'B: %huh.', 'A: it’s a lot of airport shenanigans.',
'A: I was really upset.',
'B: I didn’t know.',
'A: %huh? ',
'B: I didn’t know. ',
'A: yeah, %uh {breath}',
'B: It’s not my fault.',
'A: {laugh}',
'B: It’s going to be awful.',
'A: What?',
'B: It’s going to be awful this trip home.',
'A: Why?',
'B: Because I’m leaving here at',
'A: uh-huh.',
'B: six in the evening,',
'A: uh-huh. ',
'B: getting to &San &Francisco at %uh, eleven in the morning,',
'A: uh-huh.',
'B: and then hanging around the airport until kid &Ted gets out of work (( )) [distortion]',
'A: Wait a minute. The same morning isn’t it?',
'B: yeah.',
'A: {laugh} uh-huh.',
'B: earlier (( )) [distortion]',
'A: Hang around the airport until when?',
'B: Hanging around the airport until &Ted gets out of work.',
'A: %um that’s awful.',
'B: Like six, six hours later and thenA: %mm [echo of other line]',
'A: I think you should just come here.',
'B: and then Sunday, so I will have slept on the plane.',
'A: mhm.',
'B: The only sleep I’ll have gotten is on the plane.']

entity = ['Covid, B', 'Covid is real for B', 'JA', 'JA → AM', 'C', '..']

data.append(header)
data.append(dialog)
data.append(entity)

if __name__ == "__main__": app.run(debug=True)


