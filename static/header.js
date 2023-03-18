
function header() {
    did = pack[di][0]
    dialog = pack[di][1]
    data = pack[di][2]

    // console.log(did)

    html = `<span class='d'>#` + did + `</span><span class='tab'></span>`
    if(!phase) html +=`<span style='color:Darkred;'> Entities</span><span class='p' p='1'> Events </span>` + 
        `<span class='p' p='2'>Full</span><span class='tab'></span>@:<span class='at'>` + nm + `</span>`
    else if(phase == 1) html +=`<span class='p' p='0'> Entities</span><span style='color:Darkred;'> Events </span>` + 
        `<span class='p' p='2'>Full</span><span class='tab'></span>@:<span class='at'>` + nm + `</span>`
    else html +=`<span class='p' p='0'> Entities</span><span class='p' p='1'> Events </span>` + 
        `<span style='color:Darkred;'>Full</span><span class='tab'></span>@ <span class='at'>` + nm + `</span>`

    html += `<a class="links" href="comparison">Comparison</a>`
    if(next) html += `<span class='next'>>></span>`
    // html += `<span class='tab' style='float:right'>&nbsp;</span>`
    if(prev) html += `<span class='prev'><<</span>`

    // if(next) html += `<span class='next'>#` + next + `&nbsp;></span>`
    // html += `<span class='tab' style='float:right'>&nbsp;</span>`
    // if(prev) html += `<span class='prev'><&nbsp;#` + prev + `</span>`
    
    document.getElementById("header").innerHTML = html;

    document.getElementById("header").querySelectorAll(".d").forEach(word => {
        word.addEventListener("mouseover", () => {
            event.target.style.color = "DarkRed";
            // document.getElementById("tips").innerText = `"'${event.target.innerText}' is this`;
            document.getElementById("tips").innerText = `Enter dialog # and load`;
        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "grey";
            document.getElementById("tips").innerText = ``;
        });
        word.addEventListener("click", () => { 
            var input = prompt('Please input dialog#');
            var missed = 1
            if(input) {
                for(var i = 0; i < updata.length; i++) {
                    if(updata[i].slice(0, 1) == input) {
                        missed = 0;
                        di = i;
                        console.log("reoload", i)
                        // header()
                        // process_table()
                        reload(0);
                        break;
                    }
                }
                if(missed) alert("# not found");
            }
        });
    });

    document.getElementById("header").querySelectorAll(".p").forEach(word => {
        word.addEventListener("mouseover", () => {
            p = parseInt(event.target.getAttribute("p"));
            event.target.style.color = "DarkRed";
            if(!p) document.getElementById("tips").innerText = `Show only entities`;
            else if(p == 1) document.getElementById("tips").innerText = `Show entities, events and pragmatics`;
            else document.getElementById("tips").innerText = `Show all tags`;
        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "grey";
            document.getElementById("tips").innerText = ``;

        });
        word.addEventListener("click", () => { 
            phase = parseInt(event.target.getAttribute("p"));
            // console.log(phase)
            if(!phase) cursor = `Show only entities`;
            else if(phase == 1) cursor = `Show entities, events and pragmatics`;
            else cursor = `Show all tags`;
            header()
            process_table()
        });
    });

    document.getElementById("header").querySelectorAll(".aa").forEach(word => {
        word.addEventListener("mouseover", () => {event.target.style.color = "DarkRed";});
        word.addEventListener("mouseout", () => {event.target.style.color = "grey";});
        word.addEventListener("click", () => {
            var input = prompt('Annotator for current phase');
            if(input) console.log(input); 
            console.log("ano click", ano)
            header()
        });
    });

    document.getElementById("header").querySelectorAll(".prev").forEach(word => {
        word.addEventListener("mouseover", () => {
            event.target.style.color = "DarkRed";
            document.getElementById("tips").innerText = `Load previous (#${prev}) dialog file `;
        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "grey";
            document.getElementById("tips").innerText = ``;
        });
        word.addEventListener("click", () => {reload(-1);});
    });

    document.getElementById("header").querySelectorAll(".next").forEach(word => {
        word.addEventListener("mouseover", () => {
            event.target.style.color = "DarkRed";
            document.getElementById("tips").innerText = `Load next (#${next}) dialog file`;
        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "grey";
            document.getElementById("tips").innerText = ``;
        });
        word.addEventListener("click", () => {reload(1);});
    });

    document.getElementById("header").querySelectorAll(".at").forEach(word => {
        word.addEventListener("mouseover", () => {
            event.target.style.color = "DarkRed";
            document.getElementById("tips").innerText = `Edit annotator's name`;

        });
        word.addEventListener("mouseout", () => {
            event.target.style.color = "grey";
            document.getElementById("tips").innerText = ``;
        });
        word.addEventListener("click", () => {
            var input = prompt('Annotator for current phase', nm);
            if(input) nm = input
            header()
        });
    });
}

function cheader() {
    html = `<p class = "header"></header><span class="cload"><label for="in">` + file1 + `</label><input type="file" id="in"/></span>`
    if(d1f) html += `<span style='margin-left: 30px; margin-right: 20px; color:darkcyan'>:</span>
        <span class="cload"><label for="inc">` + file2 + `</label><input type="file" id="inc"/></span>`
    else html += `<span><input type="file" id="inc"/></span>`
    html += `<a class="links" href="/">Annotation</a>`
    document.getElementById("header").innerHTML = html;
}
