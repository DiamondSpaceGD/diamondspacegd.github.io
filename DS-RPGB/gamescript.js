//thing (better to leave this alone except you see a mistake here)
var debugmode = false;
var disInfo = false;
var displayInfo = 0;
var eDamage = [0, 0, 0];
var memDamage = [0, 0, 0];
var healVar = [0, 0, 0];
var healItem = 0;
//enemy
var zone = 0;
var eName = dungeon.enemy[0];
var eHp = dungeon.hp[0];
var eMaxHp = eHp;
var eImage = dungeon.image[0];
var eDmg = dungeon.dmg[0];
var eDes = dungeon.des[0];
//member
var memberName = ["Kade", "Ilham", "Radit"];
var memberLvl = [1, 1, 1];
var memberExp = [0, 0, 0];
var memberExpReq = [100, 100, 100];
var memberHp = [100, 100, 100];
var memberDmg = [3, 4, 3];
var memberDef = [3, 3, 4];
var memberDied = [false, false, false];
var floor = 0;
//trigger
document.getElementById("atta").addEventListener("click", attack);
document.getElementById("info").addEventListener("click", info);
document.getElementById("heal").addEventListener("click", heal);
document.getElementById("inve").addEventListener("click", inventory);
//update display
function update() {
	document.getElementById("ename").innerHTML=eName;
	document.getElementById("ehp").innerHTML=eHp;
	document.getElementById("eima").src=eImage;
	document.getElementById("edes").innerHTML=eDes;
	document.getElementById("edamage").innerHTML=eDmg;
	document.getElementById("memaname").innerHTML=memberName[0];
	document.querySelector("span.memahp").innerHTML=memberHp[0];
	document.querySelector("span.memalvl").innerHTML=memberLvl[0];
	document.getElementById("membname").innerHTML=memberName[1];
	document.querySelector("span.membhp").innerHTML=memberHp[1];
	document.querySelector("span.memblvl").innerHTML=memberLvl[1];
	document.getElementById("memcname").innerHTML=memberName[2];
	document.querySelector("span.memchp").innerHTML=memberHp[2];
	document.querySelector("span.memclvl").innerHTML=memberLvl[2];
	document.querySelector("div.info").style.opacity=displayInfo;
	document.getElementById("fl").innerHTML=floor;
	document.getElementById("healcount").innerHTML=healItem;
};
//debug mode (activate in console)
function debug() {
	debugmode = !debugmode;
	if (debugmode) {
		console.log("debug mode = on");
	} else {
		console.log("debug mode = off");
	};
};
//attack
function attack() {
	if (!disInfo) {
		memDamage[0]= Math.floor(memberDmg[0] + Math.random(-1, 1) * 5);
		memDamage[1]= Math.floor(memberDmg[1] + Math.random(-1, 1) * 5);
		memDamage[2]= Math.floor(memberDmg[2] + Math.random(-1, 1) * 5);
		damage =  memDamage[0] + memDamage[1] + memDamage[2];
		edamage[0]= Math.floor(eDmg + Math.random(1, 2) * 2);
		edamage[1]= Math.floor(eDmg + Math.random(1, 2) * 2);
		edamage[2]= Math.floor(eDmg + Math.random(1, 2) * 2);
		eHp = eHp - damage;
		memberHp[0]= memberHp[0] - Math.max(edamage[0] - memberDef[0], 0);
		memberHp[1]= memberHp[1] - Math.max(edamage[1] - memberDef[1], 0);
		memberHp[2]= memberHp[2] - Math.max(edamage[2] - memberDef[2], 0);
		if (eHp < 1) {
			ran = Math.floor(Math.random(0, 1) * dungeon.enemy.length);
			for (var loopB = 1; loopB < 4; loopB++) {
				countB = loopB - 1;
				memberExp[countB]= memberExp[countB] + (eMaxHp / 5);
				if (memberExp[countB] >= memberExpReq[countB]) {
					memberLvl[countB]= memberLvl[countB] + 1;
					memberHp[countB]= 100 + (50 * memberLvl[countB]);
					memberExpReq[countB]= memberExpReq[loopB] * memberLvl[countB];
					memberExp[countB]= 0;
				};
			};
			eName = dungeon.enemy[ran];
			eHp = dungeon.hp[ran] * Math.floor(floor / 5 + 1);
			eMaxHp = eHp;
			eDmg = dungeon.dmg[ran];
			eImage = dungeon.image[ran];
			eDes = dungeon.des[ran];
			floor++;
			healItem = healItem + Math.floor(Math.random(0, 1) * 1.5);
		}; 
		if (debugmode) {
			console.log("damage - " + damage);
		} else {
			disInfo = false;
			displayInfo = 0;
		};
	};
	update();
};
//display enemy info
function info() {
	disInfo = !disInfo;
	if (disInfo) {
		displayInfo = 1;
	} else {
		displayInfo = 0;
	};
	update();
};
//heal members
function heal() {
	if (healItem > 0) {
		for (var loopA = 1; loopA < 4; loopA++) {
			countA = loopA - 1;
			healVar[countA] = Math.floor(Math.random(1, 2) * 75);
			memberHp[countA] = memberHp[countA] + healVar[countA];
		};
		healItem--;
	};
	update();
};
//inventory (coming soon)
function inventory() {
	alert("no inventory system yet");
};
//load everything when the game starts
update();