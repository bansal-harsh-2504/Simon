const btn = document.querySelector("#start-btn");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
btn.addEventListener('click', function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
function adjustStyles() {
  var screenWidth = window.innerWidth;

  if (screenWidth <= 500) {
    document.querySelector('.btn').style.margin = '10px';
    document.querySelector('.btn').style.height = '130px';
    document.querySelector('.btn').style.width = '130px';
    document.querySelector('#level-title').style.fontSize = '24px';
    document.querySelector('#level-title').style.marginTop = '20%';
    document.querySelector('.normalbtn').style.marginTop = '20px';
    document.querySelector('.normalbtn').style.display = 'inline-block';
  } else {
    // Reset styles to default if screen width is greater than 500px
    document.querySelector('.btn').style.margin = '';
    document.querySelector('.btn').style.height = '';
    document.querySelector('.btn').style.width = '';
    document.querySelector('#level-title').style.fontSize = '';
    document.querySelector('#level-title').style.marginTop = '';
    document.querySelector('.normalbtn').style.marginTop = '';
    document.querySelector('.normalbtn').style.display = '';
  }
}

// Call the function initially
adjustStyles();

// Call the function on window resize
window.addEventListener('resize', adjustStyles);