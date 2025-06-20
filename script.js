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
    //div.classList.add("grid");
    //div.textContent = i;
    container.appendChild(div);
}

const tank = "blue" ;
const remove = "white";
const bullet = "yellow";
const wall = "grey";
const enemie = "red";
const block = "#FFF39A";
window.score = 0;
window.health = 3;


setInterval( () => {
    document.getElementById("sc").innerHTML = `score = ${score}`;
    document.getElementById("hl").innerHTML = `health = ${health}`;
    },100)



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


//Setting and positionning the walls
const walls = [];
wallsp();
//This function work only on 51 grid
function wallsp(){
    for (let a = 2000 ; a <= 2040 ; a++){
        let w = document.getElementById(a);
        w.style.backgroundColor = wall;
        walls.push(a);
    }
    for (let b = 2009 ; b >= 581 ; b-=gridnum  ){
        let w = document.getElementById(b);
        w.style.backgroundColor = wall;
        walls.push(b);
    }
    for (let c = 1550 ; c <=1575 ; c++){
        let w = document.getElementById(c);
        w.style.backgroundColor = wall;
        walls.push(c);
    }
    for(let d = 34 ; d <= 901;d += gridnum){
        let w = document.getElementById(d);
        w.style.backgroundColor = wall;
        walls.push(d);
    }
    for(let e = 901 ; e <= 912;e ++){
        let w = document.getElementById(e);
        w.style.backgroundColor = wall;
        walls.push(e);
    }
    for(let f = 493 ; f <= 504;f++){
        let w = document.getElementById(f);
        w.style.backgroundColor = wall;
        walls.push(f);
    }
    for(let g = 10 ; g <= 1030;g += gridnum){
        let w = document.getElementById(g);
        w.style.backgroundColor = wall;
        walls.push(g);
    }
    
}



//Setting enemies
let enemies = [];
enemiesp();
//This function work only on 51 grid
function enemiesp(){
    let e1 = document.getElementById("1808");
    e1.style.backgroundColor = enemie;
    enemies.push(1808);

    let e2 = document.getElementById("1308");
    e2.style.backgroundColor = enemie;
    enemies.push(1308);

    let e3 = document.getElementById("700");
    e3.style.backgroundColor = enemie;
    enemies.push(700);

    let e4 = document.getElementById("242");
    e4.style.backgroundColor = enemie;
    enemies.push(242);

    let e5 = document.getElementById("1111");
    e5.style.backgroundColor = enemie;
    enemies.push(1111);

    let e6 = document.getElementById("464");
    e6.style.backgroundColor = enemie;
    enemies.push(464);

    let e7 = document.getElementById("1545");
    e7.style.backgroundColor = enemie;
    enemies.push(1545);

    let e8 = document.getElementById("130");
    e8.style.backgroundColor = enemie;
    enemies.push(130);
}




//Arrows Event listener
window.addEventListener("keydown" , (e) => {
    if (e.key == "ArrowRight" && pos % gridnum != 0 && walls.indexOf(pos+1) == -1){

        if(enemies.indexOf(pos+1) != -1){window.health--;console.log(`health ${health}`)}
        //removing the previous div
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        
        //moving to the new position
        pos ++;
        lastkey = "ArrowRight";
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;

    }else if (e.key == "ArrowLeft" && (pos-1) % gridnum != 0 && walls.indexOf(pos-1) == -1 && enemies.indexOf(pos-1) == -1){
        //removing the previous div
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;

        //moving to the new position
        pos --;
        lastkey = "ArrowLeft"
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
    }else if (e.key == "ArrowUp" && firstLine.indexOf(pos) == -1 && walls.indexOf(pos-gridnum) == -1  && enemies.indexOf(pos-gridnum) == -1){
        //removing the previous div
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;
        pos -= gridnum ;

        //moving to the new position
        lastkey = "ArrowUp";
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;
        
    }else if (e.key == "ArrowDown" && lastLine.indexOf(pos) == -1 && walls.indexOf(pos+gridnum) == -1 && enemies.indexOf(pos+gridnum) == -1){

        //removing the previous div
        prevDiv = newDiv;
        prevDiv.style.backgroundColor = "white" ;

        //moving to the new position
        lastkey = "ArrowDown";
        pos += gridnum ;
        newDiv = document.getElementById(`${pos}`);
        newDiv.style.backgroundColor = tank;


    }else if (e.key == " " && !e.repeat){
        //bullet event listener
        if (lastkey == "ArrowRight"){
            fire(pos,1);
        }else if (lastkey == "ArrowLeft"){
            fire(pos,-1);
        }else if(lastkey == "ArrowUp"){
            fire(pos , -gridnum);
        }else if (lastkey == "ArrowDown"){
            fire(pos , gridnum);
        }
    }
})

//shooting function
function fire(pos,d){

    //initializing the bulletposition
    let bulletpos = pos+d;
    let newbpos = document.getElementById(bulletpos);
    let oldbpos = newbpos;
    let ad = 50; //attack duration
    let ar = 25; // attack remove

    let inter = setInterval( () =>{
        oldbpos = newbpos;
        newbpos = document.getElementById(bulletpos);
        newbpos.style.backgroundColor = bullet;
        setTimeout( () =>{
            newbpos.style.backgroundColor = remove;
        },ar)
        
        if ( d == -gridnum && firstLine.indexOf(bulletpos) == -1 && walls.indexOf(bulletpos-gridnum) == -1 && enemies.indexOf(bulletpos) == -1){

            bulletpos += d;

        }else if (d == gridnum && lastLine.indexOf(bulletpos) == -1 && walls.indexOf(bulletpos+gridnum) == -1 && enemies.indexOf(bulletpos) == -1){
            
            bulletpos += d;

        }else if (d == 1 && bulletpos % gridnum != 0 && walls.indexOf(bulletpos+1) == -1 && enemies.indexOf(bulletpos) == -1){
            
            bulletpos += d;

        }else if (d == -1 && (bulletpos-1) % gridnum != 0 && walls.indexOf(bulletpos-1) == -1 && enemies.indexOf(bulletpos) == -1){
            
            bulletpos += d;

        }else if( enemies.indexOf(bulletpos) != -1){

            //removing the enemie
            let enp = enemies.indexOf(bulletpos);
            let en = document.getElementById(enp);
            en.style.backgroundColor = remove;
            enemies.splice(enp , 1);

            //incrising the score
            window.score++;
            console.log(`score ${window.score}`)

            //stop the bullet
            clearInterval(inter);
        }else{
            //stop the bullets
            clearInterval(inter);

        }

    },ad)
}
