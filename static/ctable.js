function ctable() {
    refresh = 0
    did = pack[di][0]
    dialog = pack[di][1]
    data = pack[di][2]
    d2 = pack[di][3]
    cols = hdc.length
    tst = 0     // for test
    senc = 0
    var input = ''
    autoSaveCount++;
    if(autoSaveCount == autoSave) save(1);

    // objToSave = d2;
    // subnum = 0
    // subnum2 = 0
    // e = 0
    // e2 = 0
    // console.log(d2)

    html = `<table style='font-family:Verdana; padding:2px; columnWidth:100px'>`;
    console.log('ctable on', did, data.length, d2.length, d1f, d2f)

    // header row
    html += "<tr style='font-weight:bold; background-color:Grey'>";
        for (var i = 0; i < cols; i++) html += "<td style='text-align:center;'>" + hdc[i] + "</td>"
    html += "</tr>";

    rows = Math.min(Math.max(max, max2), data.length)
    for (var i = 0; i < rows; i++) {

        // sentence row
        if(!data[i].ty[0]) html += stn(data[i].st, i, data[i].ty[3], 1);  // stn with <tr> at the end

        // entity
        if(!data[i].ty[0]) html += `<td rowspan="` + data[i].ty[1] + `">` + color(0, data[i].e1, 1, i, 1) + `</td>`

        // #
        // if(data[i].ty[0]) subnum += 1;
        // else subnum = 1;
        // if(data[i].ty[0] || (i < rows-1 && data[i+1].ty[0])) e = data[i].ty[3].toString() + '.' + subnum.toString();
        // else e = (data[i].ty[3]).toString();
        // numCorr refresh may 1
        if(d2f) numCorr(i, rows, d2)
        else numCorr(i, rows);

        html += not(0, i, 1)    // event
        html += not(1, i, 1)    // prag
        html += not(6, i, 1)    // Bel and CG only cgm

        // console.log("ck_0", d2[2])

        if(d2f) {               // d2
            if(!d2[i].ty[0]) html += `<td rowspan="` + d2[i].ty[1] + `">` + color(0, d2[i].e1, 1, i, 0, 1) + `</td>`
            html += not(0, i, 0, 1)  // event
            html += not(1, i, 0, 1)
            html += not(6, i, 0, 1)
        }
        
        html += `</tr>`
        if(!data[i].ty[0]) senc++;
    }
    // console.log("ck_1", d2[2])

    html += `</table><p><span id='i'></span><span id="tips" ty="5" ></span><span class="foot">SAVE_File_2(` 
        + (autoSave - autoSaveCount) + `)</span></p>`;

    if(refresh) {ctable(); return}
    document.getElementById("ctable").innerHTML = html;
    document.getElementById("tips").innerText = cursor;


    // load files
    document.querySelector("#in").addEventListener('change', function() { loader(this.files, 0, 1)});
    document.querySelector("#inc").addEventListener('change', function() { loader(this.files, 1, 1)});


    document.getElementById("header").querySelectorAll(".cload").forEach(word => {
        word.addEventListener("mouseover", () => {event.target.style.color = "DarkRed";});
        word.addEventListener("mouseout", () => {event.target.style.color = "grey";});
    });

    document.getElementById("header").querySelectorAll(".links").forEach(word => {
        word.addEventListener("mouseover", () => {event.target.style.color = "DarkRed";});
        word.addEventListener("mouseout", () => {event.target.style.color = "darkcyan";});
    });

    // foot
    document.getElementById("ctable").querySelectorAll(".foot").forEach(word => {
        word.addEventListener("mouseover", () => {
            const ty = parseInt(event.target.getAttribute("ty"));
            if(ty) document.getElementById("tips").innerText = `Upload/import job`;
            else if(d2f) document.getElementById("tips").innerText = `Save ` + file2 + ` to local`;
            else document.getElementById("tips").innerText = `File_2 is empty`;
            event.target.style.color = "DarkRed";
        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "grey";
            document.getElementById("tips").innerText = ``;
        });
        word.addEventListener("click", () => { 
            const ty = parseInt(event.target.getAttribute("ty"));
            console.log("foot click (ty)= ", ty);
            if(!ty && d2f) save(1)
        });
    });

    // word class
    document.getElementById("ctable").querySelectorAll(".word").forEach(word => {
        d = d2
        word.addEventListener("mouseover", () => {
            const t = event.target;
            const type = event.target.getAttribute("ty");
            const e = event.target.getAttribute("e");
            t.style.color = "Red";
            if(type == 1) document.getElementById("tips").innerText = `Add(JA) or Remove (${refine(t.innerText)})`;
            else if(type == 2) document.getElementById("tips").innerText = `Edit (${e})'s value`;
            else document.getElementById("tips").innerText = `+ (${refine(t.innerText)}) to entity`;
        });

        word.addEventListener("mouseout", () => {
            const w = refine(event.target.innerText); 
            const li = event.target.getAttribute("li");
            const e2index = d[li].e2.indexOf(w)
            const t = event.target;
            const type = event.target.getAttribute("ty");
            if(e2index > -1) t.style.color = "green";
            else if(type == 1) t.style.color = "blue";
            else if(type == 3) t.style.color = "grey";
            else t.style.color = "black";
            document.getElementById("tips").innerText = ``;
            // t.style.fontWeight = "normal";
            // document.getElementById("msg").innerText = "";
        });

        word.addEventListener("click", () => { 
            const w = refine(event.target.innerText);
            const e = event.target.getAttribute("e");
            const li = event.target.getAttribute("li");
            const type = event.target.getAttribute("ty");
            const index = d[li].er.indexOf(e);
            const e2index = d[li].e2.indexOf(w);

            // console.log("click:", li, type, e, w, index, e2index);


            // modifice previous
            if(type == 2) {
                console.log("type == 2");
                // console.log("Before", li, type, e, w, index)
                // console.log(d[li].er, e, d[li].er.indexOf(e))
                // console.log(d[li].e1, w, d[li].e1.indexOf(w))
                
                var input = prompt('Please input new entity value');
                if(input) {
                    d[li].e1.splice(index, 1)
                    d[li].er.splice(index, 1)
                    d[li].e1.push(e + '=' + input)
                    d[li].er.push(e)
                    
                }
                // else d[li].e1.push(e)

                console.log("Modified", li, type, e, w)
                // console.log(d[li].er)
                // console.log(d[li].e1)
            }

            // sentance click
            else {
                console.log("type != 2", type, e, index, w, e2index);
                if(e2index == -1 && index > -1) {
                    console.log("in er but not in e2");
                    // d[li].e2.push(e);
                    d[li].e2.push(w);
                }
                else {
                    if(d[li].er.includes(w)) {
                        d[li].e1.splice(d[li].er.indexOf(w), 1)
                        d[li].er.splice(d[li].er.indexOf(w), 1)
                        if(e2index > -1) d[li].e2.splice(e2index, 1)
                        console.log(d[li].e1);
                        console.log(d[li].er);
                        console.log(d[li].e2);
                    }
                    else {
                        d[li].er.push(w)
                        var input = prompt('Please input entity value');
                        if(input) d[li].e1.push(w + '=' + input)
                        else d[li].e1.push(w)
                        console.log(d[li].e1);
                        console.log(d[li].er);
                        console.log(d[li].e2);
                    } 
                }

            }
            // console.log("Af click:", li, type, e, w, index, e2index);
            // console.log('e1:', d[li].e1);
            // console.log('er:', d[li].er);
            // console.log('e2:', d[li].e2);
            ctable()
        });
    });

    // add class
    document.getElementById("ctable").querySelectorAll(".add").forEach(word => {
        d = d2
        word.addEventListener("mouseover", () => {
            const type = event.target.getAttribute("ty");
            if(type == 0) document.getElementById("tips").innerText = `+ Event`;
            else if(type == 1) document.getElementById("tips").innerText = `+ Pragmatic`;
            else if(type == 2) document.getElementById("tips").innerText = `+ Why in prose`;
            else if(type == 3) document.getElementById("tips").innerText = `+ Comments or remarks`;
            else if(type == 4) document.getElementById("tips").innerText = `+ Entity(JA)`;
            else if(type == 5) document.getElementById("tips").innerText = `Expand (${expand}) row(s)`;
            else if(type == 6) document.getElementById("tips").innerText = `+ Customized entity(IN)`;

            event.target.style.color = "Red";

        });
        word.addEventListener("mouseout", () => {
            const type = event.target.getAttribute("ty");
            document.getElementById("tips").innerText = ``;
            if(type == 5) event.target.style.color = "grey";
            // else if(type == 2) event.target.style.color = "grey";
            else event.target.style.color = "lightgrey";
        });
        word.addEventListener("click", () => { 
            const line = event.target.getAttribute("line");
            const type = event.target.getAttribute("ty");
            const li = parseInt(event.target.getAttribute("li"));
            // console.log(li)
            if(type == 0) {
                console.log('add')
                input = prompt('Please input event', line.substring(3))

                if(!d[li].ev.length) {
                    if(input) d[li].ev.push(input);
                }
                else {
                    if(input) {
                        // console.log(li)
                        d[parent(li)].ty[1] += 1;
                        max2 += 1;
                        // k = d[parent(li)].ty[3]
                        var tuple = getTup('', 1, li)
                        tuple.ev.push(input)
                        // d.splice(parseInt(li) + 1, 0, tuple);
                        d2.splice(li+1, 0, tuple)
                        synchronization(data, d2)
                    }
                }
                edr = li;
                // console.log("parent", parent(li), "parent size:", d[parent(li)].ty[1])
            }

            if(type == 1) {
                edr = li;
                var input = prompt('Please input Pragmatics', line.substring(3));
                if(input) d[li].pr.push(input);
            }

            if(type == 2) {
                var input = prompt('Please input Why in prose', prev_wip);
                if(input) {
                    prev_wip = input;
                    d[li].wip.push(input);
                }
            }

            if(type == 3) {
                var input = prompt('Comments?');
                if(input) d[li].com.push(input);
            }

            if(type == 4) {
                var input = prompt('Please input Entity(JA)', d[li].e1[0]);
                if(input) {
                    if(input.includes('=')) {
                        k = input.indexOf('=');
                        w = input.substring(0, k);
                        d[li].e2.push(d[li].er[d[li].er.indexOf(w)]);
                        // d[li].er.push(input.substring(0, k))
                    }
                    else {
                        k = d[li].er.indexOf(input);
                        if(k == -1) alert("entity not found!")
                        else d[li].e2.push(d[li].er[k]);
                    }
                }
                
                // d[li].e2.push(input);
            }
            if(type == 5) max += expand;
            if(type == 6) {
                // console.log("+ customized e1");
                var input = prompt('Please input entity name');
                if(input) {
                    if(input.includes('=')) {
                        k = input.indexOf('=');
                        d[li].e1.push(input)
                        d[li].er.push(input.substring(0, k))
                    }

                    else {
                        var input2 = prompt('Please input entity value');
                        if(input2) d[li].e1.push(input + '=' + input2)
                        else d[li].e1.push(input)
                        d[li].er.push(input)
                    }

                    console.log(d[li].er)
                    console.log(d[li].e1)

                } 
            }

            if(type == 7) {
                const ct = event.target.getAttribute("ct"); // cc type
                d[li].cc2[ct].push([1, 0]);
                console.log("adding cc2", d[li].cc2);
            }

            if(type == 8) {
                const ct = event.target.getAttribute("ct"); // cc type
                const cgi = event.target.getAttribute("cgi"); // cc item index
                if(d[li].cc2[ct][cgi][1] != d[li].ty[3]) {
                    // console.log("remove != ty3");
                    ri = checkr(d[li].cc2[ct][cgi][1]);
                    if(ri > -1) {
                        // console.log("ri ", ri, d[ri].eve[ct], d[li].cc2[ct][cgi]);
                        for(var j = 0; j < d[ri].eve[ct].length; j++) {
                            if(d[ri].eve[ct][j][0] == d[li].ty[3]) {
                                console.log("j ", j, d[ri].eve[ct], d[li].ty[3]);
                                d[ri].eve[ct].splice(j, 1)
                            }
                        }
                    }

                }
                d[li].cc2[ct].splice(cgi, 1)
                // console.log("removed from cc2", d[li].cc2);
            }
            if(d[li].ty[0] == 2) d[li].ty[0] == 1
            ctable()
        });
    });

    // Q class
    document.getElementById("ctable").querySelectorAll(".q").forEach(word => {
        d = d2
        word.addEventListener("mouseover", () => {
            const li = event.target.getAttribute("li");
            qt = d[li].ty[4]%qs.length;
            if(qt == 0) document.getElementById("tips").innerText = `Types of questions?`;
            else if(qt == 1) document.getElementById("tips").innerText = `Wh-question`;
            else if(qt == 2) document.getElementById("tips").innerText = `Yes/No Question`;
            else if(qt == 3) document.getElementById("tips").innerText = `Negated Yes/No Question`;
            else if(qt == 4) document.getElementById("tips").innerText = `Speculative self-answered wh-questions`;
            else if(qt == 5) document.getElementById("tips").innerText = `Right?/Tag Questions`;
            else if(qt == 6) document.getElementById("tips").innerText = `Rhetorical Questions`;
            else if(qt == 7) document.getElementById("tips").innerText = `Elided Questions`;

            event.target.style.color = "Red";
        });
        word.addEventListener("mouseout", () => {
            document.getElementById("tips").innerText = ``;
            const w = event.target.outerText
            // console.log(event.target.outerText)
            if(w == '[Q] ') event.target.style.color = "lightgrey";
            else  event.target.style.color = "blue";
        });
        word.addEventListener("click", () => { 
            const li = event.target.getAttribute("li");
            d[li].ty[4] += 1;
            ctable()
        });
    });

    // R(reason) class
    document.getElementById("ctable").querySelectorAll(".r").forEach(word => {
        d = d2

        word.addEventListener("mouseover", () => {
            // const li = event.target.getAttribute("li");
            // const rt = event.target.getAttribute("rt");
            // qt = d[li].ty[4]%qs.length;
            // if(qt == 0) document.getElementById("tips").innerText = `Types of questions?`;
            // else if(qt == 1) document.getElementById("tips").innerText = `Wh-question`;
            // else if(qt == 2) document.getElementById("tips").innerText = `Yes/No Question`;
            // else if(qt == 3) document.getElementById("tips").innerText = `Negated Yes/No Question`;
            // else if(qt == 4) document.getElementById("tips").innerText = `Speculative self-answered wh-questions`;
            // else if(qt == 5) document.getElementById("tips").innerText = `Right?/Tag Questions`;
            // else if(qt == 6) document.getElementById("tips").innerText = `Rhetorical Questions`;
            // else if(qt == 7) document.getElementById("tips").innerText = `Elided Questions`;

            event.target.style.color = "Red";
        });
        word.addEventListener("mouseout", () => {
            document.getElementById("tips").innerText = ``;
            const w = event.target.outerText
            // console.log(event.target.outerText)
            if(w == '[] ') event.target.style.color = "lightgrey";
            else  event.target.style.color = "blue";
        });
        word.addEventListener("click", () => { 
            const li = event.target.getAttribute("li");
            const rt = event.target.getAttribute("rt");
            d[li].r[rt] += 1;
            ctable()
        });
    });

    // edits
    document.getElementById("ctable").querySelectorAll(".edits").forEach(word => {
        d = d2
        word.addEventListener("mouseover", () => {
            document.getElementById("tips").innerText = `Edit current value`;
            event.target.style.color = "Red";
        });
        word.addEventListener("mouseout", () => {
            const type = event.target.getAttribute("ty");
            const li = event.target.getAttribute("li");
            document.getElementById("tips").innerText = ``;
            
            if(type == 4) event.target.style.color = "green";
            else if (type == 2) event.target.style.color = "grey"
            else if(type == 5 & event.target.innerText == d[li].ty[3]) 
                event.target.style.color = "lightgrey";
            else event.target.style.color = "black";
        });
        word.addEventListener("click", () => { 
            const type = event.target.getAttribute("ty");
            const li = event.target.getAttribute("li");
            const ct = event.target.getAttribute("ct"); // cc type
            const cgi = event.target.getAttribute("cgi"); // cc item index

            var input = prompt('Please input new value', event.target.innerText);

            if(type == 0) {
                if(input) d[li].ev.splice(0, 1, input);
                // else d[li].ev.splice(0, 1)
            }
            if(type == 1) {
                if(input) d[li].pr.splice(0, 1, input);
                // else d[li].pr.splice(0, 1)
            }
            if(type == 2) {
                if(input) d[li].wip.splice(0, 1, input);
                // else d[li].wip.splice(0, 1)
            }
            if(type == 3) {
                if(input) d[li].com.splice(0, 1, input);
                // else d[li].com.splice(0, 1)
            }
            if(type == 4) {
                console.log("Not edit at e2 anymore");
            }
            if(type == 5) {
                // console.log("edit refer#");
                if(input) {
                    k = parseFloat(input);
                    ri = checkr(k);
                    console.log("input:", k, "line", ri, "li", li);
                    if(ri > -1) {   // valid reference number
                        // if(ri >= li) { alert('Error: Event number must lees than current line(ed1)'); return;}
                        if(ri > li) { alert('Error: Input must be less or equal to event# (ed1)'); return;}
                        if(ri == li) ri = 0;

                        // input != original value
                        if(k != d[li].cc2[ct][cgi][1]) {
                            ori = checkr(d[li].cc2[ct][cgi][1]);
                            if(ori < 0) { alert('Error: Invalid original reference# (ed3)'); return;}

                            console.log("Updata: ", d[li].cc2[ct][cgi][1], " to ", k)
                            console.log("ori: ", d[ori].eve[ct]);

                            // change the original referencing eve(remove it)
                            // if multiple cc2 item point to same ty3, all removed**
                            for(var j = 0; j < d[ori].eve[ct].length; j++) {
                                if(d[ori].eve[ct][j][0] == d[li].ty[3] && d[li].cc2[ct][cgi][1]) {
                                    d[ori].eve[ct].splice(j, 1);
                                }
                            }
                            if(k == d[li].ty[3]) d[li].cc2[ct][cgi][1] = 0;
                            else d[li].cc2[ct][cgi][1] = k;

                            // add eve to new
                            // console.log("check add eve to new ref", k, "line", ri)
                            if(k && (ri > -1)) {
                                // console.log("add eve to new ref", k, "line", ri)
                                d[ri].eve[ct].push([d[li].ty[3], d[li].cc2[ct][cgi][0]])
                            }
                            // console.log("org:", event.target.innerText, "referece# to ", k, d[ri].eve[ct]);
                        }
                    }
                    else { alert('Error: Invalid event number(ed2)'); return;}
                }

            }
            ctable()
        });
    });
    
    // num
    document.getElementById("ctable").querySelectorAll(".num").forEach(word => {
        d = d2
        word.addEventListener("mouseover", () => {
            event.target.style.color = "Red";
            document.getElementById("tips").innerText = `Highlight current row`;

        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "grey";
            document.getElementById("tips").innerText = ``;
        });
        word.addEventListener("click", () => { 
            const li = event.target.getAttribute("li");
            d[li].ty[2] += 1;
            ctable()
        });
    });

    document.getElementById("ctable").querySelectorAll(".cc").forEach(word => {
        d = d2
        word.addEventListener("mouseover", () => {
            const ty = event.target.getAttribute("ty");
            const w = event.target.outerText;
            if(ty < 2) {
                if(!w) document.getElementById("tips").innerText = `Edit Believe value (null)`;
                else if(w == 'CT+') document.getElementById("tips").innerText = `(certain belief)`;
                else if(w == 'CT-') document.getElementById("tips").innerText = `(certain belief that not)`;
                else if(w == 'NB') document.getElementById("tips").innerText = `(no belief)`;
                else document.getElementById("tips").innerText = `(event may or may not have happened)`;
            }
            else if(ty < 4) {
                if(!w) document.getElementById("tips").innerText = `Edit Common Ground value (null)`;
                else if(w == 'JA') document.getElementById("tips").innerText = `(when an event has been just added to the CG)`;
                else if(w == 'IN') document.getElementById("tips").innerText = `(when an event already existed in the CG)`;
                else if(w == 'RT') document.getElementById("tips").innerText = `(when an event has been rejected from the CG)`;
                else document.getElementById("tips").innerText = `(when it is impossible to determine the status)`;
            }
            else {
                if(!w) document.getElementById("tips").innerText = `Edit why value (null)`;
                else if(w == 'WK') document.getElementById("tips").innerText = `(world knowledge)`;
                else if(w == 'C') document.getElementById("tips").innerText = `(context present in the dialog)`;
                else document.getElementById("tips").innerText = `(specific lexical item (word, phrase, expression))`;
            }
            event.target.style.color = "Red";
        });
        word.addEventListener("mouseout", () => {
            const w = event.target.outerText
            // console.log(event.target.outerText)
            if(w == 'JA') event.target.style.color = "Green";
            else if(w == 'RT') event.target.style.color = "Red";
            else if(w == 'IN') event.target.style.color = "Blue";
            else  event.target.style.color = "black";
            document.getElementById("tips").innerText = ``;
        });
        word.addEventListener("click", () => { 
            // console.log("cc click")
            const type = event.target.getAttribute("ty");
            const li = event.target.getAttribute("li");
            const cgi = parseInt(event.target.getAttribute("cgi"));

            if(cgm) {
                // console.log("ty,li,cg", type, li, cgi);
                if(type == 4) {
                    d[li].cc[type] += 1;
                    const w = why[d[li].cc[type]%why.length];
                    if(!w) cursor = `Edit why value (null)`;
                    else if(w == 'WK') cursor = `(world knowledge)`;
                    else if(w == 'C') cursor = `(context present in the dialog)`;
                    else cursor = `(specific lexical item (word, phrase, expression))`;
                }

                else {
                    d[li].cc2[type][cgi][0] += 1;
                    if(cgi) d[li].cc2[type][cgi][0] += cccorr(d[li].cc2[type][cgi][0], type);
                    if(type < 2) {
                        const w = bel[d[li].cc2[type][cgi][0]%bel.length];
                        // console.log("crs:", w, d[li].cc2[type][cg][0]);
                        if(!w) cursor = `Edit Believe value (null)`;
                        else if(w == 'CT+') cursor = `(certain belief)`;
                        else if(w == 'CT-') cursor = `(certain belief that not)`;
                        else if(w == 'NB') cursor = `(no belief)`;

                        else cursor = `(event may or may not have happened)`;
                    }
                    else {
                        const w = cg[d[li].cc2[type][cgi][0]%cg.length];
                        // console.log("crs:", w, d[li].cc2[type][cgi][0]);
                        if(!w) cursor = `Edit Common Ground value (null)`;
                        else if(w == 'JA') cursor = `(when an event has been just added to the CG)`;
                        else if(w == 'IN') cursor = `(when an event already existed in the CG)`;
                        else if(w == 'RT') cursor = `(when an event has been rejected from the CG)`;
                        else cursor = `(when it is impossible to determine the status)`;
                    }

                    if(d[li].cc2[type][cgi][1]) {
                        ri = checkr(d[li].cc2[type][cgi][1])
                        if(ri < 0) { alert('Error: Invalid event number(cc)'); return;}
                        // console.log(ri, d[ri].eve[type])
                        for(var j = 0; j < d[ri].eve[type].length; j++) {
                            if(d[ri].eve[type][j][0] == d[li].ty[3]) d[ri].eve[type][j][1] += 1;
                            if(cgi) d[ri].eve[type][j][1] += cccorr( d[ri].eve[type][j][1], type);
                        }
                    }
                }
            }
            else {
                d[li].cc[type] += 1;
                if(type < 2) {
                    const w = bel[d[li].cc[type]];
                    if(!w) cursor = `Edit Believe value (null)`;
                    else if(w == 'CT+') cursor = `(certain belief)`;
                    else if(w == 'CT-') cursor = `(certain belief that not)`;
                    else cursor = `(event may or may not have happened)`;
                }
                else if(type < 4) {
                    const w = cg[d[li].cc[type]];
                    if(!w) cursor = `Edit Common Ground value (null)`;
                    else if(w == 'JA') cursor = `(when an event has been just added to the CG)`;
                    else if(w == 'IN') cursor = `(when an event already existed in the CG)`;
                    else if(w == 'RT') cursor = `(when an event has been rejected from the CG)`;
                    else cursor = `(when it is impossible to determine the status)`;
                }
                else {
                    const w = why[d[li].cc[type]];
                    if(!w) cursor = `Edit why value (null)`;
                    else if(w == 'WK') cursor = `(world knowledge)`;
                    else if(w == 'C') cursor = `(context present in the dialog)`;
                    else cursor = `(specific lexical item (word, phrase, expression))`;
                }
            }

            ctable()
        });
    });

    document.getElementById("ctable").querySelectorAll(".remove").forEach(word => {
        // d = d2
        word.addEventListener("mouseover", () => {
            document.getElementById("tips").innerText = `Remove current row(extra event row)`;
            event.target.style.color = "lightgrey";
        });
        word.addEventListener("mouseout", () => {
            document.getElementById("tips").innerText = ``;
            event.target.style.color = "red";
        });
        word.addEventListener("click", () => { 
            const li = parseInt(event.target.getAttribute("li"));
            console.log("remove click", li, d2[li]);
            // dcp = d[li];
            removeFix(li, d2)
            // remove cc2 links
            // for (var j = 0; j < d[li].cc2.length; j++) {
            //     for (var k = 0; k < d[li].cc2[j].length; k++) {
            //         // console.log("remote1 line", ri, d[ri]);
            //         console.log("remote cc:", li, 'j,k:', j, k, 'at:', d[li].cc2[j][k]);
            //         ri = checkr(d[li].cc2[j][k][1]);
            //         if(ri < 0) { alert('Error: Invalid event number(rm1)'); return;}
            //         for (var l = 0; l < d[ri].eve[j].length; l++) {
            //             if(d[ri].eve[j][l][0] == d[li].ty[3]) {
            //                 console.log("remote1 line", ri, d[ri]);
            //                 d[ri].eve[j].splice(l, 1);
            //             }
            //         }
            //     }
            // }

            // // remove eve links
            // for (var j = 0; j < d[li].eve.length; j++) {
            //     for (var k = 0; k < d[li].eve[j].length; k++) {
            //         console.log("remote eve:", li, 'at:', d[li].eve[j][k][0]);
            //         ri = checkr(d[li].eve[j][k][0]);
            //         if(ri < 0) { 
            //             console.log('rm2: j,k,eve:', j, k, d[li]);
            //             alert('Error: Invalid event number(rm2)'); return;}

            //         for (var l = 0; l < d[ri].cc2[j].length; l++) {
            //             // console.log("remote ", ri, " cc2 ", d[ri].cc2[j][l], " e ", e);
            //             if(d[ri].cc2[j][l][1] == d.ty[3]) {
            //                 d[ri].cc2[j].splice(l, 1);
            //                 if(!(d[ri].cc2[j].length)) d[ri].cc2[j].push([0, 0])
            //             }
            //         }
            //     }
            // }                
            // console.log('b4 remove', i, data[li])
            d2[parent(li)].ty[1] -= 1
            d2.splice(li, 1)
            max2 -= 1
            // console.log('af remove', i, data[li])
            synchronization(data, d2)
            ctable()
        });
    });

}
