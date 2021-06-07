var canvas = document.getElementById("canvas")
var buttonClicked = document.getElementById("startButton").addEventListener("click", startWave)
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
var bullet

async function startWave(){
    areEnemiesOnBoard = true
    if(enemyArray.length === 0){
        for(var i = 0; i < 10; i++){
            enemy = document.createElement("div")
            canvas.appendChild(enemy)    
            enemy.setAttribute("class", "enemy")
            enemy.setAttribute("id", "enemy" + enemyVal)
            enemyArray.push(enemyVal)
            enemyVal++     
            if(checkingUpdates === false){
                checkingRadius = true
                towerArray.every(checkRadius)
                checkHealth()
            }
            await sleep(800)           
        }
    }  
}

async function checkHealth(){
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
                    // refund money
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
                let position = gridContainer.children[positionVal - 1]
                if(isTowerRemoved === false){
                    position.appendChild(tower)
                    if(getComputedStyle(position).background == "rgb(78, 81, 107) none repeat scroll 0% 0% / auto padding-box border-box")
                        {
                            tower.remove()
                            // refund money
                        }                    
                }                           
            }
        }) 
}

async function checkRadius(){ 
    await sleep(50)
    firstEnemyPosition = document.getElementById("enemy" + enemyArray[v]).getBoundingClientRect() 
    for(var i = 0; i < towerArray.length; i++){
        towerPosition = towerArray[i].getBoundingClientRect()
        towerPosArray.push(towerPosition)
        if(areEnemiesOnBoard === true){       
            if(towerPosArray[i].left - firstEnemyPosition.left < 170 && firstEnemyPosition.bottom - towerPosArray[i].bottom < 170 && towerPosArray[i].left - firstEnemyPosition.left > -170 && firstEnemyPosition.bottom - towerPosArray[i].bottom > -170){
                var dY = towerPosArray[i].bottom - firstEnemyPosition.bottom
                var dX = towerPosArray[i].left - firstEnemyPosition.left
                var Rads = Math.atan2(dY, dX)
                var Degs = Rads * (180/Math.PI) - 100
                towerArray[i].style.transform = "rotate(" + Degs + "deg)"
                if(once === true){
                    shoot()
                    once = false
                }           
            }
        } 
        if(towerPosArray[i].left - firstEnemyPosition.left < -150 ||towerPosArray[i].bottom - firstEnemyPosition.bottom > 150){
            v++
        }
    }   
    checkRadius()
}

async function shoot(){
    bullet = document.createElement("img")
    canvas.appendChild(bullet)
    bullet.setAttribute("class", "bullet")
    await sleep(800)
    once = true
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
