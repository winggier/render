function load(all_files, load_i, e) {
    console.log('loader:', load_i)

    if(all_files.length == 0) { alert('Error : No file selected'); return;}

    // first file selected by user
    var file = all_files[0];

    // Max 2 MB allowed
    if(file.size > 2*1024*1024) { alert('Error : Exceeded size 2MB'); return;}
    var reader = new FileReader();

    // file reading finished successfully
    reader.addEventListener('load', function(e) {
        console.log('12344')
        file1 = file.name;
        // if(ty == 1) file1 = file.name;
        // else {
        //     file2 = file.name;
        //     d2flap = 1;
        // }
        
        k = file.name.indexOf('_');
        // if(k < 0) { alert('Error : Wrong File Name'); return;}
        if(k < 0) { alert('Error : File Name');}
        
        load_did = file.name.substring(0, k);
        if(d2flap && load_did != did) { alert('Error : Dialog # not match'); return;}

        v = dids.indexOf(load_did) - dids.indexOf(did[0]);
        console.log("Did:", did[0], load_did, v);
        reload(v, 0);
        
        rest = file.name.substring(k+1);
        k = rest.indexOf('_');
        if(k < 0) { alert('Error : File Name #2'); return;}
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
            // console.log(i, line);
            if(i < 5) console.log(data[i])
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
        ctable()
    })
}