var canvas = document.getElementById("canvas")
var buttonClicked = document.getElementById("startButton").addEventListener("click", startWave)
var health = 100
var enemy
var enemyVal = 0
var firstEnemyVal
var enemyArray = []

async function startWave(){
    if(enemyArray.length === 0){
        for(var i = 0; i < 5; i++){
            enemy = document.createElement("div")
            canvas.appendChild(enemy)    
            enemy.setAttribute("class", "enemy")
            enemy.setAttribute("id", "enemy" + enemyVal)
            enemyArray.push(enemyVal)
            enemyVal++     
            await sleep(1000)
        }
        checkHealth()
    }  
}

async function checkHealth(){
    if( parseInt(getComputedStyle(enemy).left) >= 300){
        health--
        document.getElementById("health").innerHTML = "♡ 0" + health
        firstEnemyVal = Math.min.apply(null, enemyArray)
        var firstEnemy = document.getElementById("enemy" + firstEnemyVal)
        firstEnemy.remove()
        enemyArray.shift()
    } 
    await sleep(1000)
    checkHealth()
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
