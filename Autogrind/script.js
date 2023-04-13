var score = 0;
var rScore;
var disScore;
var addSc = 1;
var priceA = 10;
var lvlA = 1;
var worker = 0;
var priceB = 50;
var lvlB = 0;
var name = "user"
var t = setInterval(work, 100);

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function startGame(){
    name = document.getElementById("newName").value;
    document.getElementById("user").innerHTML=name;
    document.getElementById("login").style.height=0;
    document.getElementById("login").style.paddingTop=0;
    document.getElementById("login").style.paddingBottom=0;
    document.getElementById("music").play();
}

function addS(){
    score = score + addSc;
    update();
}

function work() {
    score = score + worker;
    update();
}

function upA() {
    if (rScore >= priceA) {
        addSc++;
        score = score - priceA;
        priceA = priceA + 10;
        lvlA++;
        update();
    }
}

function upB() {
    if (rScore >= priceB) {
        worker = worker + 0.2;
        score = score - priceB;
        priceB = priceB + 25;
        lvlB++;
        update();
    }
}

function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10,decPlaces);
    var abbrev = [ "k", "m", "b", "t" ];
    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
             number = Math.round(number*decPlaces/size)/decPlaces;
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }
             number += abbrev[i];
             break;
        }
    }
    return number;
}

function saveData() {
    var filen = name + "-" + rScore + lvlA + lvlB + ".florbyte"
    var d = new Date();
    var userd = name + "\n" + Math.floor(score) + "\n" + addSc + "\n" + priceA + "\n" + lvlA + "\n" + worker + "\n" + priceB + "\n" + lvlB + "\n" + d.getTime();
    download(filen, userd);
}

async function FileReader(file) {
  text = await file.text();
  loadSave();
}
function loadSave() {
    const textArray = text.split("\n");
    var d = new Date();
    name = textArray[0];
    addSc = Math.floor(textArray[2]);
    priceA = Math.floor(textArray[3]);
    lvlA = Math.floor(textArray[4]);
    worker = textArray[5] * 1;
    priceB = Math.floor(textArray[6]);
    lvlB = Math.floor(textArray[7]);
    score = Math.floor(textArray[1]) + (worker * ((d.getTime() - textArray[8]) / 100));
    document.getElementById("user").innerHTML=name;
    document.getElementById("login").style.height=0;
    document.getElementById("login").style.paddingTop=0;
    document.getElementById("login").style.paddingBottom=0;
    if (lvlB >= 100) {
        document.getElementById("music2").play();
    } else {
        document.getElementById("music").play();
    }
}

function update() {
    rScore = Math.floor(score);
    disScore = abbrNum(rScore, 1)
    document.getElementById("score").innerHTML=disScore;
    document.getElementById("infoA").innerHTML="+" + addSc + " Florabyte per tap - " + abbrNum(priceA, 1) + " FB";
    document.getElementById("levelA").innerHTML="Level " + lvlA;
    document.getElementById("infoB").innerHTML="+" + worker.toFixed(1) + " Florabyte per 0.1 second - " + abbrNum(priceB, 1) + " FB";
    document.getElementById("levelB").innerHTML="Level " + lvlB;
}