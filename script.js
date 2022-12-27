buttonColors = ["green", "red", "yellow", "blue"]
var userClickedPattern = []
var gamePattern = []
var rePattern = []
level = 0
var started = true;

function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChoosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChoosenColor);
    console.log(gamePattern)
    rePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(10).fadeIn(100);
    var audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
    audio.play();



}

$("body").keydown(function() {
    if (started) {
        nextSequence()
        started = false
    }

})

$(".btn").click(function() {
    var userChoosenColor = this.id;
    userClickedPattern.push(userChoosenColor);
    console.log(userClickedPattern);
    playSound(userChoosenColor)
    animatePress(userChoosenColor)
    checkAnswer((userClickedPattern.length - 1))
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => { $("#" + currentColor).removeClass("pressed") }, 10)

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play()
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 2000)
        $("h1").html("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = []
    started = true;
}