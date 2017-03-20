var sound = new Audio("resources/Explosion.wav");
var breakTime = 300;
var sessionTime = 1500,
  currentTime = sessionTime, //currentTime holds the correct time when stopped.
  displayTime = currentTime; //displayTime for when we use the breakTime.
var onDeck = "Break"; //variable for switching between sessionTime and breakTime.
var id = true; //variable needed to start and stop the timer.
var playing=false;//variable to switch between play and stop buttion

//Convert input time to seconds.
function minToSec(min) {
  return min*60;
}

//convert seconds to hh:mm:ss
function secToDisplayTime(second){
  var hour = 0, minute = 0;

  hour = Math.floor(second/3600);
  second = second - (hour*3600);
  minute = Math.floor(second/60);
  second = second - (minute*60);

  if (hour > 0){
    return twoDigit(hour)+":"+twoDigit(minute)+":"+twoDigit(second);
  } else {
    return "00:"+twoDigit(minute)+":"+twoDigit(second);
  }
}

//add leading zero to numbers under 10
function twoDigit(num){
  if (num < 10){
    return "0"+num;
  }else {
    return num;
  }
}

//starts the clock
function countDown(){
  if (id===true){
    displayTime = currentTime;
    id = setInterval(decrement,1000);
    playing = true;
    $("#play_stop").attr("src","stop.png");
  }
}

//stop the countdown
function stopCountdown(){
  clearInterval(id);
  id = true;
  playing = false;
  currentTime = displayTime;
  $("#play_stop").attr("src","play.png");
}

//reset to chosen session and break times
function resetCurrent(){
  id = true;
  displayTime = currentTime = sessionTime;
  onDeck = "Break";


  $("#clock").text(secToDisplayTime(displayTime));
}

//reset to default 25 min session and 5 min break time
function resetDefault(){
  id = true;
  displayTime = currentTime = sessionTime = minToSec(25);
  breakTime = minToSec(5)
  onDeck = "Break";

  $("#clock").text(secToDisplayTime(displayTime));
}

//Clock function, the heart of the operation
function decrement(){
  if (displayTime == 0){
    sound.play();
    switch(onDeck){
      case "Break":
        displayTime = breakTime;
        onDeck = "Session";
        break;
      case "Session":
        displayTime = sessionTime;
        onDeck = "Break";
        break;
    }
    $("#clock").text(secToDisplayTime(displayTime));
  }else {
    displayTime--;
    $("#clock").text(secToDisplayTime(displayTime));
  }
}

$(document).ready(function(){
  $("#clock").text(secToDisplayTime(sessionTime));
  $("#sess_min").text(twoDigit(Math.floor(sessionTime/60)));
  $("#break_min").text(twoDigit(Math.floor(breakTime/60)));
  $("#sess_up").click(function(){
    //can adjust the session time during a break or at initialized state.
    if (onDeck=="Session" || playing==false){
      sessionTime+=60;
      $("#sess_min").text(twoDigit(Math.floor(sessionTime/60)));
      displayTime = currentTime = minToSec($("#sess_min").text());

    };
    $("#clock").text(secToDisplayTime(displayTime));
  });

  $("#sess_down").click(function(){
    //can adjust the session time during a break or at initialized state.
    if (onDeck=="Session" || (playing==false && $("#sess_min").text()>1)){
      sessionTime-=60;
      $("#sess_min").text(twoDigit(Math.floor(sessionTime/60)));
      displayTime = currentTime = minToSec($("#sess_min").text());
    };
    $("#clock").text(secToDisplayTime(displayTime));
  });

  $("#break_up").click(function(){
    //can adjust the break time during a session.
    if (onDeck=="Break"&&$("#break_min").text()<99){
      breakTime+=60;
      $("#break_min").text(twoDigit(Math.floor(breakTime/60)));
    };
  });
  $("#break_down").click(function(){
    //can adjust the break time during a session.
    if (onDeck=="Break"&&$("#break_min").text()>1){
      breakTime-=60;
      $("#break_min").text(twoDigit(Math.floor(breakTime/60)));
    };
  });
  $("#play_stop").click(function(){
    if (playing===false){
      countDown();
    }
    else {
      stopCountdown();  
    };
  });
  $("#reset").click(function(){
    stopCountdown();
    resetCurrent();
  });
  $("#default").click()
});
