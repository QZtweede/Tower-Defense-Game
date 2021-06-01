var canvas = document.getElementById("canvas")
var buttonClicked = document.getElementById("startButton").addEventListener("click", startWave)
var health = 100
var enemy



async function startWave(){
    for(var i = 0; i < 5; i++){
        enemy = document.createElement("div")
        canvas.appendChild(enemy)    
        enemy.setAttribute("class", "enemy")
        await sleep(1000)
    }
    checkHealth()
}

async function checkHealth(){
    if( parseInt(getComputedStyle(enemy).left) >= 40){
        health--
    }
    sleep(100)
    checkHealth()   
}


function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
