var canvas = document.getElementById("canvas")
var button = document.getElementById("startButton").addEventListener("click", startWave)
var health = 20  
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
var points = 0
var enemySpeed = 20
var towerAmount = 3

    function checkUpdates(){    //Start loop in updatefuncties
        towerArray.every(checkRadius)
        checkHealth()
        checkWave()
    }

    async function startWave(){     //Spawn enemies
    areEnemiesOnBoard = true
    onceV2 = true
    if(enemyArray.length === 0){    //Check of er geen andere wave bezig is
        for(var i = 0; i < enemyCount; i++){
            enemy = document.createElement("div")
            canvas.appendChild(enemy)    
            enemy.setAttribute("class", "enemy")
            enemy.setAttribute("id", "enemy" + enemyVal)
            enemyArray.push(enemyVal)
            enemyVal++     
            enemy.style.animation = "enemyMove " + enemySpeed +"s linear";
            checkUpdates()         
            await sleep(800)           
        }
    }  
}

async function checkHealth(){       //Check of de health van de player
    document.getElementById("coins").innerHTML = "P " + points
    firstEnemyVal = Math.min.apply(null, enemyArray)
    firstEnemy = document.getElementById("enemy" + firstEnemyVal)
    if(enemyArray.length > 0){
        if( parseInt(getComputedStyle(firstEnemy).left) >= 600){    //Check of de enemies ver genoeg zijn gekomen
            health--
            document.getElementById("health").innerHTML = "♡ 0" + health
            firstEnemy.remove()
            enemyArray.shift()
        } 
        else{

        }
    }
    if(health <= 0 && onceV3 === true){     //Check of de player verloren heeft
        alert("GAME OVER \nYour final score was: " + points + "P \nYou can refresh this page if you want to play again")
        onceV3 = false
    }
    await sleep(300)
    checkHealth()
}

function dragAndDrop(){     //Spawn torens
    if(towerAmount >= 1 && areEnemiesOnBoard === false){    //Check of het limiet van 3 torens bereikt is
        tower = document.createElement("img")
        canvas.appendChild(tower)     
        tower.setAttribute("class", "tower")
        tower.setAttribute("src", "sprites/tower1.png")
        tower.setAttribute("id", "tower" + towerVal)
        towerVal++ 
        holdingTower = true
        document.addEventListener("mousemove", function(i){
            tower.style.left = i.clientX - 200 + "px"
            tower.style.top = i.clientY - 50 + "px"
            if(holdingTower === false){
                tower.style.left = ""
                tower.style.top = ""
            }
        })        
        canvas.addEventListener("click", function(i){       //Toren volgt muis
            if(holdingTower === true){
                holdingTower = false
                var towerX = Math.round(i.clientX / 70 - 2)
                var towerY = Math.round(i.clientY / 70)
                if (towerX > 10 || towerY > 10 || towerY < 1 || towerX < 1){     //Check of toren buiten canvas geplaatst is
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
                    if(getComputedStyle(position).background == "rgb(78, 81, 107) none repeat scroll 0% 0% / auto padding-box border-box")  //Check of toren niet op het pad van de enemies is geplaatst
                        {
                            tower.remove()
                        }   
                    else{
                        position.appendChild(tower)
                        towerAmount = towerAmount - 1  
                        document.getElementById("price").innerText = towerAmount
                        document.getElementById("coins").innerHTML = "P " + points
                        onceV4 = true
                        towerArray.push(tower)
                        checkUpdates()
                        checkRadius()
                    }
                    
                }  
                                        
            }
        }) 
    }  
}

async function checkRadius(){   //Check of enemies binnen de radius van de torens zitten
    await sleep(50)
    if(enemyArray.length > 0){
        firstEnemyPosition = document.getElementById("enemy" + enemyArray[v]).getBoundingClientRect() 
        for(i = 0; i < towerArray.length; i++){       
            towerPosition = towerArray[i].getBoundingClientRect()   
                towerPosArray.push(towerPosition)
            if(areEnemiesOnBoard === true){       
                if(towerPosArray[i].left - firstEnemyPosition.left < 170 && firstEnemyPosition.bottom - towerPosArray[i].bottom < 170 && towerPosArray[i].left - firstEnemyPosition.left > -170 && firstEnemyPosition.bottom - towerPosArray[i].bottom > -170){     //Radius van torens
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
        }   
        checkRadius()
    }   
}

async function shoot(){     //Functie die zorgt voor het schieten als de enemy in de radius is
        bullet = document.createElement("div")
        canvas.appendChild(bullet)
        bullet.setAttribute("class", "bullet")
        bullet.style.left = towerPosArray[i].left - 110 + "px"
        bullet.style.top = towerPosArray[i].top + 10 + "px"
        bullet.style.left = getComputedStyle(firstEnemy).left
        bullet.style.top = getComputedStyle(firstEnemy).top
        if(bullet.style.left < getComputedStyle(firstEnemy).left + 5){      //Collision detection
            enemyHealth--
            firstEnemy.innerHTML = enemyHealth
            if(enemyHealth <= 0){       //Check of enemy geen health meer heeft
                firstEnemy.remove()
                enemyArray.shift()
                enemyHealth = waveHealth
                points = points + 10
            }  
        await sleep(100)
        
        bullet.remove()
    }   
    await sleep(600)
    once = true
       
}

async function checkWave(){     //Check of een nieuwe wave aangeroepen kan worden
    await sleep(1000)
    if(onceV2 === true){
        if(enemyArray.length === 0){     //Check of alle enemies van deze wave weg zijn
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

function sleep(time) {      //Functie om pauzes te maken
    return new Promise(resolve => setTimeout(resolve, time));
  }
