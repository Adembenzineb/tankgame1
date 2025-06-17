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
    if (e.key == "ArrowRight" && (pos) % gridnum != 0){
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos ++;
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowLeft" && (pos-1) % gridnum != 0){
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos --;
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowUp" && firstLine.indexOf(pos) == -1){
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos -= gridnum ;
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowDown" && lastLine.indexOf(pos) == -1){
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos += gridnum ;
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
    }
})