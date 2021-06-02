var canvas = document.getElementById("canvas")
var buttonClicked = document.getElementById("startButton").addEventListener("click", startWave)
var health = 100
var enemy
var enemyVal = 0
var firstEnemyVal
var enemyArray = []

async function startWave(){
    if(enemyArray.length === 0){
        for(var i = 0; i < 10; i++){
            enemy = document.createElement("div")
            canvas.appendChild(enemy)    
            enemy.setAttribute("class", "enemy")
            enemy.setAttribute("id", "enemy" + enemyVal)
            enemyArray.push(enemyVal)
            enemyVal++     
            await sleep(800)
        }
        checkHealth()
    }  
}

async function checkHealth(){
    firstEnemyVal = Math.min.apply(null, enemyArray)
    var firstEnemy = document.getElementById("enemy" + firstEnemyVal)
    if(enemyArray.length > 0){
        if( parseInt(getComputedStyle(firstEnemy).left) >= 700){
            health--
            document.getElementById("health").innerHTML = "♡ 0" + health
            firstEnemy.remove()
            enemyArray.shift()
        } 
    }
    await sleep(300)
    checkHealth()
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
