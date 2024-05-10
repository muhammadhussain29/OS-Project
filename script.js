let Pid = document.getElementById('p-id');
let PList = document.getElementById('P-list');
let RList = document.getElementById('R-list');
let processName = document.getElementById('process-name');
let processSub = document.getElementById('process-sub');
let processDetail = document.getElementById('process-detail');
let CList = document.getElementById('C-list');
let initial = document.getElementById('default');
let addProcess = document.getElementById('add');
let counter = 3;

let processList = Array();
let ATList = Array();
let BTList = Array();

let RprocessList = Array();
let RATList = Array();
let RBTList = Array();

let CTList = Array();
let TATList = Array();
let WTList = Array();

processList[0] = "P1";
ATList[0] = 0;
BTList[0] = 8;
processList[1] = "P2";
ATList[1] = 3;
BTList[1] = 10;
processList[2] = "P3";
ATList[2] = 4;
BTList[2] = 15;

PList.innerHTML += `<div id="P1" class="box ">
<div class="txt-1 font-weight-bold">P1</div>
<div class="txt-2">A-T: <span>0</span></div>
<div class="txt-2">B-T: <span>8</span></div>
</div>`
PList.innerHTML +=`<div id="P2" class="box ">
<div class="txt-1 font-weight-bold">P2</div>
<div class="txt-2">A-T: <span>3</span></div>
<div class="txt-2">B-T: <span>10</span></div>
</div>`
PList.innerHTML +=`<div id="P3" class="box ">
<div class="txt-1 font-weight-bold">P3</div>
<div class="txt-2">A-T: <span>4</span></div>
<div class="txt-2">B-T: <span>15</span></div>
</div>`

let addProcessFunc = () => {
    let process = "P" + (counter + 1);
    Pid.innerHTML = "P" + (counter + 2);

    let AT = document.getElementById('AT').value;
    let BT = document.getElementById('BT').value;

    AT = AT == "" ? 0 : AT;
    BT = BT == "" ? 0 : BT;

    function generateProcess() {
        return "<div id=\"" + process + "\" class=\"box \"\>\
        <div class=\"txt-1 font-weight-bold\">"+ process + "</div\>\
        <div class=\"txt-2\">A-T: <span>"+ AT + "</span>\</div>\
        <div class=\"txt-2\">B-T: <span>"+ BT + "</span></div></div>";
    }

    PList.innerHTML += generateProcess();

    processList[counter] = process;
    ATList[counter] = AT;
    BTList[counter] = BT;

    counter++;
}

addProcess.addEventListener('click', addProcessFunc);


let timer;
let timerOn = false;
let seconds = -1;
let processNo = 0;
let runningProcess = 0;
let interval = 0;
let ci =  0;
let cinterval = 0;

let startexecution = () => {

    addProcess.removeEventListener('click',addProcessFunc);

    if (!timerOn) {
        timerOn = true;
    }
    
    timer = setInterval(() => {
        for (let i = 0; i < ATList.length; i++) {
            if (ATList[i] == seconds + 1) {
                
                RprocessList[processNo] = processList[i]
                RATList[processNo] = ATList[i]
                RBTList[processNo] = BTList[i]
                processNo++;
                
                let node = document.getElementById(processList[i]);
                node.remove();
                RList.appendChild(node)
            }
        }
        
        setTimeout(() => {
            
            if (processName.innerHTML == "IDLE") {
                if( RList.innerHTML == ""){
                    processName.innerHTML = "IDLE"
                    processSub.innerHTML = "";
                    processDetail.innerHTML = `<div class="heading-1 font-weight-bold">P-ID</div>
                    <div class="txt-1">A-T: <span>00</span></div>
                    <div class="txt-1">B-T: <span>00</span></div>
                    <div class="txt-1">C-T: <span>00</span></div>
                    <div class="txt-1">TAT: <span>00</span></div>
                    <div class="txt-1">W-T: <span>00</span></div>`
                    interval = 0;
                }
                else if( RList.innerHTML != ""){
                    if(runningProcess == 0 || processName.innerHTML == "IDLE" ){
                        CTList[runningProcess] = (seconds + parseInt(RBTList[runningProcess]))
                    }
                    else{
                        CTList[runningProcess] = (parseInt(RBTList[runningProcess]) + parseInt(CTList[runningProcess-1]))
                    }
                
                TATList[runningProcess] = (CTList[runningProcess] - parseInt(RATList[runningProcess]))
                WTList[runningProcess] = (TATList[runningProcess] - parseInt(RBTList[runningProcess]))

                processName.innerHTML = RprocessList[runningProcess]
                processSub.innerHTML = "In Exection";
                processDetail.innerHTML = `<div class="heading-1 font-weight-bold">${RprocessList[runningProcess]}</div>
                <div class="txt-1">A-T: <span>${RATList[runningProcess]}</span></div>
                <div class="txt-1">B-T: <span>${RBTList[runningProcess]}</span></div>
                <div class="txt-1">C-T: <span>${CTList[runningProcess]}</span></div>
                <div class="txt-1">TAT: <span>${TATList[runningProcess]}</span></div>
                <div class="txt-1">W-T: <span>${WTList[runningProcess]}</span></div>`
                interval = RBTList[runningProcess];
                RList.firstChild.remove();
                        let completed = () => {
                            return `<div class="cp-box box">
                            <div class="txt-1 font-weight-bold">${RprocessList[runningProcess]}</div>
                            <div class="txt-2">A-T: <span>${RATList[runningProcess]}</span></div>
                            <div class="txt-2">B-T: <span>${RBTList[runningProcess]}</span></div>
                            <div class="txt-2">C-T: <span>${CTList[runningProcess]}</span></div>
                            <div class="txt-2">TAT: <span>${TATList[runningProcess]}</span></div>
                            <div class="txt-2">W-T: <span>${WTList[runningProcess]}</span></div>
                            </div>`;
                        }
                        CList.innerHTML += completed();
                runningProcess++;
                
            }
        }
        else if(processName.innerHTML != null){
            if( RList.innerHTML != "" && seconds >= CTList[CTList.length - 1]){
                if(runningProcess == 0 || processName.innerHTML == "IDLE" ){
                    CTList[runningProcess] = (seconds + parseInt(RBTList[runningProcess]))
                }
                else{
                    CTList[runningProcess] = (parseInt(RBTList[runningProcess]) + parseInt(CTList[runningProcess-1]))
                }
                
                TATList[runningProcess] = (CTList[runningProcess] - parseInt(RATList[runningProcess]))
                WTList[runningProcess] = (TATList[runningProcess] - parseInt(RBTList[runningProcess]))

                processName.innerHTML = RprocessList[runningProcess]
                processSub.innerHTML = "In Exection"
                processDetail.innerHTML = `<div class="heading-1 font-weight-bold">${RprocessList[runningProcess]}</div>
                <div class="txt-1">A-T: <span>${RATList[runningProcess]}</span></div>
                <div class="txt-1">B-T: <span>${RBTList[runningProcess]}</span></div>
                <div class="txt-1">C-T: <span>${CTList[runningProcess]}</span></div>
                <div class="txt-1">TAT: <span>${TATList[runningProcess]}</span></div>
                <div class="txt-1">W-T: <span>${WTList[runningProcess]}</span></div>`
                interval = RBTList[runningProcess];

                    let completed = () => {
                        return `<div class="cp-box box">
                        <div class="txt-1 font-weight-bold">${RprocessList[runningProcess]}</div>
                        <div class="txt-2">A-T: <span>${RATList[runningProcess]}</span></div>
                        <div class="txt-2">B-T: <span>${RBTList[runningProcess]}</span></div>
                        <div class="txt-2">C-T: <span>${CTList[runningProcess]}</span></div>
                        <div class="txt-2">TAT: <span>${TATList[runningProcess]}</span></div>
                        <div class="txt-2">W-T: <span>${WTList[runningProcess]}</span></div>
                        </div>`;
                    }
                    CList.innerHTML += completed();

                runningProcess++;
                RList.firstChild.remove();
            }
            else if( RList.innerHTML == "" && PList.innerHTML !="" && seconds >= CTList[CTList.length - 1]){
                    processName.innerHTML = "IDLE"
                    processSub.innerHTML = "";
                    processDetail.innerHTML = `<div class="heading-1 font-weight-bold">P-ID</div>
                    <div class="txt-1">A-T: <span>00</span></div>
                    <div class="txt-1">B-T: <span>00</span></div>
                    <div class="txt-1">C-T: <span>00</span></div>
                    <div class="txt-1">TAT: <span>00</span></div>
                    <div class="txt-1">W-T: <span>00</span></div>`
                    interval = 0;
            }
        }
    }, interval * 1000);

        if(processName.innerHTML != null && RList.innerHTML == ""){
            if (PList.innerHTML == "" && seconds >= CTList[CTList.length - 1]) {
                processName.innerHTML = "Completed"
                processSub.innerHTML = "";
                processDetail.innerHTML = `<div class="heading-1 font-weight-bold">P-ID</div>
                <div class="txt-1">A-T: <span>00</span></div>
                <div class="txt-1">B-T: <span>00</span></div>
                <div class="txt-1">C-T: <span>00</span></div>
                <div class="txt-1">TAT: <span>00</span></div>
                <div class="txt-1">W-T: <span>00</span></div>`
                clearInterval(timer)
                let avgTAT = 0;
                let avgWT = 0;
                TATList.forEach(element => {
                    avgTAT += element;
                });
                WTList.forEach(element => {
                    avgWT += element;
                });
                document.getElementById('avgTAT').innerHTML = (avgTAT/TATList.length)
                document.getElementById('avgWT').innerHTML = (avgWT/WTList.length)
            } else {
                
            }
        }

        seconds++
        let formattedSeconds;
        if (seconds < 10) { formattedSeconds = `00${seconds}s` }
        else if (seconds < 100) { formattedSeconds = `0${seconds}s` }
        else { formattedSeconds = `${seconds}s` }
        document.getElementById("display").innerText = `${formattedSeconds}`;

    }, 1000);


        

} 


document.getElementById("start").addEventListener("click", startexecution);

