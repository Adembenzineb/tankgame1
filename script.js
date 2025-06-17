//Ajusting the size of the container
const container = document.getElementById("container");
const containerSize = 800;

//Creating grids
const gridnum = 17;//THE gridnum SHOULD BE iMPAIR!! 
container.setAttribute("style" ,`grid-template-columns: repeat(${gridnum}, 1fr); grid-template-rows: repeat(${gridnum}, 1fr); width : ${containerSize}px; height: ${containerSize}px;`);
const gridSize = containerSize / gridnum;
for (let i = 1; i <= gridnum**2; i++) {
    let div = document.createElement("div");
    div.setAttribute("id",`${i}`)
    div.classList.add("grid");
    container.appendChild(div);
}

const tank = "blue" ;
const remove = "white"

//Setting the initial position of the tank
const initpos = Math.round(gridnum**2 / 2); //the center grid position
const centerDiv = document.getElementById(`${initpos}`);
centerDiv.style.backgroundColor = tank ;
let newDiv = centerDiv;
let prevDiv = centerDiv;
let pos = initpos;

//Create the tank's hitbox
const tankWidth = 5;//THE tankWidth Should be always impair !!!
const tankHeight = 7;//THE tankHeight Should be always impair !!!
let cutTankH = parseInt(tankWidth/2);
let cutTankV = parseInt(tankHeight/2);
changeHitGridL(pos ,tank);
changeHitGridR(pos ,tank);
changeHitGridUp(pos,tank);
changeHitGridDown(pos,tank);

//include the left side of the hit box
function changeHitGridL(pos,color){
    let hitGridL = cutTankH;
    while (hitGridL > 0){
        let hdiv = document.getElementById(`${pos-hitGridL}`);
        hdiv.style.backgroundColor = color;
        hitGridL--;
    }
}

//include or remove the right side of the hit box
function changeHitGridR(pos,color){
    let hitGridR = cutTankH;
    while (hitGridR > 0){
        let hdiv = document.getElementById(`${pos+hitGridR}`);
        hdiv.style.backgroundColor = color;
        hitGridR--;
    }
}

//include the top side of the hit box
function changeHitGridUp(pos,color){
    let hitGridUp = cutTankV;
    while (hitGridUp > 0){
        let udiv = document.getElementById(`${pos-(gridnum*hitGridUp)}`);
        udiv.style.backgroundColor = color;
        changeHitGridL(pos-(gridnum*hitGridUp) ,color);
        changeHitGridR(pos-(gridnum*hitGridUp) ,color);
        hitGridUp--;
    }
}

//include the bottom side of the hit box
function changeHitGridDown(pos,color){
    let hitGridDown = cutTankV;
    while (hitGridDown > 0){
        let ddiv = document.getElementById(`${pos+(gridnum*hitGridDown)}`);
        ddiv.style.backgroundColor = color;
        changeHitGridL(pos+(gridnum*hitGridDown) ,color);
        changeHitGridR(pos+(gridnum*hitGridDown) ,color);
        hitGridDown--;
    }
}


//putting the last line element in a list
let lastLineFI = (gridnum**2-gridnum) + 1;
let lastLine = [];
for (let i = lastLineFI ; i <= gridnum**2;i++){
    lastLine.push(i);
}

//putting the first line element in a list
let firstLineFI = gridnum;
let firstLine = [];
for (let i = 1 ; i <= gridnum;i++){
    firstLine.push(i);
}


//Arrows Event listener
window.addEventListener("keydown" , (e) => {
    if (e.key == "ArrowRight" && (pos+cutTankH) % gridnum != 0){
        prevDiv = newDiv;
        changeHitGridL(pos,remove);
        changeHitGridR(pos ,remove);
        changeHitGridUp(pos,remove);
        changeHitGridDown(pos,remove);
        prevDiv.style.backgroundColor = "white" ;
        pos ++;
        newDiv = document.getElementById(`${pos}`);
        changeHitGridL(pos ,tank);
        changeHitGridR(pos ,tank);
        changeHitGridUp(pos,tank);
        changeHitGridDown(pos,tank);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowLeft" && (pos-cutTankH-1) % gridnum != 0){
        prevDiv = newDiv;
        changeHitGridL(pos,remove);
        changeHitGridR(pos ,remove);
        changeHitGridUp(pos,remove);
        changeHitGridDown(pos,remove);
        prevDiv.style.backgroundColor = "white" ;
        pos --;
        newDiv = document.getElementById(`${pos}`);
        changeHitGridL(pos ,tank);
        changeHitGridR(pos ,tank);
        changeHitGridUp(pos,tank);
        changeHitGridDown(pos,tank);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowUp" && firstLine.indexOf(pos-(cutTankV*gridnum)) == -1){
        prevDiv = newDiv;
        changeHitGridL(pos,remove);
        changeHitGridR(pos ,remove);
        changeHitGridUp(pos,remove);
        changeHitGridDown(pos,remove);
        prevDiv.style.backgroundColor = "white" ;
        pos -= gridnum ;
        newDiv = document.getElementById(`${pos}`);
        changeHitGridL(pos ,tank);
        changeHitGridR(pos ,tank);
        changeHitGridUp(pos,tank);
        changeHitGridDown(pos,tank);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowDown" && lastLine.indexOf(pos+(cutTankV*gridnum)) == -1){
        prevDiv = newDiv;
        changeHitGridL(pos,remove);
        changeHitGridR(pos ,remove);
        changeHitGridUp(pos,remove);
        changeHitGridDown(pos,remove);
        prevDiv.style.backgroundColor = "white" ;
        pos += gridnum ;
        newDiv = document.getElementById(`${pos}`);
        changeHitGridL(pos ,tank);
        changeHitGridR(pos ,tank);
        changeHitGridUp(pos,tank);
        changeHitGridDown(pos,tank);
        newDiv.style.backgroundColor = tank;
    }
})