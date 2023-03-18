function ctable() {
    did = pack[di][0]
    dialog = pack[di][1]
    data = pack[di][2]
    d2 = pack[di][3]
    cols = hdc.length
    html = `<table style='font-family:Verdana; padding:2px; columnWidth:100px'>`;
    console.log('ctable on', did, data.length, d2.length, d2f)

    // header row
    html += "<tr style='font-weight:bold; background-color:Grey'>";
        for (var i = 0; i < cols; i++) html += "<td style='text-align:center;'>" + hdc[i] + "</td>"
    html += "</tr>";

    rows = Math.min(Math.max(max, max2), data.length)
    for (var i = 0; i < rows; i++) {
        // sentence row
        if(!data[i].ty[0]) html += stn(data[i].st, i, data[i].ty[3], 1);  // stn with <tr> at the end

        // entity
        // html += `<tr><td rowspan="` + data[i].ty[1] + `">` + color(0, data[i].e1, 1, i, 1) + `</td></tr>`
        if(!data[i].ty[0]) html += `<td rowspan="` + data[i].ty[1] + `">` + color(0, data[i].e1, 1, i, 1) + `</td>`

        // #
        if(data[i].ty[0]) subnum += 1;
        else subnum = 1;
        if(data[i].ty[0] || (i < rows-1 && data[i+1].ty[0])) e = data[i].ty[3].toString() + '.' + subnum.toString();
        else e = (data[i].ty[3]).toString();

        html += not(0, i, 1)    // event
        html += not(1, i, 1)    // prag
        html += not(6, i, 1)    // Bel and CG only cgm

        if(d2f) {
            if(d2[i].ty[0]) subnum2 += 1;
            else subnum2 = 1;
            if(d2[i].ty[0] || (i < rows-1 && d2[i+1].ty[0])) e2 = d2[i].ty[3].toString() + '.' + subnum2.toString();
            else e2 = (d2[i].ty[3]).toString();

            if(!d2[i].ty[0]) html += `<td rowspan="` + d2[i].ty[1] + `">` + color(0, d2[i].e1, 1, i, 1, 1) + `</td>`
            html += not(0, i, 1, 1)
            html += not(1, i, 1, 1)
            html += not(6, i, 1, 1)
        }

        html += `</tr>`
    }

    // html += `</table><p><span id='i'></span><span id="tips" ty="5" ></span>
    // <span><label for="in" class="foot" ty='1'>LOAD</label><input type="file" id="in"/></span><span class="foot">SAVE</span></p>`;

    document.getElementById("ctable").innerHTML = html;


    // load 1st
    document.querySelector("#in").addEventListener('change', function() {
        console.log('load first file')

        var all_files = this.files;
        if(all_files.length == 0) { alert('Error : No file selected'); return;}

        // first file selected by user
        var file = all_files[0];

        // Max 2 MB allowed
        if(file.size > 2*1024*1024) { alert('Error : Exceeded size 2MB'); return;}
        var reader = new FileReader();

        // file reading finished successfully
        reader.addEventListener('load', function(e) {
            k = file.name.indexOf('_');
            // if(k < 0) { alert('Error : Wrong File Name'); return;}
            if(k < 0) { alert('Error : File Name');}
            
            load_did = file.name.substring(0, k);
            // if(d2f && load_did != did) { alert('Error : Dialog # not match'); return;}

            v = dids.indexOf(load_did) - dids.indexOf(did[0]);
            console.log("Did:", did[0], load_did, v);
            reload(v, 0);
            
            rest = file.name.substring(k+1);
            k = rest.indexOf('_');
            if(k < 0) { alert('Error : File Name #2'); return;}

            file1 = file.name;
            d1f = 1;

            nm = rest.substring(0, k);
            // nm = file.name.substring(k,)
            // console.log(did, nm);                

            text = e.target.result.split('\n');
            // console.log("read:", text);

            line = text[0].split(',');
            // console.log(line)
            if(line.length == 1) cgm = 0;
            else cgm = 1;
            if(cgm) text.splice(0, 1);
            // console.log(text)

            // Referencing loading
            // first line
            max = parseInt(line[0]);
            hrefer = parseInt(line[3]);
            if(line.length > 4) {
                console.log('load first line:', line.length);
                focusClip = parseInt(line[4]);
            }

            for(i in text) {
                line = text[i].split('\t');
                if((i == max) || (i == data.length)) break;
                replace = 1;

                var tuple = getTup()

                // console.log(i, max, data.length)
                if(data[i].st != line[0]) {
                    console.log("Dialog != ", i, data[i].st, line[0])
                    replace = 0;
                }

                // main event
                else tuple.st = data[i].st;

                data.splice(i, replace, tuple);
                // console.log(i, line);
                // if(i < 5) console.log(data[i])
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
            console.log("load 1st done", d2f);
            if(d1f && d2f) synchronization(data, d2)
            cheader()
            ctable()
        });

        // file reading failed
        reader.addEventListener('error', function() { alert('Error : Failed to read file');});

        // read as text file
        reader.readAsText(file);
    });

    // load 2nd
    document.querySelector("#inc").addEventListener('change', function() {
        console.log('in load 2nd file')
        if(!d1f) { alert('Error : Please load file #1 first'); return;}

        var all_files = this.files;
        if(all_files.length == 0) { alert('Error : No file selected'); return;}

        // first file selected by user
        var file = all_files[0];

        // Max 2 MB allowed
        if(file.size > 2*1024*1024) { alert('Error : Exceeded size 2MB'); return;}
        var reader = new FileReader();

        // file reading finished successfully
        reader.addEventListener('load', function(e) {
            k = file.name.indexOf('_');
            if(k < 0) { alert('Error : File Name');}
            
            load_did = file.name.substring(0, k);
            if(d2f && load_did != did) { alert('Error : Dialog # not match'); return;}
            
            rest = file.name.substring(k+1);
            if(rest.indexOf('_') < 0) { alert('Error : File Name #2'); return;}

            file2 = file.name;
            d2f = 1;

            text = e.target.result.split('\n');
            max2 = parseInt(text[0].split(',')[0]);
            text.splice(0, 1); // remove text[0]

            // Referencing loading
            for(i in text) {
                line = text[i].split('\t');
                if((i == max2) || (i == d2.length)) break;
                replace = 1; // replace

                var tuple = getTup()

                // console.log(i, max2, data.length)
                if(d2[i].st != line[0]) {
                    console.log("Dialog != ", i, d2[i].st, line[0])
                    replace = 0; // inseat
                }
                else tuple.st = d2[i].st;

                d2.splice(i, replace, tuple); // replace or insert in to data
                // console.log(i, line);
                // if(i < 5) console.log(d2[i])
                cp(d2[i].e1,  line[1], 1)
                cp(d2[i].e2,  line[2], 0)
                cp(d2[i].er,  line[3], 1)
                cp(d2[i].ev,  line[4], 0)
                cp(d2[i].pr,  line[5], 0)
                cp(d2[i].why, line[6], 0)
                cp(d2[i].wip, line[7], 0)
                cp(d2[i].com, line[8], 0)
                cp(d2[i].cc,  line[9], 2)
                cp(d2[i].ccc, line[10], 2)
                cp(d2[i].ty,  line[11], 2)
                cp(d2[i].cc2, line[12], 3)
                cp(d2[i].eve, line[13], 4)

                if(d2[i].ty.length == 4) d2[i].ty.push(0); // ty[4](Q) fix in load

                // console.log('load 2 :', d2[i])
            }
            console.log("load 2nd done", d2f);
            synchronization(data, d2)
            cheader()
            ctable()
        });

        // file reading failed
        reader.addEventListener('error', function() { alert('Error : Failed to read file');});

        // read as text file
        reader.readAsText(file);
    });

    document.getElementById("header").querySelectorAll(".cload").forEach(word => {
        word.addEventListener("mouseover", () => {event.target.style.color = "DarkRed";});
        word.addEventListener("mouseout", () => {event.target.style.color = "grey";});
    });

    document.getElementById("header").querySelectorAll(".links").forEach(word => {
        word.addEventListener("mouseover", () => {event.target.style.color = "DarkRed";});
        word.addEventListener("mouseout", () => {event.target.style.color = "darkcyan";});
    });

}