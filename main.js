var canvas = document.getElementById("canvas")
var buttonClicked = document.getElementById("startButton").addEventListener("click", startWave)

function startWave(){
    console.log("test")
    var enemy = document.createElement("div")
    canvas.appendChild(enemy)
    enemy.setAttribute("class", "enemy")
}