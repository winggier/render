
function color(type, v, a, b, page=0, sec=0) {
    d = data
    if(sec) d = d2
    html = ``
    // comparison
    if(page == 1) {
        // if(sec) d = d2
        if(!(v.length)) return html
        else {
            for(var i = 0; i < v.length; i++) {
                k = v[i].indexOf('=')
                if(k > -1) w = v[i].substring(0, k);
                else w = v[i];

                // console.log("color:", w, k);
                if(k > 0) {
                    // JA green
                    if(d[b].e2.includes(w) && eja) html += `<span class="gword">` + w + `</span><span> </span>` + `<span>`+ v[i].substring(k)
                    else html += `<span class="bword">` + w + `</span><span> </span>` + `<span>`+ v[i].substring(k)
                }
                else if(d[b].e2.includes(w) && eja) html += `<span class="gword">`+ v[i]
                else html += `<span class="bword">`+ v[i]
                html += `</span><div></div>`
            }
        }
        return html
    }
    // entities
    if(!type) {
        if(!(v.length)) html += `<span class="add" li="${b}" ty="6" style='text-align:center;'>+</span>`
        else {
            for(var i = 0; i < v.length; i++) {
                k = v[i].indexOf('=')
                if(k > -1) w = v[i].substring(0, k);
                else w = v[i];
                // console.log("color:", w, k);
                
                // if(data[b].e2.includes(w) && eja) html += `<span style='color:darkcyan'>(JA)</span>`;
                // if(data[b].e2.includes(w) && eja) html += `<sup style='color:darkcyan'>JA </sup>`;

                if(k > 0) {
                    // JA green
                    if(d[b].e2.includes(w) && eja) 
                        html += `<span class="word" style='color:green' ty="${a}" li="${b}" e="${w}">` 
                            + w + `</span><span> </span>`
                        + `<span class="word" ty="2" li="${b}" e="${v[i].substring(0, k)}">`+ v[i].substring(k)
                    else html += `<span class="word" style='color:blue' ty="${a}" li="${b}" e="${w}">` 
                        + w + `</span><span> </span>`
                        + `<span class="word" ty="2" li="${b}" e="${v[i].substring(0, k)}">`+ v[i].substring(k)

                }
                else if(d[b].e2.includes(w) && eja) 
                    html += `<span class="word" style='color:green' ty="${a}" li="${b}" e="${v[i]}">`+ v[i]
                
                else html += `<span class="word" style='color:blue' ty="${a}" li="${b}" e="${v[i]}">`+ v[i]
                html += `</span><br>`
                // if(i < v.length-1) html += `\n`
            }
            html += `<span class="add" li="${b}" ty="6">+</span>`
        }
    }
    else if(type == 1) {
        if(v.length) {
            // // console.log(v)
            // k = v[i].indexOf('JA')
            // j = v[i].indexOf('RT')
            // if(v)
            html += v;
            html = html.replace('JA', `<span style='color:green' ty="${a}" li="${b}">JA</span>`);
            html = html.replace('IN', `<span style='color:blue' ty="${a}" li="${b}">IN</span>`);
            html = html.replace('RT', `<span style='color:red' ty="${a}" li="${b}">RT</span>`);

            // html = html.replace('RT', `<span style='color:red'>RT</span>`);
            // console.log(html)
        }
        // return html
    }

    else {
        if(v.length) {
            html += v;
            html = html.replace('>JA', ` style='color:green'>JA`);
            html = html.replace('>IN', ` style='color:blue'>IN`);
            html = html.replace('>RT', ` style='color:red' >RT`);
        }
    }
    return html

}


function audio_clips(i) {
    // <span style='color:darkred'; ph='1'>Dialog</span> 
    // console.log('in clips', i);
    if(!i) txt = `<span class="clips" c="${i}">Intro</span>`;
    else txt = `<span class="clips" c="${i}">Clip #${i}</span>`;   
    return `<tr><td colspan="1" id="ctext">` + txt + `</td><td colspan="20" style='border-top:8px solid lightgrey;'>
            <audio id="player" preload="none" controls src=` + `"/static/mp3/` + did + `_` + i + `.mp3"` + `>
            Your browser does not support the <code>audio</code> element.</audio></td></tr>`
}

function refine(line) {
    return line .replace("’s", "")
                .replace("’ve", "")
                .replace("’m", "")
                .replace("’re", "")
                .replace("’ll", "")
                .replace("n’t", "")
                .replace(/[^\w\s\']|_/g, "")
                .replace(/\s+/g, " ")
    // return line.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ")
}

function parent(index, d = data) {
    // d = data
    // if(sec) d = d2
    // if(saveFile2) {
    //     d = obj
    //     console.log('obj load, current', d[index])
    // }
    // if(d) console.log('obj load, current', d[index])
    if(d[index].st.length) return index
    for(var i = index; i > 0; i--) {
        if(!d[i].ty[0]) return i 
    }
    return 0
}

function stnm(w, line, i) {
    if(d2f) d = d2
    else d = data
    if(d[i].er.includes(refine(w))) 
        return `<span class="word" style='color:blue' line="${line}" li="${i}" ty="1">${w}</span>`
    return `<span class="word" line="${line}" li="${i}" ty="3">${w}</span>`
}

function checkr(k) {
    d = data
    if(d2f) d = d2
    
    if(k == 0) return 0;
    for (var i = 0; i < d.length; i++) {
        // console.log("checkr: ", k, i, d[i].ty[3]);
        // console.log("checkr2: ", d[i]);
        if(d[i].ty[3] == k) return i
        if(d[i].ty[3] > k) return -1
    }
    return -1;
}

function cccorr(v, t) {
    if(t < 2) type = bel;
    else type = cg;
    if(!(v%type.length)) return 1;
    else return 0;
}

function trim(text, mode) {
    if(mode == 1) {
        text = text.substring(0, text.length - 1);
        text += '\t';
        return text;
    }
    else if(mode == 2) {
        text = text.substring(0, text.length - 1);
        text += '\n';
        return text;
    }
    else console.log("trim 0");
}

function red(i, j, r=0, sec=0) {
    // r = rule
    
    // dc2 = data[i].cc2
    d = data[i]
    if(sec) d = d2[i]
    // console.log(i, j);

    // 0: CT- & RT
    if(!r) {
        if((bel[d.cc2[j-2][0][0]%bel.length] == 'CT-' && cg[d.cc2[j][0][0]%cg.length] != 'RT') &&
            (d.cc2[j][0][1] == d.cc2[j-2][0][1])) {
                // console.log(i, '0: CT- & RT');
                return 1;
            }
    }

    // 1: cclinks & empty cc
    if(r == 1) {
        // disable at nov 14
        return 0;
        // if(j>1) console.log(i, j, data[i].eve[j].length, dc2[j][0][0]%cg.length)
        if(d.eve[j].length && j < 2 && !(d.cc2[j][0][0]%bel.length)) return 1;
        if(d.eve[j].length && j > 1 && !(d.cc2[j][0][0]%cg.length)) return 1;
    }
    return 0;
}

function reload(v, load=1) {
    di += v
    // did = updata[di].slice(0, 1)
    // console.log(di, v)
    did = pack[di][0]
    dialog = updata[di].slice(1)

    prev = 0;
    next = 0;
    clips = 0;
    if(0 < di && di < (updata.length-1)) {
        prev = updata[di-1].slice(0, 1)
        next = updata[di+1].slice(0, 1)
    }
    else if(!di && updata.length >1) next = updata[di+1].slice(0, 1)
    else prev = updata[di-1].slice(0, 1)
    // console.log(prev, di, next)
    // console.log(dialog)
    // appp = 0;
    phase = 2;
    dialog = pack[di][1]
    data = pack[di][2]
    console.log("reloaded to ", did)
    if(load) {
        header(); process_table();
    }
    
}

function stn(line, i, st, page=0) {
    // console.log(data[i].ty)
    // return `<td style='padding:4px;' class="text">` 
    //     + line.split(" ").map(word => 
    //         `<span class="word" line="${line}" li="${i}">${word}</span>`).join(" ") + `</td>`

    // comparison page
    if(page == 1) 
        return `<tr style='background-color:lightgrey;'><td colspan="100%" style='color:grey;'>
            <sup style='color:darkcyan; margin-left: 15px;'>` + st + ` </sup>` 
            + line.split(" ").map(word => stnm(word, line, i)).join(" ") + `</td></tr><tr>`
    
    if(!phase) w = 45
    else if(phase == 1) w = 30
    else w = 15

    if(!data[i].ty[0]) 
        return `<td rowspan="` + data[i].ty[1] + `" style='padding:4px; width:` + w + `%' class="text">` 
            + `<sup style='color:darkcyan'>` + (st+1) + ` </sup>` 
            + line.split(" ").map(word => stnm(word, line, i)).join(" ") + `</td>`
        
    else return ``

}

// table annotations
function not(type, i, page=0, sec=0) {
    // console.log(i, numRow)

    var line = data[i].st
    var d = data[i]
    var dc2 = data[i].cc2
    var redp = 0
    var dparent = data[parent(i)]

    if(sec) { // section 2
        line = d2[i].st
        d = d2[i]
        dc2 = d2[i].cc2
        redp = 1
        // e = e2
        dparent = d2[parent(i)]
        numRow = `<span class="num" li="${i}">` + e + ` </span>`
    }


    // comparison page (only file_1 rn, file_2 goto !page for editing support)
    if(page == 1) {
        if(type == 0) { // event
            if(d.ty[4]%qs.length) q = `<span class="q2">[` + qs[d.ty[4]%qs.length] + `] </span>`
            // else q = `<span style='font-size: 90%; color:lightgrey' class="q" li="${i}">[` + qs[d.ty[4]%qs.length] + `] </span>`
            else q = ` `

            html = ``;
            if(d.ev.length) html += `<td><span class='num'>` + e + ` </span>` + q + `<span>` + d.ev[0] +`</span>`;
            else html += `<td>`
    
            // cc links (cgm)
            firstBr = 0
            for(var j = 0; j < 4; j++) { // cc slot
                if(d.eve[j].length) {

                    // slot name
                    // html += `<div style="height:5px;"></div><span class="clinks">` + hd2[j+5] + `</span>`
                    if(!firstBr){
                        html += `<br><span class="clinks">` + hd2[j+5] + `</span>`
                        firstBr = 1
                    } 
                    else html += `<div style="height:15px;"></div><span class="clinks">` + hd2[j+5] + `</span>`

                    rs = ``

                    // current cc
                    for(var k = 0; k < dc2[j].length; k++) {
                        ci = dc2[j][k][0]
                        if(!dc2[j][k][1]) { // find self value in dc2[slot]
                            if(j < 2) rs += bel[ci%bel.length];
                            else rs += cg[ci%cg.length];
                            break;
                        }
                    }
                    html += `<span class="clinks">` + rs + `</span>`
                    
                    // referencing cc
                    for(var k = 0; k < d.eve[j].length; k++) {
                        // ci = d.eve[j][k][1]
                        // rs = d.eve[j][k][0] + `:`;
                        // if(j < 2) rs += bel[ci%bel.length];
                        // else rs += `<sup class="clinkssub">` + cg[ci%cg.length] + `</sup>`;
                        // // rs += `(` + d.eve[j][k][0] + `)`
                        // html += `<p class="clinks">` + rs + `</p>`

                        ci = d.eve[j][k][1]         // change to value
                        rs = d.eve[j][k][0] + `:`;  // from eve #
                        if(j < 2) rs += bel[ci%bel.length];
                        else rs += cg[ci%cg.length];
                        // rs += `(` + d.eve[j][k][0] + `)`
                        html += `<span class="clinks">` + rs + `</span>`

                    }
                    // html += `<br>`

                }
            } 
            return html + `</td>`;
        }

        if(type == 1) {
            if(!d.pr.length) return `<td></td>`
            else return `<td>` + d.pr[0] + `</td>`
        }

        if(type == 6) {
            html = ``;
            // believe
            for(var j in '12') {
                html += `<td style='text-align: center; `;
                if(red(i, j, 1, redp)) html += ` background-color:lightpink; `;
    
                // null left
                // console.log('>>>>>', sec, i, j, dc2)
                if(!dc2[j].length) {
                    if(j > 0) html += `border-right:5px solid lightgrey;'>`;
                    else html += `border-left:5px solid lightgrey;'>`;
                }

                else if((!(dc2[j][0][0]%bel.length) && j == 0)) html += `border-left:5px solid lightgrey;'>`;
                    
                // right
                else if(!(dc2[j][0][0]%bel.length)) html += `border-right:5px solid lightgrey;'>`;
                
                // j:cc slot, k:item index
                else {
                    // console.log("in ccs j", j);
                    for(var k = 0; k < dc2[j].length; k++) {
                        // bel
                        if(!k && j == 0) html += `text-align:center; border-left:5px solid lightgrey;'>
                            <span>` + bel[dc2[j][k][0]%bel.length] + `</span>`;
                        else if(!k) html += `text-align:center; border-right:5px solid lightgrey;'>
                            <span>` + bel[dc2[j][k][0]%bel.length] + `</span>`;
                        else html += `<span>` + bel[dc2[j][k][0]%bel.length] + `</span>`;
    
                        // != current event number and != 0 (shows referencing #)
                        if(dc2[j][k][1] != data[i].ty[3] && dc2[j][k][1]) 
                            html += `<sup style='color:grey'>` + dc2[j][k][1] + ` </sup>`

                        if(k+1 < dc2[j].length) html += `<div style="height:2px;"></div>`
                    }
                    // console.log("out");
                }
                html += `</td>`
            }

            for(var j in '34') {
                raw = ``
                j = parseInt(j) + 2;
    
                // null
                if((!dc2[j].length) || !(dc2[j][0][0]%cg.length)) {
                    if(red(i, j, 1, redp)) {
                        raw += `<td style='background-color:lightpink;'>`;
                    }
                    else raw += `<td>`;
                }
    
                else {
                    for(var k = 0; k < dc2[j].length; k++) {
                        // cg
                        if(!k & red(i, j, 0, redp)) raw += `<td style='text-align:center; background-color:lightpink;'>
                            <span>` + cg[dc2[j][k][0]%cg.length] + `</span>`;
                        else if(!k) raw += `<td style='text-align:center;'>
                            <span>` + cg[dc2[j][k][0]%cg.length] + `</span>`;
                        else raw += `<span>` + cg[dc2[j][k][0]%cg.length] + `</span>`;
    
                        // != current event number and != 0 (shows referencing #)
                        if(dc2[j][k][1] != d.ty[3] && dc2[j][k][1])
                            raw += `<sup style='color:grey'>` + dc2[j][k][1] + ` </sup>`
                        if(k+1 < dc2[j].length) raw += `<div style="height:2px;"></div>`
                    }
                }
                html += color(2, raw, j, i) + `</td>`;
            }

            whyIndex = d.cc[4]%why.length
    
            if(sec) html += `<td style='text-align:center;'`
            else html += `<td style='text-align:center; border-right:5px solid grey;'`
    
            if(whyIndex) {
                html += `><span>` + why[whyIndex] + `</span>`;    //why
                if(d.wip.length) html += `<span style='color:grey; font-size: 75%;'> ` + d.wip[0] + `</span>`
            }
            return html + `</td>`
        }
    }


    // 0 page annotioan
    if(!phase) w = 45
    else if(phase == 1) w = 35
    else w = 28
    if(d1f) w = 0

    // event
    if(type == 0) {
        if(d.ty[4]%qs.length) q = `<span class="q" li="${i}">[` + qs[d.ty[4]%qs.length] + `] </span>`
        else q = `<span style='font-size: 90%; color:lightgrey' class="q" li="${i}">[` + qs[d.ty[4]%qs.length] + `] </span>`

        html = ``;
        // main empty event
        if(!d.ev.length) {
            //last empty
            if (i == rows-1) {
                if(sec) html += `<td class="add"  line="${line}" li="${i}" ty="${type}">+`
                else html += `<td>` + numRow + `<span style='float: right;' class="add" line="${line}" li="${i}" ty="${type}">+</span>`
            }

            else {
                html += `<td style='`
    
                // extra event empty
                // if(d.ty[0]) html += ` background-color:lightpink; `;
        
                // eve
                if(cgm && (d.eve[0].length || d.eve[1].length || d.eve[2].length || d.eve[3].length)) 
                    html += ` text-align: center;'><span class="add" line="${line}" li="${i}" ty="${type}" >+</span>`
    
                else if(d.ty[2]%2 & d.ty[0]) html += `'>`
    
                // not
                else html += `' class="add" line="${line}" li="${i}" ty="${type}">+`
            }

        }
        
        // last row
        else if((dparent.ty[1] -1) + parent(i) == i) {
            // console.log("last row", dparent.ty[1], parent(i), i)
            html += `<td>` + numRow + q + `<span class="edits" li="${i}" ty="${type}">` + d.ev[0] + `</span>
                <span class="add" line="${line}" li="${i}" ty="${type}" style='float: right;'>+</span>`
        }

        else html += `<td>` + numRow + q + `<span class="edits" li="${i}" ty="${type}">` + d.ev[0] +`</span>`;

        // highlighted & not main + REMOVE
        if(d.ty[2]%2 && d.ty[0]) html += `<span class="remove" style='color:red' li="${i}"> REMOVE</span>`;

        // cc links
        if(cgm) {
            firstBr = 0
            for(var j = 0; j < 4; j++) { // cc slot
                if(d.eve[j].length) {
                    // slot name
                    if(!firstBr){
                        html += `<br><span class="clinks">` + hd2[j+5] + `</span>`
                        firstBr = 1
                    } 
                    else html += `<div style="height:15px;"></div><span class="clinks">` + hd2[j+5-eja] + `</span>`

                    rs = ``

                    // current cc
                    for(var k = 0; k < dc2[j].length; k++) {
                        ci = dc2[j][k][0]
                        if(!dc2[j][k][1]) { // find self value in dc2[slot]
                            if(j < 2) rs += bel[ci%bel.length];
                            else rs += cg[ci%cg.length];
                            break;
                        }
                    }
                    html += `<span class="clinks">` + rs + `</span>`
                    
                    // referencing cc
                    for(var k = 0; k < d.eve[j].length; k++) {
                        ci = d.eve[j][k][1]         // change to value
                        rs = d.eve[j][k][0] + `:`;  // from eve #
                        if(j < 2) rs += bel[ci%bel.length];
                        else rs += cg[ci%cg.length];
                        html += `<span class="clinks">` + rs + `</span>`

                    }
                    // html += `<br>`

                }
            } 
            // for(var j = 0; j < 4; j++) { // cc slot
            //     if(d.eve[j].length) {
            //         // console.log("not1_eve: ", i, j, d.eve[j])
            //         // slot name
            //         if(sec) html += `<br><span class="clinks">` + hd2[j+5] + `</span>`
            //         else html += `<br><span class="clinks">` + hd2[j+5-eja] + `</span>`
            //         rs = ``

            //         // current cc
            //         for(var k = 0; k < dc2[j].length; k++) {
            //             ci = dc2[j][k][0]
            //             if(!dc2[j][k][1]) { // find self value in dc2[slot]
            //                 if(j < 2) rs += bel[ci%bel.length];
            //                 else rs += cg[ci%cg.length];
            //                 break;
            //             }
            //         }
            //         html += `<span class="clinks">` + rs + `</span>`
                    
            //         // referencing cc
            //         // rs = ``
            //         for(var k = 0; k < d.eve[j].length; k++) {
            //             ci = d.eve[j][k][1]
            //             rs = d.eve[j][k][0] + `:`;
            //             if(j < 2) rs += bel[ci%bel.length];
            //             else rs += cg[ci%cg.length];
            //             // rs += `(` + d.eve[j][k][0] + `)`
            //             html += `<span class="clinks">` + rs + `</span>`
            //         }

            //     }
            // }
        } 
        return html + `</td>`;
    }

    if(type == 1) {
        pw = 16
        if(!d.pr.length) {
            return `<td class="add" line="${line}" li="${i}" ty="${type}">+</td>`
        }
        else {
            if(sec) return `<td class="edits" li="${i}" ty="${type}">` + d.pr[0] + `</td>`
            return `<td style='width:` + pw + `%' class="edits" li="${i}" ty="${type}">` + d.pr[0] + `</td>`
        }
    }

    if(type == 2) {
        wipw = 10
        if(!data[i].wip.length) {
            if(hcom) return `<td style='width:` + wipw + `%' class="add" line="${line}" li="${i}" ty="${type}">+</td>`
            return `<td style='border-right:5px solid lightgrey;' class="add" line="${line}" li="${i}" ty="${type}">+</td>`
        }
        else {
            if(hcom) return `<td style='width:` + wipw + `%' class="edits" li="${i}" ty="${type}">` + data[i].wip[0] + `</td>`
            return `<td style='border-right:5px solid lightgrey;' class="edits" li="${i}" ty="${type}">` + 
                data[i].wip[0] + `</td>`
        }
    }

    if(type == 3) {
        if(!data[i].com.length) {
            return `<td class="add" line="${line}" li="${i}" ty="${type}">+</td>`
        }
        else {
            return `<td class="edits" li="${i}" ty="${type}">` + data[i].com[0] + `</td>`
        }
    }

    // JA
    if(type == 4) {
        // console.log("in not4");
        if(!data[i].ty[0]) {
            html = `<td rowspan="` + data[i].ty[1] + `" style='text-align:center; color:green'>`;
            v = data[i].e2;
            for(var e2i = 0; e2i < v.length; e2i++) {
                html += `<span>` + v[e2i] + `</span><br>`
            }
            html += `</td>`;
            return html;
        }
        else return ``;

        // if(!data[i].e2.length) {
        //     return `<td class="add" line="${line}" li="${i}" ty="${type}">+</td>`
        // }
        // else {
        //     html = `<td>`;
        //     v = data[i].e2;
        //     for(var e2i = 0; e2i < v.length; e2i++) {
        //         html += `<span style='text-align:center; color:green' li="${i}" ty="${type}">`
        //             + v[e2i]
        //     }
        //     return `<td class="edits" style='text-align:center; color:green' li="${i}" ty="${type}">` +
        //         data[i].e2[0] + `</td>`
        // }
    }
    
    if(type == 5) {
        html = ``;
        // console.log("notation type 5")

        // believe
        for(var j in '12') {
            // first null
            if(!bel[data[i].cc[j]%bel.length].length) html += `<td class="cc" ty="${j}" li="${i}"><span>`;
                    
            // first present
            else {
                // avoid same value
                if(data[i].cc[j]%bel.length == data[i].ccc[j]%belc.length) data[i].ccc[j] += 1;

                // 2nd null
                if(!(data[i].ccc[j]%belc.length)) {
                    html += `<td style='text-align:center;'><span class="cc" ty="${j}" li="${i}" >` +
                        bel[data[i].cc[j]%bel.length] + `</span>`
                    if(edr > i) html += 
                        `<span class="ccc0" ty="${j}" li="${i}" > ` + belc[0] + `</span>`;
                    // console.log("CCC0")
                }

                // 2nd present
                else {
                    html += `<td style='text-align:center;'><span class="cc" ty="${j}" li="${i}" >` +
                        bel[data[i].cc[j]%bel.length] + `</span><span class="ccc" ty="${j}" li="${i}" > ` +
                        belc[data[i].ccc[j]%belc.length] + `</span>`;  
                }
            }
        }

        // CG
        for(var j in '34') {
            raw = ``
            j = parseInt(j) + 2;
            // console.log(j)
            // first null
            if(!cg[data[i].cc[j]%cg.length].length) raw += `<td class="cc" ty="${j}" li="${i}"><span>`;
                    
            // first present
            else {
                // avoid same value
                if(data[i].cc[j]%cg.length == data[i].ccc[j]%cgc.length) data[i].ccc[j] += 1;

                // 2nd null
                if(!(data[i].ccc[j]%cgc.length)) {
                    raw += `<td style='text-align:center;'><span class="cc" ty="${j}" li="${i}" >` +
                        cg[data[i].cc[j]%cg.length] + `</span>`
                    if(edr > i) raw += `<span class="ccc0" ty="${j}" li="${i}" > ` + cgc[0] + `</span>`;
                    // console.log("CCC0")
                }

                // 2nd present
                else {
                    raw += `<td style='text-align:center;'><span class="cc" ty="${j}" li="${i}" >` +
                        cg[data[i].cc[j]%cg.length] + `</span><span class="ccc" ty="${j}" li="${i}" > ` +
                        cgc[data[i].ccc[j]%cgc.length] + `</span>`;  
                }

            }

            html += color(1, raw, j, i);
        }

        // html += `</td><td class="cc" ty="4" li="${i}">` + why[data[i].cc[4]%why.length];    //why
        // html += not(2, i);                          //wip
        // return html

        wipw = 8
        whyIndex = data[i].cc[4]%why.length
        // html += `<td style='width:` + ww + `%' class="cc" ty="4" li="${i}">` + why[data[i].cc[4]%why.length];    //why
        // html += not(2, i);                          //wip

        if(whyIndex) html += `<td `
        else  html += `<td class="cc" ty="4" li="${i}" `

        if(hcom) html += `style='width:` + wipw + `%; text-align:center;'`
        else html += `style='width:` + wipw + `%; text-align:center; border-right:5px solid lightgrey;'`

        if(whyIndex) {
            html += `><span class="cc" ty="4" li="${i}">` + why[whyIndex] + `</span>`;    //why
            if(!data[i].wip.length) html += `<span class="add" line="${line}" li="${i}" ty="2"> +</span`
            else html += `<span style='color:grey' class="edits" line="${line}" li="${i}" ty="2">` + data[i].wip[0] + `</span`
        }

        return html + `></td>`

    }

    // cgm ccs
    if(type == 6) {
        html = ``;

        // believe
        for(var j in '12') {
            html += `<td style='`;
            if(red(i, j, 1)) html += ` background-color:lightpink; `;

            // null left
            if(!(dc2[j][0][0]%bel.length) && j == 0) 
                html += `border-left:5px solid lightgrey;' class="cc" ty="${j}" li="${i}" cgi="0">`;
            
            // right
            else if(!(dc2[j][0][0]%bel.length))
                html += `border-right:5px solid lightgrey;' class="cc" ty="${j}" li="${i}" cgi="0">`;

            // j:cc slot, k:item index
            else {
                // console.log("in ccs j", j);
                for(var k = 0; k < dc2[j].length; k++) {
                    // bel
                    if(!k && j == 0) html += `text-align:center; border-left:5px solid lightgrey;'>
                        <span class="cc" ty="${j}" li="${i}" cgi="${k}">` + bel[dc2[j][k][0]%bel.length] + `</span>`;
                    else if(!k) html += `text-align:center; border-right:5px solid lightgrey;'>
                        <span class="cc" ty="${j}" li="${i}" cgi="${k}">` + bel[dc2[j][k][0]%bel.length] + `</span>`;
                    else html += `<span class="cc" ty="${j}" li="${i}" cgi="${k}">` +
                        bel[dc2[j][k][0]%bel.length] + `</span>`;

                    // != current event number and != 0 (shows referencing #)
                    if(dc2[j][k][1] != data[i].ty[3] && dc2[j][k][1]) {
                        html += `<span style='font-size: 90%;' class="edits" ty="5" ct="${j}" li="${i}" cgi="${k}"> ` 
                            + dc2[j][k][1] + `</span>`
                    }

                    // hightlingt then shows referencing number(ty3)
                    else if(d.ty[2]%2 || !hrefer) 
                        html += `<span class="edits" ty="5" ct ="${j}" li="${i}" cgi="${k}" 
                            style='font-size: 90%; color:lightgrey'> ` + d.ty[3] + `</span>`
                    
                    if(d.ty[2]%2) {
                        if(k) html += `<span class="add" ty="8" ct ="${j}" li="${i}" cgi="${k}"> -</span>`
                        else html += `<span class="add" ty="7" ct ="${j}" li="${i}"> +</span>`
                    }

                    html += `<br>`
                }
                html += `</td>`
                // console.log("out");
            }
        }

        // CG
        for(var j in '34') {
            raw = ``
            j = parseInt(j) + 2;

            // null
            if(!(dc2[j][0][0]%cg.length)) {
                if(red(i, j, 1)) {
                    // console.log("red", i, j);
                    raw += `<td style='background-color:lightpink;' class="cc" ty="${j}" li="${i}" cgi="0">`;
                }
                else raw += `<td class="cc" ty="${j}" li="${i}" cgi="0">`;
            }
            // if(!(dc2[j][0][0]%cg.length) && j == 3) 
            //     raw += `<td style='border-right:5px solid black;' class="cc" ty="${j}" li="${i}" cgi="0">`;
            
            // else if(!(dc2[j][0][0]%cg.length)) raw += `<td class="cc" ty="${j}" li="${i}" cgi="0">`;

            else {
                for(var k = 0; k < dc2[j].length; k++) {
                    // cg
                    if(!k & red(i, j)) raw += `<td style='text-align:center; background-color:lightpink;'>
                        <span class="cc" ty="${j}" li="${i}" cgi="${k}">` + cg[dc2[j][k][0]%cg.length] + `</span>`;
                    else if(!k) raw += `<td style='text-align:center;'>
                        <span class="cc" ty="${j}" li="${i}" cgi="${k}">` + cg[dc2[j][k][0]%cg.length] + `</span>`;
                    // if(!k && j == 3) raw += `<td style='text-align:center; border-right:5px solid black;'>
                    //     <span class="cc" ty="${j}" li="${i}" cgi="${k}">` + cg[dc2[j][k][0]%cg.length] + `</span>`;
                    // else if(!k) raw += `<td style='text-align:center;'>
                        // <span class="cc" ty="${j}" li="${i}" cgi="${k}">` + cg[dc2[j][k][0]%cg.length] + `</span>`;
                    else raw += `<span class="cc" ty="${j}" li="${i}" cgi="${k}">` + cg[dc2[j][k][0]%cg.length] + `</span>`;

                    // != current event number and != 0 (shows referencing #)
                    if(dc2[j][k][1] != data[i].ty[3] && dc2[j][k][1]) {
                        raw += `<span style='font-size: 90%;' class="edits" ty="5" ct="${j}" li="${i}" cgi="${k}"> ` 
                            + dc2[j][k][1] + `</span>`
                    }
                    // hightlingt then shows referencing number(ty3)
                    else if(d.ty[2]%2 || !hrefer)
                        raw += `<span class="edits" ty="5" ct ="${j}" li="${i}" cgi="${k}" 
                            style='font-size: 90%; color:lightgrey'> ` + d.ty[3] + `</span>`
                    
                    if(d.ty[2]%2) {
                        if(k) raw += `<span class="add" ty="8" ct ="${j}" li="${i}" cgi="${k}"> -</span>`
                        else raw += `<span class="add" ty="7" ct ="${j}" li="${i}"> +</span>`
                    }
                    raw += `<br>`
                }
                // raw += `</td>`
            }

            // coloring cc
            html += color(2, raw, j, i) + `</td>`;
            // html += raw;
        }
        
        wipw = 8
        whyIndex = d.cc[4]%why.length
        // html += `<td style='width:` + ww + `%' class="cc" ty="4" li="${i}">` + why[d.cc[4]%why.length];    //why
        // html += not(2, i);                          //wip

        if(whyIndex) html += `<td `
        else  html += `<td class="cc" ty="4" li="${i}" `

        if(sec) html += `text-align:center;'`
        else {
            if(hcom) html += `style='width:` + wipw + `%; text-align:center;'`
            else html += `style='width:` + wipw + `%; text-align:center; border-right:5px solid lightgrey;'`
        }

        if(whyIndex) {
            html += `><span class="cc" ty="4" li="${i}">` + why[whyIndex] + `</span>`;    //why
            if(!d.wip.length) html += `<span class="add" line="${line}" li="${i}" ty="2"> +</span`
            else html += `<span style='color:grey' class="edits" line="${line}" li="${i}" ty="2"> ` + d.wip[0] + `</span`
        }
        return html + `></td>`
    }
}

function numCorr(i, rows, d = data) {
    // console.log(d[i])
    // console.log(d[i].ty, parseFloat(d[i].ty[3]))
    
    
    // console.log(JSON.stringify(d[i].ty[3]))

    // d = data
    // if(d2f) d = d2
    // if(saveFile2) {
    //     // console.log('saving file2........')
    //     d = obj
    // }
    if(d[i].ty[0]) subnum += 1;
    else subnum = 1;

    // if(d1f) {
    //     if(d[i].ty[0] || (i < rows-1 && d[i+1].ty[0])) e = d[i].ty[3].toString() + '.' + subnum.toString();
    //     else e = (d[i].ty[3]).toString();
    //     if(!d2f) return     // d1f unedit not going to fix
    // }

    // if(d2f) {
    //     if(d[i].ty[0]) subnum2 += 1;
    //     else subnum2 = 1;
    // }

    if(i == rows-1) {
        // html += `<td class="add" style='color:grey; font-weight: bold;' ty="5">↓</td>`;
        numRow = `<span class="add" style='color:grey; font-weight: bold;' ty="5">↓</span>`
    }
    else {
        // console.log('numCorr check_point ty[0]:ty[0](i+1)', i, d[i].ty[0], d[i+1].ty[0])
        // current or next is extra event
        if(d[i].ty[0] || d[i+1].ty[0]) {
            if(d[i].ty[0]) e = senc.toString() + '.' + subnum.toString();
            else e = (senc+1).toString() + '.' + subnum.toString();
        }
        // regular #
        else e = (senc+1).toString();

        // fix e?
        e = parseFloat(e);
        if(d1f && !d2f) return

        // console.log('numCorr check_point i:e:ty[3]', i, e, d[i].ty[3])

        // ty3 updata
        if(e != d[i].ty[3]) {
            console.log("ty[3]", d[i].ty[3], " changed to ", e);
            olde = d[i].ty[3]
            d[i].ty[3] = e;

            // change old ty3 in others' eve
            for (var j = 0; j < d[i].cc2.length; j++) {
                for (var k = 0; k < d[i].cc2[j].length; k++) {
                    ri = checkr(d[i].cc2[j][k][1]);
                    if(ri < 0) { 
                        console.log("Invalid event number", i, j, k, d[i].cc2[j][k][1]);
                        // alert('Error: Invalid event number(+ev1)');
                        break;
                        // return;
                    }

                    for (var l = 0; l < d[ri].eve[j].length; l++) {
                        // console.log("remote1 ", ri, " eve ", d[ri].eve[j][l], " e ", e);
                        if(d[ri].eve[j][l][0] == olde) {
                            d[ri].eve[j][l][0] = e;
                            console.log("after remote1 ", d[ri].eve[j][l], e);
                            // this change after previous line print, then reload table again
                            // process_table()
                            refresh = 1;
                            console.log('change old ty3 in others, refresh:', refresh)
                        }
                    }
                }
            }

            // change others reference(cc2) to new ty3
            for (var j = 0; j < d[i].eve.length; j++) {
                for (var k = 0; k < d[i].eve[j].length; k++) {
                    ri = checkr(d[i].eve[j][k][0]);

                    if(ri < 0) { 
                        // alert('Error: Invalid event number(+ev2)'); 
                        
                        console.log("ev2err in change others (cc2) to new ty3", i, j, k, d[i]); 
                        // console.log(d[i].eve)
                        // console.log(data[i].eve[j][k])
                        console.log(d[i].eve[j][k][0])
                        // console.log(data[i].ty[3])
                        // console.log(data[i-1].ty[3])
                        break;
                    }

                    for (var l = 0; l < d[ri].cc2[j].length; l++) {
                        // console.log("remote ", ri, " cc2 ", data[ri].cc2[j][l], " e ", e);
                        if(d[ri].cc2[j][l][1] == olde) {
                            d[ri].cc2[j][l][1] = e;
                            refresh = 1;
                            console.log('change others reference(cc2) to new ty3, refresh:', refresh)
                        }
                    }
                }
            }
            // refresh = 1;
            // data[i].ty[3] = e;
        }
        // html += `<td style='text-align:center; width:1%; font-weight:bold;' class="num" li="${i}">` + e + `</td>`;
        numRow = `<span class="num" li="${i}">` + e + ` </span>`
    }
}

function removeFix(i, d) {
    // remove cc2 links
    for (var j = 0; j < d[i].cc2.length; j++) {
        for (var k = 0; k < d[i].cc2[j].length; k++) {
            // console.log("remote1 line", ri, d[ri]);
            console.log("remoteFix cc:", i, 'j,k:', j, k, 'at:', d[i].cc2[j][k]);
            ri = checkr(d[i].cc2[j][k][1]);
            if(ri < 0) { alert('Error: Invalid event number(rm1)'); return;}
            for (var l = 0; l < d[ri].eve[j].length; l++) {
                if(d[ri].eve[j][l][0] == d[i].ty[3]) {
                    console.log("remote1 line", ri, d[ri]);
                    d[ri].eve[j].splice(l, 1);
                }
            }
        }
    }

    // remove eve links
    for (var j = 0; j < d[i].eve.length; j++) {
        for (var k = 0; k < d[i].eve[j].length; k++) {
            console.log("remoteFix eve:", i, 'at:', d[i].eve[j][k][0]);
            ri = checkr(d[i].eve[j][k][0]);
            if(ri < 0) { 
                console.log('rm2: j,k,eve:', j, k, d[i]);
                alert('Error: Invalid event number(rm2)'); return;}

            for (var l = 0; l < d[ri].cc2[j].length; l++) {
                // console.log("remote ", ri, " cc2 ", d[ri].cc2[j][l], " e ", e);
                if(d[ri].cc2[j][l][1] == d[i].ty[3]) {
                    d[ri].cc2[j].splice(l, 1);
                    if(!(d[ri].cc2[j].length)) d[ri].cc2[j].push([0, 0])
                }
            }
        }
    }      

}