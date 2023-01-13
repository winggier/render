function process_table() {
    refresh = 0;
    autoSaveCount++;
    console.log('autoSaveCount', autoSaveCount);
    if(autoSaveCount == autoSave) save();
    ph = parseInt(phase)
    did = pack[di][0]
    dialog = pack[di][1]
    data = pack[di][2]
    senc = 0;
    if(audios.includes(did[0])) clips = 1;
    // console.log("clips:", clips)

    html = `<table style='font-family:Verdana; padding:2px; columnWidth:100px'>`;
    html += "<tr style='font-weight:bold; background-color:Grey'>";

    if(!ph) hd = hd0
    else if(ph == 1) hd = hd1
    else hd = hd2

    index = hd.indexOf('Entity(JA)');
    if(index > -1 && eja) { // only splice array when item is found
        hd.splice(index, 1); // 2nd parameter means remove one item only
    }
    else if(index == -1 && !eja) hd.splice(2, 0, 'Entity(JA)');

    index = hd.indexOf('Comment');
    if(index > -1 && hcom) { // only splice array when item is found
        hd.splice(index, 1); // 2nd parameter means remove one item only
    }
    else if(index == -1 && !hcom) hd.push('Comment');
    
    // console.log(hd2)

    for (var i = 0; i < hd.length; i++) {
        if(bcgtab.includes(hd[i])) 
            html += `<td style='text-align:center; width: 5%'>` + hd[i] + `</td>`
        else html += "<td style='text-align:center;'>" + hd[i] + "</td>"
    }
    
    html += "</tr>";

    // intro clips
    if(clips) html += audio_clips(0);

    rows = Math.min(max, data.length)
    for (var i = 0; i < rows; i++) {
        // console.log("ty3",data[i].ty[3]);
        // if(i<2) console.log(i, data[i].eve)

        if(data[i].ty[0]) subnum += 1;
        else subnum = 1;
        // if(data[i].st[0] == 'A') html += "<tr style='background-color:blue'><td>" + i + "</td>";
        // else html += "<tr><td>" + i + "</td>";
        
        // clips
        // console.log(senc, clips, data[i].ty[0]);
        if(!(senc%10) & clips & !data[i].ty[0]) html += audio_clips(senc/10 +1)

        // highlight
        if(i == rows-1) html += `<tr>`;
        else {
            if(data[i].ty[2]%2) html += `<tr style='background-color:lightpink'>`;
            else html += `<tr>`;
        }


        html += stn(data[i].st, i, senc);                 //sentance

        // not rowspan
        // if(data[i].ty[0] && data[i].ty[2]%2)        // hightlight and remove in entity
        //     html += `<td class="remove" style='text-align:center; color:lightgrey' li="${i}">REMOVE</td>`;
        // else html += `<td li="${i}" style='text-align:center;'>` + color(0, data[i].e1, 1, i) + `</td>`;      //e1

        // rowspan
        ww = 10;
        if(!data[i].ty[0]) {
            if(!(data[i].e1.length)) html += `<td rowspan="` + data[i].ty[1] 
                + `" style='text-align:center;'><span class="add" li="${i}" ty="6" >+</span></td>`
            else html += `<td rowspan="` + data[i].ty[1] + `" style='width:` + ww + `%' li="${i}" >` + color(0, data[i].e1, 1, i) + `</td>`;
        }
        // html += "<td>" + data[i].e2 + "</td>";      //entity2
        // if(!data[i].e1.length) html += `</td><td class="cc" ty="5" li="${i}">`
        // else html += `</td><td class="cc" ty="5" li="${i}">` + data[i].e1[data[i].cc[5]%data[i].e1.length];
        // e2
        if(!eja) html += not(4, i); 

        // #
        if(i == rows-1) {
            // html += `<td class="add" style='color:grey; font-weight: bold;' ty="5">↓</td>`;
            numRow = `<span class="add" style='color:grey; font-weight: bold;' ty="5">↓</span>`
        }
        else {
            // current or next is extra event
            if(data[i].ty[0] || data[i+1].ty[0]) {
                if(data[i].ty[0]) e = senc.toString() + '.' + subnum.toString();
                else e = (senc+1).toString() + '.' + subnum.toString();
            }
            // regular #
            else e = (senc+1).toString();
            e = parseFloat(e);

            // ty3 updata
            if(e != data[i].ty[3]) {
                
                // console.log("ty[3]", data[i].ty[3], " changed to ", e);
                data[i].ty[3] = e;

                // change new ty3 in others' eve
                for (var j = 0; j < data[i].cc2.length; j++) {
                    for (var k = 0; k < data[i].cc2[j].length; k++) {
                        ri = checkr(data[i].cc2[j][k][1]);
                        if(ri < 0) { 
                            console.log("Invalid event number", i, j, k, data[i].cc2[j][k][1], data[i]);
                            // alert('Error: Invalid event number(+ev1)');
                            break;
                            // return;
                        }

                        for (var l = 0; l < data[ri].eve[j].length; l++) {
                            // console.log("remote1 ", ri, " eve ", data[ri].eve[j][l], " e ", e);
                            if(data[ri].eve[j][l][0] == data[i].ty[3]) {

                                data[ri].eve[j][l][0] = e;
                                // console.log("after remote1 ", data[ri].eve[j][l]);
                                // this change after previous line print, then reload table again
                                // process_table()
                                refresh = 1;
                            }
                        }
                    }
                }

                // change others reference(cc2) to new ty3
                for (var j = 0; j < data[i].eve.length; j++) {
                    for (var k = 0; k < data[i].eve[j].length; k++) {
                        ri = checkr(data[i].eve[j][k][0]);
                        // if(data[i].eve[j][k][0] == 91.2) {
                        //     console.log('912 ri:',ri);
                        //     console.log(data[116]);
                        //     console.log(data[135]);

                        // }
                        if(ri < 0) { 
                            // alert('Error: Invalid event number(+ev2)'); 
                            
                            console.log("ev2err in change others (cc2) to new ty3", i, j, k); 
                            console.log(data[i].eve)
                            // console.log(data[i].eve[j][k])
                            console.log(data[i].eve[j][k][0])
                            // console.log(data[i].ty[3])
                            // console.log(data[i-1].ty[3])
                            break;
                            // return;
                        }

                        for (var l = 0; l < data[ri].cc2[j].length; l++) {
                            // console.log("remote ", ri, " cc2 ", data[ri].cc2[j][l], " e ", e);
                            if(data[ri].cc2[j][l][1] == data[i].ty[3]) {
                                data[ri].cc2[j][l][1] = e;
                                refresh = 1;
                            }
                        }
                    }
                }

                // data[i].ty[3] = e;
            }
            // html += `<td style='text-align:center; width:1%; font-weight:bold;' class="num" li="${i}">` + e + `</td>`;
            numRow = `<span class="num" li="${i}">` + e + ` </span>`
        }
           
        if(ph) {
            html += not(0, i);                          //event
            html += not(1, i);                          //Pragmatics
            if(ph == 2) {                               //cc, why&wip
                if(cgm) html += not(6, i);              //default
                else html += not(5, i);
            }           
        }
        if(!hcom) html += not(3, i);                        //comment
        // html += "<td><input type='checkbox' ></td>";     //mark

        html += "</tr>";
        if(!data[i].ty[0]) senc++;
    }
    
    html += `</table><p><span id='i'></span><span id="tips" ty="5" ></span>
        <span><label for="in" class="foot" ty='1'>LOAD</label><input type="file" id="in"/></span>
        <span class="foot">SAVE</span></p>`;

    document.getElementById("table").innerHTML = html;
    document.getElementById("tips").innerText = cursor;
    appendix();
    if(refresh) process_table();
    // console.log("table done");

    //click functions
    document.getElementById("table").querySelectorAll(".word").forEach(word => {
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
            const e2index = data[li].e2.indexOf(w)
            const t = event.target;
            const type = event.target.getAttribute("ty");
            if(e2index > -1) t.style.color = "green";
            else if(type == 1) t.style.color = "blue";
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
            const index = data[li].er.indexOf(e);
            const e2index = data[li].e2.indexOf(w);

            // console.log("click:", li, type, e, w, index, e2index);


            // modifice previous
            if(type == 2) {
                console.log("type == 2");
                // console.log("Before", li, type, e, w, index)
                // console.log(data[li].er, e, data[li].er.indexOf(e))
                // console.log(data[li].e1, w, data[li].e1.indexOf(w))
                
                data[li].e1.splice(index, 1)
                data[li].er.splice(index, 1)
                var input = prompt('Please input new entity value');
                if(input) data[li].e1.push(e + '=' + input)
                else data[li].e1.push(e)
                data[li].er.push(e)

                console.log("Modified", li, type, e, w)
                console.log(data[li].er)
                console.log(data[li].e1)
            }

            // sentance click
            else {
                console.log("type != 2", type, e, index, w, e2index);
                if(e2index == -1 && index > -1) {
                    console.log("in er but not in e2");
                    // data[li].e2.push(e);
                    data[li].e2.push(w);
                }
                else {
                    if(data[li].er.includes(w)) {
                        data[li].e1.splice(data[li].er.indexOf(w), 1)
                        data[li].er.splice(data[li].er.indexOf(w), 1)
                        if(e2index > -1) data[li].e2.splice(e2index, 1)
                        console.log(data[li].e1);
                        console.log(data[li].er);
                        console.log(data[li].e2);
                    }
                    else {
                        data[li].er.push(w)
                        var input = prompt('Please input entity value');
                        if(input) data[li].e1.push(w + '=' + input)
                        else data[li].e1.push(w)
                        console.log(data[li].e1);
                        console.log(data[li].er);
                        console.log(data[li].e2);
                    } 
                }

            }
            console.log("Af click:", li, type, e, w, index, e2index);
            console.log(data[li].e1);
            console.log(data[li].er);
            console.log(data[li].e2);
            process_table()
        });
    });

    document.getElementById("table").querySelectorAll(".cc").forEach(word => {
        // const tar = event.target;
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
        // word.addEventListener("mouseover", () => {event.target.style.backgroundColor = "lightgrey";});
        // word.addEventListener("mouseout", () => {
        //     const li = event.target.getAttribute("li");
        //     if(li%2) event.target.style.backgroundColor = "rgb(238, 230, 203)";
        //     else event.target.style.backgroundColor = "#dddddd";
        // });
        word.addEventListener("click", () => { 
            // console.log("cc click")
            const type = event.target.getAttribute("ty");
            const li = event.target.getAttribute("li");
            const cgi = parseInt(event.target.getAttribute("cgi"));

            // console.log(li, type, cg, data[li].cc2[cgi][0])
            if(cgm) {
                // console.log("ty,li,cg", type, li, cgi);
                if(type == 4) {
                    data[li].cc[type] += 1;
                    const w = why[data[li].cc[type]%why.length];
                    if(!w) cursor = `Edit why value (null)`;
                    else if(w == 'WK') cursor = `(world knowledge)`;
                    else if(w == 'C') cursor = `(context present in the dialog)`;
                    else cursor = `(specific lexical item (word, phrase, expression))`;
                }

                else {
                    data[li].cc2[type][cgi][0] += 1;
                    if(cgi) data[li].cc2[type][cgi][0] += cccorr(data[li].cc2[type][cgi][0], type);
                    if(type < 2) {
                        const w = bel[data[li].cc2[type][cgi][0]%bel.length];
                        // console.log("crs:", w, data[li].cc2[type][cg][0]);
                        if(!w) cursor = `Edit Believe value (null)`;
                        else if(w == 'CT+') cursor = `(certain belief)`;
                        else if(w == 'CT-') cursor = `(certain belief that not)`;
                        else if(w == 'NB') cursor = `(no belief)`;

                        else cursor = `(event may or may not have happened)`;
                    }
                    else {
                        const w = cg[data[li].cc2[type][cgi][0]%cg.length];
                        // console.log("crs:", w, data[li].cc2[type][cgi][0]);
                        if(!w) cursor = `Edit Common Ground value (null)`;
                        else if(w == 'JA') cursor = `(when an event has been just added to the CG)`;
                        else if(w == 'IN') cursor = `(when an event already existed in the CG)`;
                        else if(w == 'RT') cursor = `(when an event has been rejected from the CG)`;
                        else cursor = `(when it is impossible to determine the status)`;
                    }


                    if(data[li].cc2[type][cgi][1]) {
                        ri = checkr(data[li].cc2[type][cgi][1])
                        if(ri < 0) { alert('Error: Invalid event number(cc)'); return;}
                        // console.log(ri, data[ri].eve[type])
                        for(var j = 0; j < data[ri].eve[type].length; j++) {
                            if(data[ri].eve[type][j][0] == data[li].ty[3]) data[ri].eve[type][j][1] += 1;
                            if(cgi) data[ri].eve[type][j][1] += cccorr( data[ri].eve[type][j][1], type);
                        }
                    }
                }
            }
            else {
                data[li].cc[type] += 1;
                if(type < 2) {
                    const w = bel[data[li].cc[type]];
                    if(!w) cursor = `Edit Believe value (null)`;
                    else if(w == 'CT+') cursor = `(certain belief)`;
                    else if(w == 'CT-') cursor = `(certain belief that not)`;
                    else cursor = `(event may or may not have happened)`;
                }
                else if(type < 4) {
                    const w = cg[data[li].cc[type]];
                    if(!w) cursor = `Edit Common Ground value (null)`;
                    else if(w == 'JA') cursor = `(when an event has been just added to the CG)`;
                    else if(w == 'IN') cursor = `(when an event already existed in the CG)`;
                    else if(w == 'RT') cursor = `(when an event has been rejected from the CG)`;
                    else cursor = `(when it is impossible to determine the status)`;
                }
                else {
                    const w = why[data[li].cc[type]];
                    if(!w) cursor = `Edit why value (null)`;
                    else if(w == 'WK') cursor = `(world knowledge)`;
                    else if(w == 'C') cursor = `(context present in the dialog)`;
                    else cursor = `(specific lexical item (word, phrase, expression))`;
                }
            }

            process_table()
        });
    });

    // ccc
    document.getElementById("table").querySelectorAll(".ccc").forEach(word => {
        word.addEventListener("mouseover", () => {
            document.getElementById("tips").innerText = `New status`;
            event.target.style.color = "Red";
        });
        word.addEventListener("mouseout", () => {
            document.getElementById("tips").innerText = ``;
            const w = event.target.outerText
            // console.log(event.target.outerText)
            if(w == 'JA') event.target.style.color = "Green";
            else if(w == 'RT') event.target.style.color = "Red";
            else if(w == 'IN') event.target.style.color = "Blue";
            else  event.target.style.color = "black";
        });
        word.addEventListener("click", () => { 
            const type = event.target.getAttribute("ty");
            const li = event.target.getAttribute("li");
            data[li].ccc[type] += 1;
            process_table()
        });
    });

    document.getElementById("table").querySelectorAll(".ccc0").forEach(word => {
        word.addEventListener("mouseover", () => {
            document.getElementById("tips").innerText = `Status conversion`;
            event.target.style.color = "Red";
        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "lightgrey";
            document.getElementById("tips").innerText = ``
        });
        word.addEventListener("click", () => { 
            const type = event.target.getAttribute("ty");
            const li = event.target.getAttribute("li");
            data[li].ccc[type] += 1;
            process_table()
        });
    });

    // Q
    document.getElementById("table").querySelectorAll(".q").forEach(word => {
        word.addEventListener("mouseover", () => {
            const li = event.target.getAttribute("li");
            qt = data[li].ty[4]%qs.length;
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
            data[li].ty[4] += 1;
            process_table()
        });
    });

    // add
    document.getElementById("table").querySelectorAll(".add").forEach(word => {
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
                var input = prompt('Please input event', line.substring(3));

                if(!data[li].ev.length) {
                    if(input) data[li].ev.push(input);
                    // console.log(data[li].ev)
                }
                else {
                    if(input) {
                        // console.log(li)
                        data[parent(li)].ty[1] += 1;
                        max += 1;
                        // k = data[parent(li)].ty[3]
                        var tuple = Object.freeze({ st:'', e1:[], e2:[], er:[], ev:[input], pr:[], why:[], wip:[], 
                            com:[], cc:[0, 0, 0, 0, 0], ccc:[0, 0, 0, 0], ty:[1, li, 0, 0, 0],  
                            cc2:[[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]], eve:[[], [], [], []]})
                        // data.splice(parseInt(li) + 1, 0, tuple);
                        data.splice(li+1, 0, tuple);
                    }
                }
                edr = li;
                // console.log("parent", parent(li), "parent size:", data[parent(li)].ty[1])
            }

            if(type == 1) {
                edr = li;
                var input = prompt('Please input Pragmatics', line.substring(3));
                if(input) data[li].pr.push(input);
            }

            if(type == 2) {
                var input = prompt('Please input Why in prose', prev_wip);
                if(input) {
                    prev_wip = input;
                    data[li].wip.push(input);
                }
            }

            if(type == 3) {
                var input = prompt('Comments?');
                if(input) data[li].com.push(input);
            }
            if(type == 4) {
                var input = prompt('Please input Entity(JA)', data[li].e1[0]);
                if(input) {
                    if(input.includes('=')) {
                        k = input.indexOf('=');
                        w = input.substring(0, k);
                        data[li].e2.push(data[li].er[data[li].er.indexOf(w)]);
                        // data[li].er.push(input.substring(0, k))
                    }
                    else {
                        k = data[li].er.indexOf(input);
                        if(k == -1) alert("entity not found!")
                        else data[li].e2.push(data[li].er[k]);
                    }

                }
                
                // data[li].e2.push(input);
            }
            if(type == 5) max += expand;
            if(type == 6) {
                // console.log("+ customized e1");
                var input = prompt('Please input entity name');
                if(input) {
                    if(input.includes('=')) {
                        k = input.indexOf('=');
                        data[li].e1.push(input)
                        data[li].er.push(input.substring(0, k))
                    }

                    else {
                        var input2 = prompt('Please input entity value');
                        if(input2) data[li].e1.push(input + '=' + input2)
                        else data[li].e1.push(input)
                        data[li].er.push(input)
                    }

                    console.log(data[li].er)
                    console.log(data[li].e1)

                } 
            }

            if(type == 7) {
                const ct = event.target.getAttribute("ct"); // cc type
                data[li].cc2[ct].push([1, 0]);
                console.log("adding cc2", data[li].cc2);
            }

            if(type == 8) {
                const ct = event.target.getAttribute("ct"); // cc type
                const cgi = event.target.getAttribute("cgi"); // cc item index
                if(data[li].cc2[ct][cgi][1] != data[li].ty[3]) {
                    // console.log("remove != ty3");
                    ri = checkr(data[li].cc2[ct][cgi][1]);
                    if(ri > -1) {
                        // console.log("ri ", ri, data[ri].eve[ct], data[li].cc2[ct][cgi]);
                        for(var j = 0; j < data[ri].eve[ct].length; j++) {
                            if(data[ri].eve[ct][j][0] == data[li].ty[3]) {
                                console.log("j ", j, data[ri].eve[ct], data[li].ty[3]);
                                data[ri].eve[ct].splice(j, 1)

                            }
                        }
                    }

                }
                data[li].cc2[ct].splice(cgi, 1)
                // console.log("removed from cc2", data[li].cc2);
            }

            // console.log(data)
            process_table()
        });
    });

    // edits
    document.getElementById("table").querySelectorAll(".edits").forEach(word => {
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
            else if(type == 5 & event.target.innerText == data[li].ty[3]) 
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
                if(input) data[li].ev.splice(0, 1, input);
                else data[li].ev.splice(0, 1)
            }
            if(type == 1) {
                if(input) data[li].pr.splice(0, 1, input);
                else data[li].pr.splice(0, 1)
            }
            if(type == 2) {
                if(input) data[li].wip.splice(0, 1, input);
                else data[li].wip.splice(0, 1)
            }
            if(type == 3) {
                if(input) data[li].com.splice(0, 1, input);
                else data[li].com.splice(0, 1)
            }
            if(type == 4) {
                console.log("Not edit at e2 anymore");
                
                // var input = prompt('Please input Entity(JA)', data[li].e1[0]);

                // if(input) {
                //     if(input.includes('=')) {
                //         k = input.indexOf('=');
                //         w = input.substring(0, k);
                //         console.log("edit:", k, w);
                //         data[li].e2.splice(0, 1, data[li].er[data[li].er.indexOf(w)]);
                //         // data[li].er.push(input.substring(0, k))
                //     }
                //     else {
                //         k = data[li].er.indexOf(input);
                //         if(k == -1) alert("entity not found!")
                //         else data[li].e2.splice(0, 1, data[li].er[k]);
                //     }

                // }
                // else data[li].e2.splice(0, 1);

                // if(input) data[li].e2.splice(0, 1, input);
                // else data[li].e2.splice(0, 1)
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
                        if(k != data[li].cc2[ct][cgi][1]) {
                            ori = checkr(data[li].cc2[ct][cgi][1]);
                            if(ori < 0) { alert('Error: Invalid original reference# (ed3)'); return;}

                            console.log("Updata: ", data[li].cc2[ct][cgi][1], " to ", k)
                            console.log("ori: ", data[ori].eve[ct]);
                            // console.log("1:", data[0].eve);

                            // change the original referencing eve(remove it)
                            // if multiple cc2 item point to same ty3, all removed**
                            for(var j = 0; j < data[ori].eve[ct].length; j++) {
                                // console.log("ck: ", data[ori].eve[ct][j][0], data[li].cc2[ct][cgi][1])
                                if(data[ori].eve[ct][j][0] == data[li].ty[3] && data[li].cc2[ct][cgi][1]) {
                                    // console.log("removed: ", data[ori].eve[ct][j][0], data[li].cc2[ct][cgi][1])
                                    data[ori].eve[ct].splice(j, 1);
                                }
                            }
                            if(k == data[li].ty[3]) data[li].cc2[ct][cgi][1] = 0;
                            else data[li].cc2[ct][cgi][1] = k;

                            // add eve to new
                            // console.log("check add eve to new ref", k, "line", ri)
                            if(k && (ri > -1)) {
                                // console.log("add eve to new ref", k, "line", ri)
                                data[ri].eve[ct].push([data[li].ty[3], data[li].cc2[ct][cgi][0]])
                            }
                            // console.log("org:", event.target.innerText, "referece# to ", k, data[ri].eve[ct]);
                        }
                    }
                    else { alert('Error: Invalid event number(ed2)'); return;}
                }

            }
            // console.log("1+:", data[0].eve);

            process_table()
        });
    });
    
    // num
    document.getElementById("table").querySelectorAll(".num").forEach(word => {
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
            data[li].ty[2] += 1;
            process_table()
        });
    });

    // remive
    document.getElementById("table").querySelectorAll(".remove").forEach(word => {
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
            console.log("remove click", li);
            data[parent(li)].ty[1] -= 1;
            d = data[li];

            // remove cc2 links
            for (var j = 0; j < d.cc2.length; j++) {
                for (var k = 0; k < d.cc2[j].length; k++) {
                    ri = checkr(d.cc2[j][k][1]);
                    if(ri < 0) { alert('Error: Invalid event number(rm1)'); return;}

                    for (var l = 0; l < data[ri].eve[j].length; l++) {
                        // console.log("remote1 ", ri, " eve ", data[ri].eve[j][l], " e ", e);
                        if(data[ri].eve[j][l][0] == d.ty[3]) {
                            data[ri].eve[j].splice(l, 1);
                            
                        }
                    }
                }
            }

            // remove eve links
            for (var j = 0; j < d.eve.length; j++) {
                for (var k = 0; k < d.eve[j].length; k++) {
                    ri = checkr(d.eve[j][k][0]);
                    if(ri < 0) { alert('Error: Invalid event number(rm2)'); return;}

                    for (var l = 0; l < data[ri].cc2[j].length; l++) {
                        // console.log("remote ", ri, " cc2 ", data[ri].cc2[j][l], " e ", e);
                        if(data[ri].cc2[j][l][1] == d.ty[3]) {
                            data[ri].cc2[j].splice(l, 1);
                            if(!(data[ri].cc2[j].length)) data[ri].cc2[j].push([0, 0])
                        }
                    }
                }
            }                



            data.splice(li, 1)
            process_table()
        });
    });

    // foot
    document.getElementById("table").querySelectorAll(".foot").forEach(word => {
        word.addEventListener("mouseover", () => {
            const ty = parseInt(event.target.getAttribute("ty"));
            if(ty) document.getElementById("tips").innerText = `Upload/import job`;
            else document.getElementById("tips").innerText = `Save current job to local`;
            event.target.style.color = "DarkRed";
        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "grey";
            document.getElementById("tips").innerText = ``;
        });
        word.addEventListener("click", () => { 
            const ty = parseInt(event.target.getAttribute("ty"));
            console.log("foot click = ", ty);
            if(!ty) save()
        });
    });

    // load
    document.querySelector("#in").addEventListener('change', function() {
        var all_files = this.files;
        if(all_files.length == 0) { alert('Error : No file selected'); return;}

        // first file selected by user
        var file = all_files[0];

        // Max 2 MB allowed
        if(file.size > 2*1024*1024) { alert('Error : Exceeded size 2MB'); return;}
        var reader = new FileReader();

        // file reading finished successfully
        reader.addEventListener('load', function(e) {

            // var dd = e.target.file;
            console.log(file.name)
            k = file.name.indexOf('_')
            // if(k < 0) { alert('Error : Wrong File Name'); return;}
            if(k < 0) { alert('Error : Wrong File Name');}
            
            load_did = file.name.substring(0, k);
            v = dids.indexOf(load_did) - dids.indexOf(did[0]);;
            console.log("Did:", did[0], load_did, v);
            reload(v, 0);
            
            rest = file.name.substring(k+1);
            k = rest.indexOf('_');
            if(k < 0) { alert('Error : Wrong File Name#2'); return;}
            nm = rest.substring(0, k);
            // nm = file.name.substring(k,)
            // console.log(did, nm);                

            var text = e.target.result;
            text = text.split('\n');
            // console.log("read:", text);

            line = text[0].split(',');
            // console.log(line)
            if(line.length == 1) cgm = 0;
            else cgm = 1;
            if(cgm) text.splice(0, 1);
            // console.log(text)

            // Referencing
            if(cgm) {
                // first line
                max = parseInt(line[0]);
                eja = parseInt(line[1]);
                cgm = parseInt(line[2]);
                hrefer = parseInt(line[3]);
                if(line.length > 4) {
                    console.log('load first line:', line.length);
                    focusClip = parseInt(line[4]);
                }

                for(i in text) {
                    line = text[i].split('\t');
                    if((i == max) || (i == data.length)) break;
                    replace = 1;

                    var tuple = Object({ st:'', e1:[], e2:[], er:[], ev:[], pr:[], why:[], wip:[], 
                            com:[], cc:[0, 0, 0, 0, 0], ccc:[0, 0, 0, 0], ty:[0, 0, 0, 0, 0],  
                            cc2:[[], [], [], []], eve:[[], [], [], []]})

                    // console.log(i, max, data.length)
                    if(data[i].st != line[0]) {
                        console.log("Dialog != ", i, data[i].st, line[0])
                        replace = 0;
                    }

                    // main event
                    else tuple.st = data[i].st;

                    data.splice(i, replace, tuple);
                    console.log(i, line);
                    // console.log(data[i])
                    cp(data[i].e1,  line[1], 1)
                    cp(data[i].e2,  line[2], 0)
                    cp(data[i].er,  line[3], 1)
                    cp(data[i].ev,  line[4], 0)
                    cp(data[i].pr,  line[5], 0)
                    cp(data[i].why, line[6], 0)
                    cp(data[i].wip, line[7], 0)
                    cp(data[i].com, line[8], 0)
                    cp(data[i].cc,  line[9], 2)
                    cp(data[i].ccc, line[10], 2)
                    cp(data[i].ty,  line[11], 2)
                    cp(data[i].cc2, line[12], 3)
                    cp(data[i].eve, line[13], 4)
                    // console.log(line);
                    // console.log(data[i]);

                    // ty[4](Q) fix in load
                    if(data[i].ty.length == 4) data[i].ty.push(0);
                }

                console.log("load done");
            }

            // Transition
            else {
                max = parseInt(text[0]);
                console.log(max, text[0])
                edr = max;
                cgm = 0;
                s = text.length -1;
                if((s-1)/12 != max && !cgm) console.log("wrong file size(!cgm)", s, (s-1)%12, max);
                else console.log("size okay", s, max);


                // line = 1
                for(var i = 0; i < max; i++) {
                    if(data[i].st != text[i*12+1]) {
                        console.log("!= to data[i]", data[i].st, text[i*12+1])
                        if(text[i*12+1].length) {alert('Error : Bad dialogs'); return;}
                        var tuple = Object.freeze({ st:'', e1:[], e2:[], er:[], ev:[], pr:[], why:[], wip:[], 
                            com:[], cc:[0, 0, 0, 0, 0], ccc:[0, 0, 0, 0], ty:[0, 0, 0, 0], 
                            cc2:[[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]], eve:[[], [], [], []]})
                            // data.splice(parseInt(li) + 1, 0, tuple);
                        data.splice(i, 0, tuple);
                        
                    }

                    // else console.log("st check equal")
                    // data[i].e1.length = 0;
                    // for (const element of text[i*12+2].split(',')) data[i].e1.push(element)
                    
                    cp(data[i].e1, text[i*12 +2], 1)
                    cp(data[i].e2, text[i*12 +3], 0)
                    cp(data[i].er, text[i*12 +4], 1)
                    cp(data[i].ev, text[i*12 +5], 0)
                    cp(data[i].pr, text[i*12 +6], 0)
                    cp(data[i].why, text[i*12 +7], 0)
                    cp(data[i].wip, text[i*12 +8], 0)
                    cp(data[i].com, text[i*12 +9], 0)
                    cp(data[i].cc, text[i*12 +10], 2)
                    cp(data[i].ccc, text[i*12 +11], 2)
                    cp(data[i].ty, text[i*12 +12], 2)
                    // console.log("ty", data[i].ty)
                }
            }
            header()
            process_table()
        });

        // file reading failed
        reader.addEventListener('error', function() { alert('Error : Failed to read file');});

        // read as text file
        reader.readAsText(file);
    });
}