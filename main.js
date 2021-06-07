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
var holdingTower = false
var gridContainer = document.getElementById("gridContainer")
var areEnemiesOnBoard = false
var checkingUpdates = false

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
                checkRadius()
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
        holdingTower = true
        document.addEventListener("mousemove", function(i){
            tower.style.left = i.clientX + "px"
            tower.style.top = i.clientY + "px"
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
    await sleep(100)
    towerPosition = tower.getBoundingClientRect()
    firstEnemyPosition = firstEnemy.getBoundingClientRect()
    var distanceHorizontal = towerPosition.left - firstEnemyPosition.left
    var distanceVertical = firstEnemyPosition.bottom - towerPosition.bottom
    // console.log("X =" + distanceHorizontal)
    // console.log("Y =" + distanceVertical)
    if(areEnemiesOnBoard === true){       
        if(distanceHorizontal < 170 && distanceVertical < 170 && distanceHorizontal > -170 && distanceVertical > -170){
            // console.log("entered the radius")
            faceEnemy()
        }
    }     
    checkRadius()
}

function faceEnemy(){
    var dY = towerPosition.bottom - firstEnemyPosition.bottom
    var dX = towerPosition.left - firstEnemyPosition.left
    var Rads = Math.atan2(dY, dX)
    var Degs = Rads * (180/Math.PI) - 90 
    tower.style.transform = "rotate(" + Degs + "deg)"
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
