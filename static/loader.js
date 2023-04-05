function save(saveFile2=0) {
    autoSaveCount = 0;
    var obj = data;
    var saveMax = max;

    if(saveFile2) {
        // obj = d2;
        obj = JSON.parse(JSON.stringify(d2))
        saveMax = max2

        i = 0
        while(i < saveMax) {
            // console.log('Checking', i)
            if(obj[i].ty[0] == 2) {
                console.log('Save obj fix at ', i, obj[i])
                console.log('Parent:', parent(i, obj), obj[parent(i, obj)])
                // removeFix(i, obj)
                obj[parent(i, obj)].ty[1] -= 1;
                obj.splice(i, 1)
                saveMax--;
                // break
            }
            else i++
        }

        refresh = 1
        while(refresh) {
            senc = 0
            refresh = 0
            for(var i = 0; i < max2; i++)  {
                numCorr(i, rows, obj)
                if(!obj[i].ty[0]) senc++;
            }
            console.log('SavsFile2 numCorr rounded, refresh:', refresh)
        }
        // while(i < obj.length) {
        //     // console.log('Checking', i)
        //     if(obj[i].ty[0] == 2) {
        //         // console.log('Save obj fix at ', i, obj[i])
        //         // console.log('Parent:', obj[parent(i, 1)])
        //         obj[parent(i, 1)].ty[1] -= 1;
        //         obj.splice(i, 1)
        //         // break
        //     }
        //     else i++
        // }


    }
    let today = new Date().toISOString().replace('-', '').replace('-', '').slice(2, 8)
    var filename = did + '_' + nm + '_' + today + '.cga';
    console.log('save to', filename)

    //Start of saving method
    if(cgm) {
        var textToSave = saveMax + ',' + eja + ',' + cgm + ',' + hrefer + ',' + focusClip + '\n';
        for(var i in obj) {
            if(i < saveMax) {
                for(var j in obj[i]) {
                    // console.log(j, obj[i][j]);
                    // if(j == 'st') textToSave +=
                    if(j == 'cc2' || j == 'eve') {
                        for(var k in obj[i][j]) textToSave += obj[i][j][k] + '^';
                        textToSave = trim(textToSave, 1);
                    }

                    else textToSave += obj[i][j] + '\t';
                }
            }
            textToSave = trim(textToSave, 2);
        }
    }
    
    // transition mode
    else {
        var textToSave = saveMax + '\n';
        for(var i in obj) {
            if(i < saveMax) {
                for(var j in obj[i]) textToSave += obj[i][j] + '\n';
            }
        }
    }

    // console.log(textToSave)

    //Saving string to file using html clicking trick
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    // console.log(hiddenElement.href)
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();

    // if(d2f) ctable()  // after fix, need syn again to fit the ctable
}

function cp(des, sor, spl) {
    // if(spl == 3) console.log(des)
    // if(spl == 3) console.log(sor)

    if(!sor.length) {
        return
    }
    des.length = 0;
    if(spl) {
        if(spl == 1) {  // string
            for(const element of sor.split(',')) des.push(element)
        } 
        else if(spl == 2) { // int
            // for(const element of sor.split(',')) des.push(parseInt(element))
            for(const element of sor.split(',')) des.push(Number(element))
        }
        else if(spl == 3) { // cc2
            for(const element of sor.split('^')) {
                var cc = []     // ! modifi
                var i = []      // ! modifi
                for(const item of element.split(',')) {
                    i.push(Number(item))
                    if(i.length == 2) {
                        cc.push(i);
                        i = [];
                    }
                    // console.log(item)
                    // console.log(des[i])
                    // des[i].push(parseInt(item))
                }
                des.push(cc)
            }
            
            for(const i in des) {
                if(!des[i].length) des[i].push([0, 0])
            }
            // console.log(data)
        }
        else if(spl == 4) { // eve
            for(const element of sor.split('^')) {
                cc = []
                i = []
                for(const item of element.split(',')) {
                    i.push(Number(item))
                    if(i.length == 2) {
                        cc.push(i);
                        i = [];
                    }
                }
                des.push(cc)
            }
        }
    } 
    // spl = 0
    else des.push(sor)
}

function synchronization(d1, d2) {
    i = 0;
    // while(i < (Math.max(max, max2)-1)) {
    while(i < (Math.min(d1.length, d2.length)-1)) {
        // console.log('synchronization ', i, max, max2, d1.length, d2.length)
        // if(i < 5) console.log('synchronization d:', i, d1[i], d2[i])
        // console.log('synchronization d:', i, d1[i], d2[i])
        if(d1[i].ty[0] == d2[i].ty[0] && d1[i].ty[0] == 2) console.log("synchronization empty*2", i)
        if(d1[i].ty[0] != d2[i].ty[0]) {
            if(d1[i].ty[0] == 2 && !d2[i].ty[0]) {
                d1[parent(i)].ty[1] -= 1
                d1.splice(i, 1)
            }
            else if(!d1[i].ty[0] && d2[i].ty[0] == 2) {
                d2[parent(i)].ty[1] -= 1
                d2.splice(i, 1)
            }
            else if(d1[i].ty[0] + d2[i].ty[0] == 1){ // 1:0 or 0:1
                console.log('synchronization at ', i, d1[i], d2[i])
                var tuple = getTup('', 2)
                if(d1[i].ty[0]) {
                    // console.log('d1 extar row at ', i, d1[i].st, d2[i].st)
                    d2.splice(i, 0, tuple)
                    max2 += 1
                    d2[parent(i, d2)].ty[1] += 1
                }
                else {
                    // console.log('d2 extar row at ', i, d1[i].st, d2[i].st)
                    d1.splice(i, 0, tuple)
                    max += 1
                    d1[parent(i)].ty[1] += 1
                } 
            }
            // console.log('after insert at ', i, d1[i].st, d2[i].st)
        }
        i += 1
    }
}

function getTup(dia='', ty0=0, ty1=0, ty2=0, ty3=0) {
    // freeze?
    return Object({ st:dia, e1:[], e2:[], er:[], ev:[], pr:[], why:[], wip:[], com:[], cc:[0, 0, 0, 0, 0], 
        ccc:[0, 0, 0, 0], ty:[ty0, ty1, ty2, ty3, 0], cc2:[[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]], eve:[[], [], [], []]})
}

function loader(files, alt=0, ct=0) {
    // console.log('loader load file', files[0].name)
    if(alt && !d1f) { alert('Error : Please load file #1 first'); return;}
    
    // var all_files = this.files;
    if(files.length == 0) { alert('Error : No file selected'); return;}

    // first file selected by user
    var file = files[0];

    // Max 2 MB allowed
    if(file.size > 2*1024*1024) { alert('Error : Exceeded size 2MB'); return;}
    var reader = new FileReader();

    // file reading finished successfully
    reader.addEventListener('load', function(e) {
        // ctst(file, e.target.result.split('\n'))
        k = file.name.indexOf('_');
        // if(k < 0) { alert('Error : Wrong File Name'); return;}
        if(k < 0) { alert('Error : File Name');}
        
        load_did = file.name.substring(0, k);
        if(d2f && load_did != did) { alert('Error : Dialog # not match'); return;}

        v = dids.indexOf(load_did) - dids.indexOf(did[0]);
        // console.log("Did:", did[0], load_did, v);
        if(v) reload(v, 0);
        if(alt) d = d2
        else d = data
        
        rest = file.name.substring(k+1);
        k = rest.indexOf('_');
        if(k < 0) { alert('Error : File Name #2'); return;}

        nm = rest.substring(0, k);
        // nm = file.name.substring(k,)
        // console.log(did, nm);                

        text = e.target.result.split('\n');
        // console.log("read:", text);
        if(alt) max2 = parseInt(text[0].split(',')[0]);
        else {
            line = text[0].split(',');
            max = parseInt(line[0]);
            hrefer = parseInt(line[3]);
            // console.log(line)
            if(line.length == 1) cgm = 0;
            else cgm = 1;
        }
        if(cgm) text.splice(0, 1);

        if(line.length > 4) {
            // console.log('load first line:', line.length);
            focusClip = parseInt(line[4]);
        }

        for(i in text) {
            line = text[i].split('\t');
            // if((i == max) || (i == d.length)) break;
            if(alt && ((i == max2) || (i == d.length))) break;
            if(!alt && ((i == max) || (i == d.length))) break;
            replace = 1;

            var tuple = getTup()

            // console.log(i, max, data.length)
            if(d[i].st != line[0]) {
                // console.log("Dialog != ", i, d[i].st, 'insert >>> ', line[0])
                console.log("insert >>> ", i)
                replace = 0;
            }

            // main event
            else tuple.st = d[i].st;

            d.splice(i, replace, tuple);
            // console.log(i, line);
            // if(i < 5) console.log(i, d[i])
            // if(i < 5) console.log(i, line);
            cp(d[i].e1,  line[1], 1)
            cp(d[i].e2,  line[2], 0)
            cp(d[i].er,  line[3], 1)
            cp(d[i].ev,  line[4], 0)
            cp(d[i].pr,  line[5], 0)
            cp(d[i].why, line[6], 0)
            cp(d[i].wip, line[7], 0)
            cp(d[i].com, line[8], 0)
            cp(d[i].cc,  line[9], 2)
            cp(d[i].ccc, line[10], 2)
            cp(d[i].ty,  line[11], 2)
            cp(d[i].cc2, line[12], 3)
            // if(i < 5) console.log(i, d[i])
            cp(d[i].eve, line[13], 4)
            // console.log(line);
            // console.log(d[i]);

            // ty[4](Q) fix in load
            if(d[i].ty.length == 4) d[i].ty.push(0);
        }
        // console.log(d)
        // console.log(data)
        // preFix(d)

        // console.log("loader check:", d[2])
        if(ct) { // ctable mode
            if(alt) {
                console.log("load 2nd done, d2f:", d2f);
                file2 = file.name;
                d2f = 1;
                // console.log("ck_2", d2[2])
            } 
            else {
                console.log("load 1st done, d2f:", d2f);
                file1 = file.name;
                d1f = 1;
            }
            
            // if(alt) preFix(data)
            // else preFix(d2)
            preFix(d)
            if(d1f && d2f) synchronization(data, d2)
            cheader()
            ctable()
        }
    });

    // file reading failed
    reader.addEventListener('error', function() { alert('Error : Failed to read file');});

    // read as text file
    reader.readAsText(file);
}

function preFix(d, del=1) {
    refresh = 1
    rows = d.length
    // console.log(d)
    
    if(d2f) fixMax = Math.min(Math.max(max, max2), d.length)
    else fixMax = Math.min(max, d.length)

    console.log('preFix begin d.length:max', d.length, max, '>>>>>>>>>>>')
    while(refresh) {
        refresh = 0
        senc = 0
        for(var i = 0; i < fixMax; i++)  {
            numCorr(i, rows, d)
            if(!d[i].ty[0]) senc++;
        }
        console.log('preFix numCorr, >>>> refresh:', refresh)
    }

    refresh = 1
    while(refresh) {
        refresh = 0
        for(var i = 0; i < fixMax; i++)  {
            for (var j = 0; j < d[i].cc2.length; j++) {
                for (var k = 0; k < d[i].cc2[j].length; k++) {
                    // console.log("preFix cc:", i, 'j,k:', j, k, 'at:', d[i].cc2[j][k]);
                    ri = checkr(d[i].cc2[j][k][1]);
                    if(ri < 0) {
                        console.log("preFix cc target not found:", d[i].ty[3], 'j,k:', j, k);
                        console.log(d[i])
                        if(del) {
                            // remove miss cc whicn target missed
                            d[i].cc2[j].splice(k, 1);
                            if(!(d[i].cc2[j].length)) d[i].cc2[j].push([0, 0])  // not null
                        }
                    }
                    else {
                        targetEveMiss = 1
                        for (var l = 0; l < d[ri].eve[j].length; l++) {
                            if(d[ri].eve[j][l][0] == d[i].ty[3]) {
                                targetEveMiss = 0
                                // console.log("remote1 line", ri, d[ri]);
                                // d[ri].eve[j].splice(l, 1);
                            }
                        }
                        // remove miss cc whicn target's eve missed
                        if(targetEveMiss && ri) {
                            console.log("preFix cc target's eve not found:", d[i].ty[3], 'j,k:', j, k);
                            if(del) {
                                d[i].cc2[j].splice(k, 1);
                                if(!(d[i].cc2[j].length)) d[i].cc2[j].push([0, 0])  // not null
                            }
                        }
                    }
                }
            }
        }
        console.log('preFix CC done, >>>> refresh:', refresh)
    }

    refresh = 1
    while(refresh) {
        refresh = 0
        for(var i = 0; i < fixMax; i++)  {
            for (var j = 0; j < d[i].eve.length; j++) {
                for (var k = 0; k < d[i].eve[j].length; k++) {
                    // console.log("remoteFix eve:", i, 'at:', d[i].eve[j][k][0]);
                    ri = checkr(d[i].eve[j][k][0]);
                    if(ri < 0) { 
                        console.log("preFix eve miss:", d[i].ty[3], 'j,k:', j, k);
                        // console.log(d[i])
                        if(del) {
                            // remove eve missed
                            d[i].eve[j].splice(k, 1);
                        }
                    }
                    else {
                        targetCCMiss = 1
                        // console.log(ri)
                        for (var l = 0; l < d[ri].cc2[j].length; l++) {
                            // console.log("remote ", ri, " cc2 ", d[ri].cc2[j][l], " e ", e);
                            if(d[ri].cc2[j][l][1] == d[i].ty[3]) {
                                targetCCMiss = 0
                            }
                        }
                        if(targetCCMiss && ri) {
                            console.log("preFix eve target's cc not found:", d[i].ty[3], 'j,k:', j, k);
                            if(del) {
                                // remove eve's target's cc missed
                                d[i].eve[j].splice(k, 1);
                            }
                        }
                    }
                }
            }   
        }
        console.log('preFix EVE done, >>>> refresh:', refresh)
    }

    console.log('preFix DoNE  d.length:max', d.length, max, '>>>>>>>>>>>>>')
}

function ini(sec=0) {
    refresh = 0;
    autoSaveCount++;
    // console.log('autoSaveCount', autoSaveCount);
    if(autoSaveCount == autoSave) save();
    ph = parseInt(phase)
    did = pack[di][0]
    dialog = pack[di][1]
    data = pack[di][2]
    senc = 0;  // ty[3]?
    input = ''
    if(audios.includes(did[0])) clips = 1;

    if(sec) {
        d2 = pack[di][3]
        cols = hdc.length
    }
}