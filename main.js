var canvas = document.getElementById("canvas")
var button = document.getElementById("startButton").addEventListener("click", startWave)
var health = 100
var enemy
var enemyVal = 0
var firstEnemy
var firstEnemyVal
var firstEnemyPosition
var enemyArray = []
var tower1 = document.getElementById("tower1").addEventListener("click", dragAndDrop)
var tower
var towerVal = 0
var towerArray = []
var towerPosArray = []
var towerPosition
var holdingTower = false
var gridContainer = document.getElementById("gridContainer")
var areEnemiesOnBoard = false
var checkingUpdates = false
var v = 0
var once = true
var onceV2 = true
var onceV3 = true
var onceV4 = true
var bullet
var position
var enemyHealth = Math.round(Math.random(1, waveHealth))
var waveHealth = 1
var waveVal = 1
var enemyCount = 4
var i
var currency = 100
var enemySpeed = 25

    document.getElementById("coins").innerHTML = "¢ " + currency



async function startWave(){
    areEnemiesOnBoard = true
    onceV2 = true
    console.log(waveHealth)
    if(enemyArray.length === 0){
        for(var i = 0; i < enemyCount; i++){
            enemy = document.createElement("div")
            canvas.appendChild(enemy)    
            enemy.setAttribute("class", "enemy")
            enemy.setAttribute("id", "enemy" + enemyVal)
            enemyArray.push(enemyVal)
            enemyVal++     
            enemy.style.animation = "enemyMove " + enemySpeed +"s linear";
            if(checkingUpdates === false){
                checkingRadius = true
                towerArray.every(checkRadius)
                checkHealth()
                checkWave()
            }
            await sleep(800)           
        }
    }  
}

async function checkHealth(){
    document.getElementById("coins").innerHTML = "¢ " + currency
    firstEnemyVal = Math.min.apply(null, enemyArray)
    firstEnemy = document.getElementById("enemy" + firstEnemyVal)
    if(enemyArray.length > 0){
        if( parseInt(getComputedStyle(firstEnemy).left) >= 700){
            health--
            document.getElementById("health").innerHTML = "♡ 0" + health
            firstEnemy.remove()
            enemyArray.shift()
        } 
        else{

        }
    }
    await sleep(300)
    checkHealth()
}

function dragAndDrop(){
    if(currency >= 100){
        tower = document.createElement("img")
        canvas.appendChild(tower)     
        tower.setAttribute("class", "tower")
        tower.setAttribute("src", "sprites/tower1.png")
        tower.setAttribute("id", "tower" + towerVal)
        towerVal++ 
        towerArray.push(tower)
        console.log(towerArray)
        holdingTower = true
        document.addEventListener("mousemove", function(i){
            tower.style.left = i.clientX - 200 + "px"
            tower.style.top = i.clientY - 50 + "px"
            if(holdingTower === false){
                tower.style.left = ""
                tower.style.top = ""
            }
        })        
        canvas.addEventListener("click", function(i){
            if(holdingTower === true){
                holdingTower = false
                var towerX = Math.round(i.clientX / 70 - 2)
                var towerY = Math.round(i.clientY / 70)
                if (towerX > 10 || towerY > 10 || towerY < 1 || towerX < 1){
                    tower.remove()
                    var isTowerRemoved = true
                }
                else{
                    isTowerRemoved = false
                }
                if (towerX === 10){
                    towerY++
                    towerX = 0 
                }
                towerY--
                var positionVal = towerY.toString()  + towerX.toString()
                position = gridContainer.children[positionVal - 1]
                if(isTowerRemoved === false){
                    if(getComputedStyle(position).background == "rgb(78, 81, 107) none repeat scroll 0% 0% / auto padding-box border-box")
                        {
                            tower.remove()
                        }   
                    position.appendChild(tower)
                    currency = currency - 100  
                    document.getElementById("coins").innerHTML = "¢ " + currency
                }  
                                        
            }
        }) 
    }  
}

async function checkRadius(){ 
    await sleep(50)
    if(enemyArray.length > 0){
        firstEnemyPosition = document.getElementById("enemy" + enemyArray[v]).getBoundingClientRect() 
        for(i = 0; i < towerArray.length; i++){
            towerPosition = towerArray[i].getBoundingClientRect()
            towerPosArray.push(towerPosition)
            if(areEnemiesOnBoard === true){       
                if(towerPosArray[i].left - firstEnemyPosition.left < 170 && firstEnemyPosition.bottom - towerPosArray[i].bottom < 170 && towerPosArray[i].left - firstEnemyPosition.left > -170 && firstEnemyPosition.bottom - towerPosArray[i].bottom > -170){
                    if(once === true){
                        shoot()
                        once = false
                    }      
                    var dY = towerPosArray[i].bottom - firstEnemyPosition.bottom
                    var dX = towerPosArray[i].left - firstEnemyPosition.left
                    var Rads = Math.atan2(dY, dX)
                    var Degs = Rads * (180/Math.PI) - 100
                    towerArray[i].style.transform = "rotate(" + Degs + "deg)"                      
                }
            } 
            if(towerPosArray[i].left - firstEnemyPosition.left < -150 ||towerPosArray[i].bottom - firstEnemyPosition.bottom > 150){
                enemyArray.shift()
            }
        }   
        checkRadius()
    }   
}

async function shoot(){
    for(var j = 0; j < towerArray.length; j++){
        bullet = document.createElement("div")
        canvas.appendChild(bullet)
        bullet.setAttribute("class", "bullet")
        bullet.style.left = towerPosArray[j].left - 110 + "px"
        bullet.style.top = towerPosArray[j].top + 10 + "px"
        bullet.style.left = getComputedStyle(firstEnemy).left
        bullet.style.top = getComputedStyle(firstEnemy).top
        if(bullet.style.left < getComputedStyle(firstEnemy).left + 5){
            enemyHealth--
            firstEnemy.innerHTML = enemyHealth
            if(enemyHealth <= 0){
                firstEnemy.remove()
                enemyArray.shift()
                enemyHealth = waveHealth
                currency = currency + 10
            }
        }    
        await sleep(100)
        bullet.remove()       
    }   
    await sleep(600)
        once = true
}

async function checkWave(){
    await sleep(1000)
    if(onceV2 === true){
        if(enemyArray.length === 0){
                console.log("test")
                waveVal++
                document.getElementById("buttonText").innerHTML = "Wave " + waveVal
                onceV2 = false
                waveHealth++
                enemyCount++  
                enemySpeed = enemySpeed - 0.2
        }   
    }   
    checkWave()
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
