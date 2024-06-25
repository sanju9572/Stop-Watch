const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const second = document.getElementsByClassName("sec")[0];
const msecond = document.getElementsByClassName("msec")[0];
const minute = document.getElementsByClassName("minute")[0];
const laps = document.getElementsByClassName("laps")[0];
const lapClearButton = document.querySelector(".lap-clear-button");
const ring = document.querySelector(".outer-cicrle")

let colors = ["red","yellow","orange","cyan","magenta","green","yellowgreen","#55E6E6","#5DF527"];

let isplay = false;
let minuteCounter=0;
let secCounter = 0;
let centiCounter = 0;
let sec;
let centisec;
let colorRand;

const toggleButton = () => {
    lapButton.classList.remove("hidden")
    resetButton.classList.remove("hidden")
}
const play = () => {
   
    if (!isplay) {
        colorRand = setInterval(() => {
            let c= Math.floor(Math.random()*(colors.length-1));
            let stl={
                "background-color":`${colors[c]}`,
                "box-shadow":`0px 0px 10px 0px ${colors[c]}`
            }
            Object.assign(ring.style,stl);
        }, 100);
        playButton.innerHTML = 'Pause';
        sec = setInterval(() => {
            if(secCounter===60){
                secCounter=0;
                minuteCounter++;
            }
            second.innerHTML = `${secCounter++} : `;
            minute.innerHTML = `${minuteCounter} :`;
           
        }, 1000);
        centisec = setInterval(() => {
            if (centiCounter >= 100) {
                centiCounter = 0;
            }
            msecond.innerHTML = `${centiCounter++} `;
        }, 10);
        isplay = true;
        
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(sec);
        clearInterval(centisec);
        clearInterval(colorRand);
        isplay = false;
        ring.style.backgroundColor="white";
    }
    toggleButton();
}

const reset = () => {
    lapButton.classList.add("hidden")
    resetButton.classList.add("hidden")
    second.innerHTML = '0 :'
    msecond.innerHTML = '0 '
    minute.innerHTML='0 :';
    minuteCounter=0;
    centiCounter = 0;
    secCounter=0;
}
const lap = () => {
          let sec=secCounter;
          let msec=centiCounter;
          let minute=minuteCounter;
          let counter = document.querySelectorAll("ul li");
        laps.innerHTML+=`<li class="lap-item">
        <span class="number">#${++counter.length}</span>
        <span class="time-stamp"> ${minute} :${sec}  :${msec} </span>
    </li>`
    
}
let clearall= () => {
    laps.innerHTML = ` <button class="lap-clear-button" onclick="clearall()">Clear All</button>`
}
 

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);