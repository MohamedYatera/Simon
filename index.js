var started = false;
var colorList = ["green", "yellow", "red", "blue"];
var gamePattern = [];
var userClicks = [];
var level = 1;

$(document).on("keydown", function () {
    if (!started) {
        started = true;
        $("h1").text("Level " + level);
        sequence();
    }
});

$(".btn").on("click", function () {
    if (started) {
        var chosenColor = this.id; 
        userClicks.push(chosenColor); 
        makeSound(chosenColor); 
        animation(chosenColor); 
        
        checkAnswer(userClicks.length - 1);
    }
});

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClicks[currentLevel]) {
       
        if (userClicks.length === gamePattern.length) {
            setTimeout(function () {
                level++;
                userClicks = []; 
                sequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function sequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colorList[randomNumber];
    gamePattern.push(randomColor); 
    animation(randomColor); 
    makeSound(randomColor); 

    $("h1").text("Level " + level); 
}

function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animation(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

   
    started = false;
    level = 1;
    gamePattern = [];
    userClicks = [];
}
