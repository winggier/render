    var text = 'grey'
    var updata = {{ data|tojson }}

    // var updata = JSON.parse("{{ data|tojson }}");
    // console.log(updata)

    console.log(text)
    console.log(updata)

    header = updata[0]
    dialog = updata[1]
    entity = updata[2]
    // console.log(header)


    function reset() {
        console.log('RESET click')

    }

    // entry = prompt("Enter your name")
    // entryArray = entry.split("");
    // console.log(entryArray)

    function bar() {
        var svgb = d3.select("#ban")
        // svgb.append("rect")
        //     .attr('x', 40)
        //     .attr('y', 20)
        //     .attr("width", 1400)
        //     .attr("height", 50)
        //     .attr("fill", hd);
        // title()

        // svgb
        //     .on("mouseover", info)
        //     .on("mouseout", title)
        //     .on("click", reset)
        svgb
            .append("text")
            .attr("x", 40)
            .attr("y", 65)
            .attr("font-size", "55px")
            .attr("font-family", "Verdana")
            .attr("text-anchor", "start")
            .attr('font-weight', 900)
            .attr('fill', text)
            .text('Common Ground Annotation')
        
        svgb  
            .append("text")
            .attr("x", 1400)
            .attr("y", 65)
            .attr("font-size", "26px")
            .attr("font-family", "Arial")
            .attr("text-anchor", "end")
            .attr('font-weight', 500)
            .attr('fill', text)
            .text('Dataset updated on May 10, 2022')

        svgb  
            .append("text")
            .on("mouseover", function (d, i) {
                d3.select(this).attr("fill", "DarkRed")
            })
            .on("mouseout", function (d, i) {
                d3.select(this).attr("fill", "grey")
            })
            .on("click", reset)
            .attr("x", 1400)
            .attr("y", 35)
            .attr("font-size", "32px")
            .attr("font-family", "Arial")
            .attr("text-anchor", "end")
            .attr('font-weight', 900)
            .attr('fill', text)
            .text('RESET')

        // function title() {
        //     svgb.selectAll("*").remove();
        //     svgb.append("text")
        //         // .on("mouseover", function (d, i) {
        //         //     d3.select(this).attr("fill", "DarkRed")
        //         // })
        //         // .on("mouseout", function (d, i) {
        //         //     d3.select(this).attr("fill", "grey")
        //         // })
        //         .attr("x", 40)
        //         .attr("y", 80)
        //         .attr("font-size", "80px")
        //         .attr("font-family", "Verdana")
        //         .attr("text-anchor", "start")
        //         .attr('font-weight', 900)
        //         .attr('fill', text)
        //         .text('One Million Calories Challenge')
        // }
    }

    // d3.csv(file, function (data) {
    // })

    function dialog_table() {
        var html = "<br><table style='text-align:center; font-family:Verdana; padding:2px;'>";
        html += "<tr style='font-weight:bold;'><td>Dialog</td></tr>";
        for (var i = 0; i < dialog.length; i++) html += "<tr style=''><td>" + dialog[i] + "</td></tr>";
        html += "</table><br><br>";
        document.getElementById("dialog").innerHTML = html;
    }

    function process_table() {        
        html = "<br><br><table style='text-align:center; font-family:Verdana; padding:2px;'>";
        html += "<tr style='font-weight:bold; background-color:Grey'>";
        for (var i = 0; i < header.length; i++) html += "<td>" + header[i] + "</td>";
        html += "</tr>";

        for (var i = 0; i < dialog.length; i++) {
            html += "<tr>";
            html += "<td>" + dialog[i] + "</td>";
            if (i == 0) { for (var j = 0; j < entity.length; j++) html += "<td>" + entity[j] + "</td>"; }
            else {for (var j = 0; j < header.length-1; j++) html += "<td> .. </td>";}
            html += "</tr>";
        }
        html += "</table><br><br>";
        document.getElementById("table").innerHTML = html;
    }

    function tt(line) {
        wordss = line.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ").split(" ");
        console.log(wordss)
        space = 0
        
        var html = "<br><table style=font-family:Verdana; padding:2px;'>";
        html += "<tr style='font-weight:bold; color:blue;'><td>></td></tr>";
        html += "<tr style='font-weight:bold;'>";
        for (var i = 0; i < wordss.length; i++) {
            space += wordss[i].length;
            // console.log(words[i].length);
            html += "<td width=" + wordss[i].length + "%>" + wordss[i] + "</td>";
        }
        console.log(space)
        html += "<td width=" +  (100 - space) + "%></td>";
        html += "</tr>";
        // html += "<tr style=''><td>" + line + "</td></tr>";
        // html += "<tr style=''><td>Covid is real.</td></tr>";
        // for (var i = 0; i < words.length; i++) html += "<tr style=''><td>" + words[i] + "</td></tr>";
        html += "</table><br><br>";


        document.getElementById("tt").innerHTML = html;

        const list = dialog.map((line, li) => {
            const html = `<p style='padding:4px;' class="text">` + refine(line).split(" ").map((word, i) => 
                `<span class="word" pos="${i + 1}" line="${line}" li="${li}">${word}</span>`).join(" ") + "</p>";
            return html
            // if(line[0] == 'A') {
            //     return `<p style='padding:4px; background-color:#dddddd' class="text">` + 
            //         refine(line).split(" ").map((word, i) => 
            //         `<span class="word" pos="${i + 1}" line="${line}">${word}</span>`).join(" ") + "</p>";
            // }
            return `<p style='padding:4px;' class="text">` + refine(line).split(" ").map((word, i) => 
                `<span class="word" pos="${i + 1}" line="${line}" li="${li}">${word}</span>`).join(" ") + "</p>";
        });

        // document.getElementById("tt").onmouseover = function() {mouseOver()};
        // document.getElementById("tt").onmouseout = function() {mouseOut()};

        // function mouseOver() {
        //     // console.log('mouseover')
        //     document.getElementById("tt").style.color = "red";
        // }

        // function mouseOut() {
        //     document.getElementById("tt").style.color = "black";
        // }
    }

    // document.getElementById("word").onmouseover = function() {mouseOver()};
    // document.getElementById("word").onmouseout = function() {mouseOut()};

    // function mouseOver() {
    //     document.getElementById("word").style.color = "red";
    // }

    // function mouseOut() {
    //     document.getElementById("word").style.color = "black";
    // }

    bar()

    tt('A: Covid is real.')
    dialog_table()
    process_table()



    // const statements = [{glossHand: "this is a test" }, {glossHand: "this is another test"}];

    // const display_list = statements.map(statement => {
    //     return `<li class="text">` + statement.glossHand.split(" ").map((word, i) => 
    //         `<span class="word" pos="${i + 1}" statement="${statement.glossHand}">${word}</span>`).join(" ") + "</li>";
    // });

    const data = ["this is a test", "this is another test"];

    const list = data.map(line => {
        return `<li class="text">` + line.split(" ").map((word, i) => 
            `<span class="word" pos="${i + 1}" line="${line}">${word}</span>`).join(" ") + "</li>";
    });

    console.log(list);
    document.getElementById("texts").innerHTML = list.join("");
    
    document.getElementById("texts").querySelectorAll(".word").forEach(word => {

        // mouseover
        word.addEventListener("mouseover", () => {
            const t = event.target;
            t.style.color = "red";
            const pos = t.getAttribute("pos");
            const line = t.getAttribute("line");
            document.getElementById("msg").innerText = `"'${t.innerText}' is the (${pos}) word of "${line}"`;
        });

        // mouseout
        word.addEventListener("mouseout", () => { 
            const t = event.target;
            t.style.color = "black";
            document.getElementById("msg").innerText = "";
        });
    });

    function process_table() {        
        html = "<table style='text-align:center; font-family:Verdana; padding:2px;'>";
        html += "<tr style='font-weight:bold; background-color:Grey'>";
        for (var i = 0; i < header.length; i++) html += "<td>" + header[i] + "</td>";
        html += "</tr>";

        for (var i = 0; i < dialog.length; i++) {
            html += "<tr>";
            html += "<td>" + data[i].st + "</td>";    //sentance
            html += "<td>" + data[i].et + "</td>";    //entities
            html += "<td>" + data[i].ev + "</td>";    //event
            html += "<td>" + "JA" + "</td>";          //CGA
            html += "<td>" + "JA" + "</td>";          //CGB
            html += "<td>" + "C" + "</td>";           //why
            html += "<td>" + data[i].pr + "</td>";    //Pragmatics             
            // if (i == 0) { for (var j = 0; j < entity.length; j++) html += "<td>" + entity[j] + "</td>"; }
            // else {for (var j = 0; j < header.length-1; j++) html += "<td> .. </td>";}
            html += "</tr>";
        }
        html += "</table><p class='foot'>Save and Next ></p><br><br>";
        document.getElementById("table").innerHTML = html;
    }


    function tt(dialog) {
        // wordss = line.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ").split(" ");
        // console.log(wordss)
        // space = 0
        
        const list = dialog.map((line, li) => {
            const html = `<p style='padding:4px;' class="text">` + refine(line).split(" ").map((word, i) => 
                `<span class="word" pos="${i + 1}" line="${line}" li="${li}">${word}</span>`).join(" ") + 
                `<span class='tab'></span>` +
                `<span class='ano' onclick='notation(0, "${li}")'>Event</span>` +
                `<span class='tab'></span>` +
                `<span class='ano' onclick='notation(1, "${li}")'>Pragmatics</span></p>`
                // + '<li onclick="func()">Event</li>';
            // html += "<br>";
            return html
        });

        // console.log(list);
        document.getElementById("tt").innerHTML = list.join("");

        document.getElementById("tt").querySelectorAll(".word").forEach(word => {
            word.addEventListener("mouseover", () => {
                const t = event.target;
                t.style.color = "red";
                const pos = t.getAttribute("pos");
                const line = t.getAttribute("line");
                document.getElementById("msg").innerText = `"'${t.innerText}' is the (${pos}) word of "${line}"`;
            });

            word.addEventListener("mouseout", () => { 
                const t = event.target;
                t.style.color = "black";
                document.getElementById("msg").innerText = "";
            });

            word.addEventListener("click", () => { 
                const w = event.target.innerText;
                const li = event.target.getAttribute("li");
                // console.log(w)
                if (data[li].et.includes(w)) {
                    data[li].et.splice(data[li].et.indexOf(w), 1)
                }
                else {
                    // var input = prompt('Please input value');
                    // if(input) data[li].ev.push(input)
                    // else
                    data[li].et.push(w)

                } 
                
                process_table()
                // t.style.color = "black";
                // document.getElementById("msg").innerText = "";
            });

        });


    }

    function reset() {
        console.log('RESET click')
        data = []
        for(var i = 0; i < dialog.length; i++) {
            var tuple = Object.freeze({ st:dialog[i], e1:[], e2:[], ev:[], pr:[], cc:[0, 0, 0, 0, 0], 
                ccc:[0, 0, 0, 0], why:[], wip:[], com:[], er:[]})
                data.push(tuple)
        }
        bar()
        process_table()
    }

    //Initialization of object to save
    var objectToSave={first:'string', second: function(){}};
    //Start of saving method
    var textToSave='';//String to be saved
    var count=0;
    for(var i in objectToSave){
    //Adding every key name + type + text value to string
    textToSave+=objectToSave[i].constructor.name+' '+ Object.keys(objectToSave)[count]+' = '+objectToSave[i]+'\n';
    count++;
    }
    //Saving string to file using html clicking trick
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'myFile.txt';
    hiddenElement.click();

    function annotator(p) {
        return nm
        return `John`
        if(!ano[p].length) return `<span class="aa" p="${p}">+</span>`
        else return ano[p]
    }

    dialog = ['B: I see.', 
        'A: {laugh} I think. {laugh}. No I have to come back because I don???t think all my stuff will fit in, in our vehicles. So I have to come back. But, yeah. (( ))'
        , 'B: %huh.', 'A: it???s a lot of airport shenanigans.',
        'A: I was really upset.',
        'B: I didn???t know.',
        'A: %huh? ',
        'B: I didn???t know. ',
        'A: yeah, %uh {breath}',
        'B: It???s not my fault.',
        'A: {laugh}',
        'B: It???s going to be awful.',
        'A: What?',
        'B: It???s going to be awful this trip home.',
        'A: Why?',
        'B: Because I???m leaving here at',
        'A: uh-huh.',
        'B: six in the evening,',
        'A: uh-huh. ',
        'B: getting to &San &Francisco at %uh, eleven in the morning,',
        'A: uh-huh.',
        'B: and then hanging around the airport until kid &Ted gets out of work (( )) [distortion]',
        'A: Wait a minute. The same morning isn???t it?',
        'B: yeah.',
        'A: {laugh} uh-huh.',
        'B: earlier (( )) [distortion]',
        'A: Hang around the airport until when?',
        'B: Hanging around the airport until &Ted gets out of work.',
        'A: %um that???s awful.',
        'B: Like six, six hours later and thenA: %mm [echo of other line]',
        'A: I think you should just come here.',
        'B: and then Sunday, so I will have slept on the plane.',
        'A: mhm.',
        'B: The only sleep I???ll have gotten is on the plane.']

    // belb = ['', 'CT+', 'CT+???CT-', 'CT+???PS', 'CT-', 'CT-???CT+', 'CT-???PS', 'PS']
    edr = 0;
    max = 3;
    // phase = 2;
    // ver = 0.12
    // dialog = updata[di].slice(1)
    // did = updata[di].slice(0, 1)

// <!-- <input type="file" id="file-input" />
// <button id="read-button">Read File</button>
// <pre id="file-contents"></pre>

// <script>
// 	document.querySelector("#read-button").addEventListener('click', function() {
// 		let file = document.querySelector("#file-input").files[0];
// 		let reader = new FileReader();
// 		reader.addEventListener('load', function(e) {
// 	    		let text = e.target.result;
// 	    		document.querySelector("#file-contents").textContent = text;
// 		});
// 		reader.readAsText(file);
// 	});
// </script> -->



// <!-- 
// # f = open(path + os.listdir(path)[47])
// # i = os.listdir(path)[47]
// # print(i)
// # print(i[i.index('_')+1:i.index('.')])
// # line = f.readline()
// # i = 0
// # # print(i, line, end = '')
// # while(line):
// #   line = line.rstrip('\n')
// #   # ws = line.split(' ')
// #   i += 1
// #   if('A:' in line or 'B:' in line):
// #     # print(i, line)
// #     pass
// #   # print(ws)
// #   line = f.readline()

// # for i in os.listdir(path):
// #   f = open(path + i)
// #   while()
// # for dir,subdir,files in os.walk(path):
//   # print(dir, subdir, files)
//   # print(files)
//     # tfile = open(path+files)
//     # a = tfile.readline()
//     # print(a)
//     # outfile = open(savepath,'w')
//     # a = infile.readline().split('.')
//     # for k in range (0,len(a)):
//     #     print(a[0], file=outfile, end='')
// # tfile.close()
// # outfile.close -->

// <!-- # /Users/wing/Library/Caches/pip/wheels/30/33/46/5ab7eca55b9490dddbf3441c68a29535996270ef1ce8b9b6d7

// # export PATH="/Users/wing/Library/Caches/pip/wheels/30/33/46/5ab7eca55b9490dddbf3441c68a29535996270ef1ce8b9b6d7:$PATH"

// # import os; print(os.environ["PATH"].split(os.pathsep)) -->



// <!-- # ------------------------------------------

// # import speech_recognition as sr

// # filename = "static/1002.wav"

// # r = sr.Recognizer()
// # # open the file
// # with sr.AudioFile(filename) as source:
// #     # listen for the data (load audio to memory)
// #     audio_data = r.record(source)
// #     # recognize (convert from speech to text)
// #     text = r.recognize_google(audio_data)
// #     print(text)


// # ------------------------------------------

// # importing libraries 
// # import speech_recognition as sr 
// # import os 
// # from pydub import AudioSegment
// # from pydub.silence import split_on_silence

// # # create a speech recognition object
// # r = sr.Recognizer()

// # # a function that splits the audio file into chunks
// # # and applies speech recognition
// # def get_large_audio_transcription(path):
// #     """
// #     Splitting the large audio file into chunks
// #     and apply speech recognition on each of these chunks
// #     """
// #     # open the audio file using pydub
// #     sound = AudioSegment.from_file(path)  
// #     # split audio sound where silence is 700 miliseconds or more and get chunks
// #     chunks = split_on_silence(sound,
// #         # experiment with this value for your target audio file
// #         min_silence_len = 1500,
// #         # adjust this per requirement
// #         silence_thresh = sound.dBFS-14,
// #         # keep the silence for 1 second, adjustable as well
// #         keep_silence=500,
// #     )
// #     folder_name = "audio-chunks"
// #     # create a directory to store the audio chunks
// #     if not os.path.isdir(folder_name):
// #         os.mkdir(folder_name)
// #     whole_text = ""
// #     # process each chunk 
// #     for i, audio_chunk in enumerate(chunks, start=1):
// #         # export audio chunk and save it in
// #         # the `folder_name` directory.
// #         chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
// #         audio_chunk.export(chunk_filename, format="wav")
// #         # recognize the chunk
// #         with sr.AudioFile(chunk_filename) as source:
// #             audio_listened = r.record(source)
// #             # try converting it to text
// #             try:
// #                 text = r.recognize_google(audio_listened)
// #             except sr.UnknownValueError as e:
// #                 print("Error:", str(e))
// #             else:
// #                 text = f"{text.capitalize()}. "
// #                 print(chunk_filename, ":", text)
// #                 whole_text += text
// #     # return the text for all chunks detected
// #     return whole_text 


// # path = "static/1006.wav"
// # path = "static/4092.wav"
// path = "static/4092.mp3"

// # len() and slicing are in milliseconds
// # halfway_point = len(sound) / 2
// # second_half = sound[halfway_point:]
// # # print(halfway_point/60)
// # new = sound[:2000]
// # new.export("1.mp3", format="mp3")

// # 4092: 40" ~ 670"(11'10") total 630" to 311 line



// # Concatenation is just adding
// # second_half_3_times = second_half + second_half + second_half

// # writing mp3 files is a one liner
// # second_half_3_times.export("/path/to/new/file.mp3", format="mp3")

// -->

// <!--  
// 1. + in entity
// 2. referencing # in prag
// 3. = formating in the entity column
// 4. bug in clip4 formatting in erica's job
// 5. wip default to the previous one
// 6. CT- then add RT to CGA
// 7. # before sentance
//     + -->