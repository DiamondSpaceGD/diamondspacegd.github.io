var rep = false;
var r3dz3r = {
    image: ["fika",
        "rai",
        "red",
        "strawberry-cat",
        "sunflow",
        "sunflow-cat"],
    name: ["Fika",
        "Rai",
        "Red Flories",
        "Strawberry cat",
        "Sunflow",
        "Catflow"],
    anomaly: [0,
        0,
        0,
        0,
        0,
        0
    ],
    anoma: ["normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal"
    ]};
var aType = ["normal", "color", "duplicate", "displacement", "demetia"]
var choosen = 0;
var execute = 0;
var aCount = 0;
var repoArt = 0;
var rA = [1, 2, 3, 4, 5, 6];
var repoType = 0;
var reportCount = 0;
var sound = new Howl({
    src: ['audio/sfx.mp3'],
    sprite: {
        removed: [0, 3000],
        notFound: [4800, 3000],
        change: [9600, 1000],
        hide: [12000, 1000],
        show: [14400, 200]
    }
});
var forget = new Howl({
    src: ['audio/demetia.mp3'],
    loop: true,
    volume: 0.1
});
var forgetPlaying = false;
var forgetMaxVolume = 1;
var spawnTime = 15;
var isStart = false;

document.addEventListener("keydown", event => {
    if (isStart) {
        if (event.key == "D" || event.key == "d") {
            next();
        } else if (event.key == "A" || event.key == "a") {
            previous();
        }
    }
})

function hasDemetiaAnomaly() {
    for (var cfde = 0; cfde < r3dz3r.anomaly.length; cfde++) {
        if (r3dz3r.anomaly[cfde] === 4) {
            return true;
        }
    }
    return false;
}

function updateVolume(value) {
    forget.volume(value)
    forgetMaxVolume = 1;
    console.log("Volume: " + value);
}

function updateDiff(value) {
    spawnTime = value;
    console.log("Diff: " + value);
}


function startGame() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
    }
    var event = setInterval(roulette, 1000);
    document.getElementById("mainMenu").style.height = "0vh";
    document.getElementById("mainMenu").style.padding = "0";
    isStart = true;
}

function displayRep() {
    rep = !rep;
    if (rep) {
        document.getElementById("report").style.height = "45%";
        document.getElementById("report").style.padding = "5px";
        sound.play('show');
    } else {
        document.getElementById("report").style.height = "0px";
        document.getElementById("report").style.padding = "0px";
        sound.play('hide');
    }
}

function previous() {
    choosen--;
    if (choosen < 0) {
        choosen = 5;
    }
    update();
    sound.play('change');
}

function next() {
    choosen++;
    if (choosen > 5) {
        choosen = 0;
    }
    update();
    sound.play('change');
}

function roulette() {
    execute++;
    if (execute > (spawnTime - 1)) {
        runEvent();
        execute = 0;
    }
}

function runEvent() {
    var summon = Math.floor(Math.random(0, 1) * 6);
    var sType = Math.floor(Math.random(0, 1) * 4 + 1);
    if (r3dz3r.anomaly[summon] == 0) {
        r3dz3r.anomaly[summon] = sType;
        if (sType == 4) {
            r3dz3r.anoma[summon] = aType[4];
        } else {
            r3dz3r.anoma[summon] = aType[sType] + "-" + Math.floor(Math.random(0, 1) * 2 + 1);
        }
        aCount++;
        console.log(r3dz3r.name[summon] + "=" + r3dz3r.anoma[summon] + " - Current Anomaly : " + aCount)
    } else {
        console.log("[FAILED] - " + r3dz3r.name[summon] + "=" + r3dz3r.anoma[summon] + " - Current Anomaly : " + aCount)
    }
    update();
}

function update() {
    var source = "Image/R3DZ3R/" + r3dz3r.image[choosen] + "/" + r3dz3r.anoma[choosen] + ".png";
    document.getElementById("image").style.backgroundImage = "url(" + source + ")";
    document.getElementById("artName").innerHTML = r3dz3r.name[choosen];
    var hasDemetia = hasDemetiaAnomaly();

    // Play or stop the "forget" audio based on the presence of the "demetia" anomaly
    if (hasDemetia && !forgetPlaying) {
        forget.play();
        forgetPlaying = true;
    } else if (!hasDemetia && forgetPlaying) {
        forget.stop();
        forgetPlaying = false;
    }
    if (r3dz3r.anomaly[choosen] == 4) {
        forget.volume(forgetMaxVolume);
    } else {
        forget.volume(0.1);
    }
    if (aCount > 2) {
        document.getElementById("warning").style.opacity = 1;
    } else {
        document.getElementById("warning").style.opacity = 0;
    }
    if (r3dz3r.anomaly[choosen] > 0) {
        document.getElementById("alert").style.opacity = 1;
    } else {
        document.getElementById("alert").style.opacity = 0;
    }
    if (aCount > 4) {
        document.getElementById("lose").style.height = "100vh";
        document.getElementById("lose").style.padding = "40vh 0 40vh 0";
        document.getElementById("endResu").innerHTML = "You reported " + reportCount + " anomalies"
        clearInterval(event);
        isStart = false;
    }
}

function setRepoArt(reArt) {
    for (var i2 = 0; i2 < 6; i2++) {
        var aID2 = "a" + (i2 + 1);
        var element = document.getElementById(aID2);
        if (element) {
            element.style.backgroundColor = "#00000000";
        }
    }

    var aCH = "a" + reArt;
    var selectedElement = document.getElementById(aCH);
    if (selectedElement) {
        selectedElement.style.backgroundColor = "#FFFFFF20";
    }
    repoArt = reArt;
}

function setRepoType(reType) {
    for (var u2 = 0; u2 < 4; u2++) {
        var lID2 = "l" + (u2 + 1);
        var element = document.getElementById(lID2);
        if (element) {
            element.style.backgroundColor = "#00000000";
        }
    }

    var lCH = "l" + reType;
    var selectedElement = document.getElementById(lCH);
    if (selectedElement) {
        selectedElement.style.backgroundColor = "#FFFFFF20";
    }
    repoType = reType;
}

function report() {
    var reportButton = document.getElementById("send");
    reportButton.innerText = "Reporting...";
    reportButton.disabled = true;

    setTimeout(function() {
        document.getElementById("result").style.height = "100vh";
        document.getElementById("result").style.padding = "40vh 0 40vh 0";
        if (repoType == r3dz3r.anomaly[repoArt - 1]) {
            document.getElementById("resu").innerHTML = "REMOVED"
            r3dz3r.anomaly[repoArt - 1] = 0;
            r3dz3r.anoma[repoArt - 1] = aType[0];
            sound.play('removed');
            aCount--;
            reportCount++;
        } else {
            document.getElementById("resu").innerHTML = "NOT FOUND"
            sound.play('notFound')
        }
        reportButton.innerText = "Report!";
        reportButton.disabled = false;
        update();
    },
        5000);

    setTimeout(function() {
        document.getElementById("result").style.height = "0vh";
        document.getElementById("result").style.padding = "0";
    },
        7500);
}

document.getElementById("report").style.height = "0px";
document.getElementById("report").style.padding = "0px";