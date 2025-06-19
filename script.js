//Ajusting the size of the container
const container = document.getElementById("container");
const containerSize = 800;

//Creating grids
const gridnum = 51;//THE gridnum SHOULD BE iMPAIR!! 
container.setAttribute("style" ,`grid-template-columns: repeat(${gridnum}, 1fr); grid-template-rows: repeat(${gridnum}, 1fr); width : ${containerSize}px; height: ${containerSize}px;`);
const gridSize = containerSize / gridnum;
for (let i = 1; i <= gridnum**2; i++) {
    let div = document.createElement("div");
    div.setAttribute("id",`${i}`)
    div.classList.add("grid");
    container.appendChild(div);
}

const tank = "blue" ;
const remove = "white";
const bullet = "yellow";
const wall = "grey";

//Setting the initial position of the tank
const initpos = Math.round(gridnum**2 / 2); //the center grid position
const centerDiv = document.getElementById(`${initpos}`);
centerDiv.style.backgroundColor = tank ;
let newDiv = centerDiv;
let prevDiv = centerDiv;
let pos = initpos;
let lastkey = "ArrowUp";

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

//putting the right line elements in a list
let rightline = [];
for (let i = gridnum ;  i <= gridnum**2 ; i+=gridnum){
    rightline.push()
}



//Arrows Event listener
window.addEventListener("keydown" , (e) => {
    if (e.key == "ArrowRight" && pos % gridnum != 0){
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos ++;
        lastkey = "ArrowRight";
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;


    }else if (e.key == "ArrowLeft" && (pos-1) % gridnum != 0){
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos --;
        lastkey = "ArrowLeft"
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowUp" && firstLine.indexOf(pos) == -1){
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos -= gridnum ;
        lastkey = "ArrowUp";
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowDown" && lastLine.indexOf(pos) == -1){
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos += gridnum ;
        lastkey = "ArrowDown";
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == " "){
        if (lastkey == "ArrowRight"){
            setTimeout(changeAllr(pos));
        }else if (lastkey == "ArrowLeft"){
            changeAlll(pos);
        }else if(lastkey == "ArrowUp"){
            changeAllt(pos);
        }else if (lastkey == "ArrowDown"){
            changeAllb(pos);
        }
    }
})

//changing all the top line
function changeAllt(pos){
    let bulletpos = pos-gridnum;
    console.log(pos);
    let newbpos = document.getElementById(bulletpos);
    let oldbpos = newbpos;
    let ad = 50;
    let ar = 25;

    let inter = setInterval( () =>{
        oldbpos = newbpos;
        newbpos = document.getElementById(bulletpos);
        newbpos.style.backgroundColor = bullet;
        setTimeout( () =>{
            newbpos.style.backgroundColor = remove;
        },ar)
        if (firstLine.indexOf(bulletpos) == -1){
            bulletpos -= gridnum;
        }else{
            clearInterval(inter);
        }

    },ad)
}

//changing all the bottom line
function changeAllb(pos){
    let bulletpos = pos+gridnum;
    let newbpos = document.getElementById(bulletpos);
    let oldbpos = newbpos;

    let ad = 50;
    let ar = 25;

    let inter = setInterval( () =>{
        oldbpos = newbpos;
        newbpos = document.getElementById(bulletpos);
        newbpos.style.backgroundColor = bullet;
        setTimeout( () =>{
            newbpos.style.backgroundColor = remove;
        },ar)
        if (lastLine.indexOf(bulletpos) == -1){
            bulletpos += gridnum;
        }else{
            clearInterval(inter);
        }

    },ad)
    
    
}

//changing all the right line
function changeAllr(pos){
    let bulletpos = pos+1;
    let newbpos = document.getElementById(bulletpos);
    let oldbpos = newbpos;
    let ad = 50;
    let ar = 25;

    let inter = setInterval( () =>{
        oldbpos = newbpos;
        newbpos = document.getElementById(bulletpos);
        newbpos.style.backgroundColor = bullet;
        setTimeout( () =>{
            newbpos.style.backgroundColor = remove;
        },ar)
        if ((bulletpos) % gridnum != 0){
            bulletpos ++;
        }else{
            clearInterval(inter);
        }

    },ad)
}

//changing all the left line
function changeAlll(pos){
    let bulletpos = pos-1;
    let newbpos = document.getElementById(bulletpos);
    let oldbpos = newbpos;
    let ad = 50;
    let ar = 25; 

    let inter = setInterval( () =>{
        oldbpos = newbpos;
        newbpos = document.getElementById(bulletpos);
        newbpos.style.backgroundColor = bullet;
        setTimeout( () =>{
            newbpos.style.backgroundColor = remove;
        },ar)
        if ((bulletpos-1) % gridnum != 0){
            bulletpos --;
        }else{
            clearInterval(inter);
        }

    },ad)
}



 