function appendix() {
    html = `<table style='font-family:Verdana; padding:2px;'><tr style='font-weight:bold; background-color:Grey'>`;
    html += `<td style='text-align:center;'><span class='app' ph='0'>Hide</span><span class='app' ph='1'>Dialog</span>`;
    html += `<span class='app' ph='2'>Interactions</span><span class='app' ph='3'>Setting</span>`;
    // if(audios.includes(did[0])) html += `<span class='app' ph='5' style='color:darkgreen';>Audio</span>`;
    html += `<span class='app' ph='4'>What's new</span></td></tr></table>`;
    
    // html = `<table style='font-family:Verdana; padding:2px; columnWidth:100px'>`;
    // html += "<tr style='font-weight:bold; background-color:Grey'>";

    // if(!ph) hd = hd0
    // else if(ph == 1) hd = hd1
    // else hd = hd2
    // for (var i = 0; i < hd.length; i++) html += "<td style='text-align:center;'>" + hd[i] + "</td>"

    if(!appp) html = html.replace('Hide', `<span style='color:darkred'; ph='0'>Hide</span>`);
    else if(appp == 1) html = html.replace('Dialog', `<span style='color:darkred'; ph='1'>Dialog</span>`);
    else if(appp == 2) html = html.replace('Interactions', `<span style='color:darkred'; ph='2'>Interactions</span>`);
    else if(appp == 3) html = html.replace('Setting', `<span style='color:darkred'; ph='3'>Setting</span>`);
    else if(appp == 4) html = html.replace(`What's new`, `<span style='color:darkred'; ph='4'>What's new</span>`);
    else if(appp == 5) html = html.replace('Audio', `<span style='color:darkred'; ph='5'>Audio</span>`);

    // else html = html.replace(`What's new`, `<span style='color:darkred'; ph='3'>What's new</span>`);

    // Dialog
    if(appp == 1) {
        html += `<table>`

        for (var i = 0; i < dialog.length; i++) {
            html += `<tr><td style='text-align:center;'>` + (i+1) + `</td>`
            html += `<td class='info'>` + dialog[i] + `</td></tr>`;
            // if(dialog[i][0] == 'A') html += `<td class='info'>` + dialog[i] + `</td></tr>`;
            // else html += `<td class='info' style='color:darkblue'>` + dialog[i] + `</td></tr>`;
        }
        
    } 

    // Info
    else if(appp == 2) html += `<div class="info" contenteditable="true" >Click row # to select/highlight row</div><br>
        <div class="info" contenteditable="true" >Click the word in the sentences to add it to Entity
            <li>Click it again to remove it from the Entity</li>
        </div><br>

        <div class="info" contenteditable="true" >Symbols used in dialogs (Symbols will be removed when words added to Entity)
            <li>& – indicates an entity and NOT the ‘and’ conjunction; it’s how the authors of the corpus decided to mark</li>
            <li>% – expressions denoting confirmation, confusion, perhaps even rejection; those are important for us</li>
            <li>curly {} and square brackets[]– non-verbal expressions as interpreted by the authors; those would be much more
                 useful when we start listening to the audio recordings</li>
            <li>double parentheses (()) – the authors were unsure if those were the exact words of the speaker</li>
        </div><br>

        <div class="info" contenteditable="true" >Click "+" to add items to the corresponding tags
            <li>Additional events will be added in a new row under the same sentence</li>
            <li>There can be multiple entities and events under the same sentence</li>
            <li>The same event can only be associated with at most one Pragmatics, one Why in prose, and one Comment</li>
        </div><br>

        <div class="info" contenteditable="true" >Belief Tags Click Cycle:
            <li>Add events/pragmatics at next row to enable status conversion</li>
            <li>CT+ (certain belief)</li>
            <li>CT- (certain belief that not)</li>
            <li>PS (event may or may not have happened)</li>
            <li>NB (no belief)</li>
        </div><br>

        <div class="info" contenteditable="true" >Common Ground Tags Click Cycle:
            <li>Add events/pragmatics at next row to enable status conversion</li>
            <li>JA (when an event has been just added to the CG)</li>
            <li>JA→IN</li>
            <li>JA→RT</li>
            <li>JA→AM</li>

            <li>IN (when an event already existed in the CG)</li>
            <li>IN→RT</li>
            <li>IN→AM</li>

            <li>RT (when an event has been rejected from the CG)</li>

            <li>AM (when it is impossible to determine the status)</li>
            <li>AM→IN</li>
            <li>AM→RT</li>
        </div><br>

        <div class="info" contenteditable="true" >Why Tags Click Cycle:
            <li>WK (world knowledge)</li>
            <li>C (context present in the dialog)</li>
            <li>LI (specific lexical item: word/phrase/expression)</li>
        </div>`;

    // setting
    else if(appp == 3) {
        html += `<br><table><tr><span class='sett'>Annotation table type:</span>`
        if(max < 999) html += `<span class='set' t='1' style='color:darkred'>Limited</span><span class='set' `
        else html += `<span class='set' t='1'>Limited</span><span class='set' style='color:darkred' `
        html += `t='2'>Full</span></tr></table>`;
        html += `<br><table><tr><span class='sett'>Table expand pre click:</span><span class='set' t='3'>` + expand 
        html += `</span></tr></table>`
        html += `<br><table><tr><span class='sett'>Export as:</span><span class='set' t='4'>.TSV</span></tr></table>`
        html += `<br><table><tr><span class='sett'>Entity(JA):</span><span class='set' t='5' `
        if(eja) html += `style='color:darkred'>Compact</span><span class='set' t='6'>Expand</span></tr></table>`
        else html += `>Compact</span><span class='set' t='6' style='color:darkred'>Expand</span></tr></table>`
        html += `<br><table><tr><span class='sett'>CG Mode:</span><span class='set' t='7' `
        if(cgm) html += `style='color:darkred'>Reference</span><span class='set' t='8'>Transition</span></tr></table>`
        else html += `>Reference</span><span class='set' t='8' style='color:darkred'>Transition</span></tr></table>`
        html += `<br><table><tr><span class='sett'>Default reference#</span><span class='set' t='9' `
        if(hrefer) html += `style='color:darkred'>Hide</span><span class='set' t='10'>Show</span></tr></table>`
        else html += `>Hide</span><span class='set' t='10' style='color:darkred'>Show</span></tr></table>`
        html += `<br><table><tr><span class='sett'>Comment:</span><span class='set' t='11' `
        if(hcom) html += `style='color:darkred'>Hide</span><span class='set' t='12'>Show</span></tr></table>`
        else html += `>Hide</span><span class='set' t='12' style='color:darkred'>Show</span></tr></table>`
        html += `<br><table><tr><span class='sett'>Auto-Save interval:</span><span class='set' t='13'>` + autoSave 
        html += `</span></tr></table>`
    }

    // news                                                         <<<<<<<<<<<<<<<<<<<<<<<<<<
    else if(appp == 4) {
        html += `<br><div class="info" contenteditable="true" >Jan 9:`;
        html += `<li class='info'>Deployed on render.com</li>`
        html += `<li class='info'>Auto-save added</li>`
        html += `<li class='info'>Save format changed to .cga</li>`
        html += `<li class='info'>JS page optimized</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Nov 11:`;
        html += `<li class='info'>Export tsv works on reference mode now</li>`
        html += `<li class='info'>Fix a load file issus</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Sep 27:`;
        html += `<li class='info'>NB (for no belief) added to Bel tab</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Sep 11:`;
        html += `<li class='info'>Several bug fixes and table style changes</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Aug 30:`;
        html += `<li class='info'>Audios clips updated to #4629</li>`;
        html += `<li class='info'>Comment tab Hide and Show options added</li>`;
        html += `<li class='info'>Default reference # set to 'Show'</li>`;
        html += `<li class='info'>Cell issue hint, for example, Bel is 'CT-' but CG is not 'RT', the 
            corresponding CG cell is highlighted to indicate that the annotation may have a conflict/issue</li>`;
        html += `<li class='info'>Likewise, extra events cell that are empty, event being referenced but corresponding 
            Bel/CG cell missing initial annotations will be highlighted</li>`;
        html += `<li class='info'>Several bug fixes and table style changes</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Aug 12:`;
        html += `<li class='info'>Adds default reference # Hide and Show options</li>`;
        html += `<li class='info'>Several bug fixes and style changes</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Aug 9:`;
        html += `<li class='info'>Elements within the entity are now added to Entity(JA) on first click and 
            removed on second click</li>`;
        html += `<li class='info'>Entity(JA) tab adds Compact (default) and Expand options</li>`;
        html += `<li class='info'>Bel and CG add Reference (default) and Transition options</li>`;
        html += `<li class='info'># now indicates the event number instead of the previous line number, and 
            has been moved to the left of the event tab</li>`;
        html += `<li class='info'>Each time an event is added or removed, the corresponding # will change</li>`;
        html += `<li class='info'>Event tab in reference mode will show the reference source if the corresponding 
            event is referenced</li>`;
        html += `<li class='info'>Bel and CG in reference mode, you can add/remove/modify the reference object 
            (event number) after selected (click #)</li>`;
        html += `<li class='info'>Bel, CG and comment now have a bold border between them</li>`;
        html += `<li class='info'>Modify save and load function to support new reference and event number data, 
            and compatible with the previous transition mode data</li>`;
        html += `<li class='info'>The load function can now read files that are not the current dialog#</li>`;
        html += `<li class='info'>Custom entity input now handles the '=' symbol correctly</li>`;
        html += `<li class='info'>Bug fix for loading transition mode data</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Jul 28:`;
        html += `<li class='info'>20 audios clips (4065 - 4495) have been added</li>`;
        html += `<li class='info'>Some audios changed from mono to stereo</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Jul 26:`;
        html += `<li class='info'>Split audio in groups of 10 sentences</li>`;
        html += `<li class='info'>Multiple audio players may cause performance issues, especially for Safari, 
            if you encounter this problem, please try different browser such as Firefox/Chrome and let me(Wing) know</li>`;
        html += `<li class='info'>Removed the full-length audio player</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Jul 20:`;
        html += `<li class='info'>Annotator are now displayed correctly when load file</li>`;
        html += `<li class='info'>Now each entity and + sign will be displayed on a new line</li>`;
        html += `<li class='info'>Export as .TSV added to setting</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Jul 16:`;
        html += `<li class='info'>Dialogs with audio(#4092, #4093, #4104) now show the green audio logo below</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Jul 15:`;
        html += `<li class='info'>Audio Playback function added to #4092</li>`;
        html += `<li class='info'>Audio Player functionality and interface depends on system and browser</li>`;
        html += `<li class='info'>Now can set the number of rows to be displayed(full or limited) and the expand 
            number</li>`;
        html += `<li class='info'>Header bugs fixed</li>`;
        html += `<li class='info'>Add remove in highlighted row' entity tab</li>`;
        html += `<li class='info'>Entity tab can now add custom entities</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Jul 2:`;
        html += `<li class='info'>Local save and load function, there may be bugs, only for testing, 
            Can only read the job of selected dialog </li>`;
        html += `<li class='info'>Extra events bugs fix</li></div>`;

        html += `<br><div class="info" contenteditable="true" >Jun 29:`;
        html += `<li class='info'>Editing entity value bugs fix</li>`;
        html += `<li class='info'>Coloring entity in sentence</li>`;
        html += `<li class='info'>Coloring entity(JA)</li>`;
        html += `<li class='info'>Tips bug fix</li>`;
        html += `<li class='info'>Add Full dialog, updatas notes</li>`;

    }

    //audio
    else if(appp == 5) {
        // d = "4092"
        // src = "{{ url_for('static', filename='4092.mp3') }}"
        // src = "{{ url_for('static', filename=" + d + ") }}"
        // src = "/static/4092.mp3"
        src = "/static/" + did[0] + ".mp3"
        console.log(src)
        html += `<figure><figcaption>Audio File: #` + did[0] + `</figcaption></figure><div class="audio">
            <audio id="player" width="600" height="50" 
            controls src=` + "/static/" + did[0] + ".mp3" + `>
            Your browser does not support the <code>audio</code> element.</audio></div>`
    }

    else html += ``;

    // document.getElementById("tips").innerText = `(when an event has been just added to the CG)`;

    document.getElementById("append").innerHTML = html;
    
    document.getElementById("append").querySelectorAll(".app").forEach(word => {

        word.addEventListener("mouseover", () => {
            event.target.style.color = "DarkRed";
        });
        word.addEventListener("mouseout", () => {
            p = parseInt(event.target.getAttribute("ph"))
            if(p == appp) event.target.style.color = "DarkRed";
            else if(p == 5) event.target.style.color = "darkgreen";
            else event.target.style.color = "black";
        });
        word.addEventListener("click", () => { 
            appp = parseInt(event.target.getAttribute("ph"));
            appendix()
        });
    });

    document.getElementById("append").querySelectorAll(".set").forEach(word => {

        word.addEventListener("mouseover", () => {
            event.target.style.color = "DarkRed";
        });
        word.addEventListener("mouseout", () => {
            t = parseInt(event.target.getAttribute("t"))
            if(t == 1 && max < 999) event.target.style.color = "DarkRed";
            else if(t == 2 && max > 999) event.target.style.color = "DarkRed";
            else if(t == 5 && eja) event.target.style.color = "DarkRed";
            else if(t == 6 && !eja) event.target.style.color = "DarkRed";
            else if(t == 7 && cgm) event.target.style.color = "DarkRed";
            else if(t == 8 && !cgm) event.target.style.color = "DarkRed";
            else if(t == 9 && hrefer) event.target.style.color = "DarkRed";
            else if(t == 10 && !hrefer) event.target.style.color = "DarkRed";
            else if(t == 11 && hcom) event.target.style.color = "DarkRed";
            else if(t == 12 && !hcom) event.target.style.color = "DarkRed";
            else event.target.style.color = "grey";
        });
        word.addEventListener("click", () => { 
            t = parseInt(event.target.getAttribute("t"))
            if(t == 1) max = prvmax;
            else if(t == 2) {
                prvmax = max;
                max = 1000;
            }
            else if(t == 3){
                var input = prompt('Please input # of rows', expand);
                if (isNaN(input) && input.length) alert("Must input numbers");
                else expand = parseInt(input);
                console.log(input)
            }
            // TSV
            else if(t == 4){
                console.log("to TSV")
                var obj = data;
                let today = new Date().toISOString().replace('-', '').replace('-', '').slice(2, 8)
                var filename = did + '_' + nm + '_' + today + '.tsv';
                console.log(filename)
                text = '';

                if(cgm) {
                    // title
                    for(var i in hd_tsv){
                        text += hd_tsv[i] + '\t';
                    }
                    text = text.substring(0, text.length - 1);
                    text += '\n';

                    // annotations
                    for(var i in obj){
                        // st + e1 + e2
                        if(i < max) {
                            text += obj[i].st + '\t';

                            if(obj[i].e1.length) {
                                for(var j in obj[i].e1) text += obj[i].e1[j] + ',';
                                text = text.substring(0, text.length - 1);
                            }
                            text += '\t';

                            if(obj[i].e2.length) {
                                for(var j in obj[i].e2) text += obj[i].e2[j] + ',';
                                text = text.substring(0, text.length - 1);
                            }
                            text += '\t' + obj[i].ty[3] + '\t';        
                            text += obj[i].ev + '\t';

                            // belA r
                            if(obj[i].eve[0]) {
                                for(var j in obj[i].eve[0]) {
                                    text += ' → ' + obj[i].eve[0][j][0] + ' ' + bel[obj[i].eve[0][j][1]%bel.length];
                                }
                            }
                            text += '\t';

                            // belB r
                            if(obj[i].eve[1]) {
                                for(var j in obj[i].eve[1]) {
                                    text += ' → ' + obj[i].eve[1][j][0] + ' ' + bel[obj[i].eve[1][j][1]%bel.length];
                                }
                            }
                            text += '\t';

                            // CGA r
                            if(obj[i].eve[2]) {
                                for(var j in obj[i].eve[2]) {
                                    text += ' → ' + obj[i].eve[2][j][0] + ' ' + cg[obj[i].eve[2][j][1]%cg.length];
                                }
                            }
                            text += '\t';

                            // CGB r
                            if(obj[i].eve[3]) {
                                for(var j in obj[i].eve[3]) {
                                    text += ' → ' + obj[i].eve[3][j][0] + ' ' + bel[obj[i].eve[3][j][1]%bel.length];
                                }
                            }
                            text += '\t';

                            text += obj[i].pr + '\t';


                            for(var j in obj[i].cc2[0]) {
                                if(obj[i].cc2[0][j][0]) {
                                    text += bel[obj[i].cc2[0][j][0]%bel.length] + ' ';
                                    if(obj[i].cc2[0][j][1]) text += obj[i].cc2[0][j][1] + ',';
                                    else text += obj[i].ty[3] + ',';
                                }
                                else text += ','
                            }
                            text = text.substring(0, text.length - 1);
                            text += '\t';

                            for(var j in obj[i].cc2[1]) {
                                if(obj[i].cc2[1][j][0]) {
                                    text += bel[obj[i].cc2[1][j][0]%bel.length] + ' ';
                                    if(obj[i].cc2[1][j][1]) text += obj[i].cc2[1][j][1] + ',';
                                    else text += obj[i].ty[3] + ',';
                                }
                                else text += ','
                            }
                            text = text.substring(0, text.length - 1);
                            text += '\t';

                            for(var j in obj[i].cc2[2]) {
                                if(obj[i].cc2[2][j][0]) {
                                    text += cg[obj[i].cc2[2][j][0]%cg.length] + ' ';
                                    if(obj[i].cc2[2][j][1]) text += obj[i].cc2[2][j][1] + ',';
                                    else text += obj[i].ty[3] + ',';
                                }
                                else text += ','
                            }
                            text = text.substring(0, text.length - 1);
                            text += '\t';

                            for(var j in obj[i].cc2[3]) {
                                if(obj[i].cc2[3][j][0]) {
                                    text += cg[obj[i].cc2[3][j][0]%cg.length] + ' ';
                                    if(obj[i].cc2[3][j][1]) text += obj[i].cc2[3][j][1] + ',';
                                    else text += obj[i].ty[3] + ',';
                                }
                                else text += ','
                            }
                            text = text.substring(0, text.length - 1);
                            text += '\t';


                            text += why[obj[i].cc[4]%why.length];
                            text += '\t';

                            text += obj[i].wip + '\t';
                            text += obj[i].com + '\n';
                        }
                    }



                }

                else { // old or transition mode
                        for(var i in hd2){
                        text += hd2[i] + '\t';
                    }
                    text = text.substring(0, text.length - 1);
                    text += '\n';

                    for(var i in obj){
                        // st + e1 + e2
                        if(i < max) {
                            text += i + '\t' + obj[i].st + '\t';
                            for(var j in obj[i].e1) text += obj[i].e1[j] + ',';
                            text = text.substring(0, text.length - 1);
                            text += '\t';

                            if(obj[i].e2.length) {
                                for(var j in obj[i].e2) text += obj[i].e2[j] + ',';
                                text = text.substring(0, text.length - 1);
                            }
                            text += '\t';
    
                            text += obj[i].ev + '\t';
                            text += obj[i].pr + '\t';

                            text += bel[obj[i].cc[0]%bel.length];
                            if(obj[i].ccc[0]) text += belc[obj[i].ccc[0]%belc.length];
                            text += '\t';
                            text += bel[obj[i].cc[1]%bel.length];
                            if(obj[i].ccc[1]) text += belc[obj[i].ccc[1]%belc.length];
                            text += '\t';
                            text += cg[obj[i].cc[2]%cg.length];
                            if(obj[i].ccc[2]) text += cgc[obj[i].ccc[2]%cgc.length];
                            text += '\t';
                            text += cg[obj[i].cc[3]%cg.length];
                            if(obj[i].ccc[3]) text += cgc[obj[i].ccc[3]%cgc.length];
                            text += '\t';


                            text += why[obj[i].cc[4]%why.length];
                            text += '\t';

                            text += obj[i].wip + '\t';
                            text += obj[i].com + '\n';
                        }
                    }
                } 
                
                // console.log(text)

                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:attachment/text,' + encodeURI(text);
                hiddenElement.target = '_blank';
                hiddenElement.download = filename;
                hiddenElement.click();
            }

            else if(t == 5) eja = 1;
            else if(t == 6) eja = 0;
            else if(t == 7) cgm = 1;
            else if(t == 8) cgm = 0;
            else if(t == 9) hrefer = 1;
            else if(t == 10) hrefer = 0;
            else if(t == 11) hcom = 1;
            else if(t == 12) hcom = 0;
            else if(t == 13){
                var input = prompt('Please input interval', autoSave);
                if (isNaN(input) && input.length) alert("Must input numbers");
                else autoSave = parseInt(input);
                console.log('new interval:', input)
            }               
            // console.log(".set(max,prmax,expand):", max, prvmax, expand)
            appendix()
            process_table()
        });
    });
}