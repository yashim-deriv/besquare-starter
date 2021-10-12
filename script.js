//Making sound
function playSound(key) {
  switch (key) {
    case "a":
      const clap_audio = new Audio("./sounds/clap.wav");
      clap_audio.play();
      break;
    case "s":
      const hi_hat_audio = new Audio("./sounds/hi_hat.wav");
      hi_hat_audio.play();
      break;
    case "d":
      const kick_audio = new Audio("./sounds/kick.wav");
      kick_audio.play();
      break;
    case "f":
      const open_hat_audio = new Audio("./sounds/open_hat.wav");
      open_hat_audio.play();
      break;
    case "g":
      const boom_audio = new Audio("./sounds/boom.wav");
      boom_audio.play();
      break;
    case "h":
      const ride_audio = new Audio("./sounds/ride.wav");
      ride_audio.play();
      break;
    case "j":
      const snare_audio = new Audio("./sounds/snare.wav");
      snare_audio.play();
      break;
    case "k":
      const tom_audio = new Audio("./sounds/tom.wav");
      tom_audio.play();
      break;
    case "l":
      const tink_audio = new Audio("./sounds/tink.wav");
      tink_audio.play();
      break;
    default:
      break;
  }
}

function checkKeys(event) {
  if (event.key === "a") {
    playSound("a");
  } else if (event.key === "s") {
    playSound("s");
  } else if (event.key === "d") {
    playSound("d");
  } else if (event.key === "f") {
    playSound("f");
  } else if (event.key === "g") {
    playSound("g");
  } else if (event.key === "h") {
    playSound("h");
  } else if (event.key === "j") {
    playSound("j");
  } else if (event.key === "k") {
    playSound("k");
  } else if (event.key === "l") {
    playSound("l");
  } else {
    console.log(`${event.key} got no sound`);
  }
}

//Beats to play
const drumBeat = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]; //song?
let currentBeat = 0; //use index to access drumBeat
let drumBeatHistory = []; //for storing history key
let is_game_started = false; // use to check game start
let interval_id; //use for stopping timer

//to clear dummy in HTML
clearTarget();
updateTargetKeys();

document.addEventListener("keydown", (e) => {
  //for sounds
  checkKeys(e);

  //for drum beat history
  if (is_game_started) {
    //to check if key match w/ currentBeat
    const isMatched = e.key === drumBeat[currentBeat];
    if (isMatched) {
      currentBeat++;
    }

    drumBeatHistory.push({
      key: e.key,
      status: isMatched ? "correct" : "wrong",
    });

    console.log("history ===", drumBeatHistory); //correct logic!!

    updateTargetKeys();
    displayScore();
  }
});

// For scoring
function displayScore() {
  const score = document.getElementById("score");
  score.textContent = currentBeat;
}

// Turn into array of 7 key
function updateTargetKeys() {
  //What's coming? -> 3x upcoming + 1x active + 3x history

  //Upcoming beat
  let upcomingBeat = drumBeat.slice(currentBeat + 1, currentBeat + 4); // [s,d,f]
  console.log("upcoming beat", upcomingBeat);
  upcomingBeat.reverse(); // [f,d,s]

  //Current Beat Position
  const activeBeat = drumBeat[currentBeat]; // [a]

  //Beat History
  let beatHistory = drumBeatHistory.slice(-3); // [ , , , ]

  // from ['' , ''] to [{}, {}]
  upcomingBeat = upcomingBeat.map((beat) => {
    return { key: beat, status: "" };
  });

  // ??? [f,d,s,a] { key: "", value: ""}
  const combine = [
    ...upcomingBeat,
    { key: activeBeat, status: "active" },
    ...beatHistory,
  ];
  console.log(combine); // Correct logic!!
  clearTarget();
  displayTargetKeys(combine);
}

//For timer
function startTimer(duration) {
  let current_time = 1;
  interval_id = setInterval(() => {
    const timer_id = document.getElementById("timer");
    timer_id.textContent = formatTime(current_time);
    current_time++;
    if (current_time > duration) {
      clearInterval(interval_id);
    }
  }, 1000);
}

//Timer formatting 00:00 (in seconds)
function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}

// For Start/stop game & timer
const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
  const timer_id = document.getElementById("timer");
  is_game_started = !is_game_started; // Reverse. (toggle) Eg; true -> false, false -> true
  if (is_game_started) {
    startBtn.textContent = "Stop Game"; //btn start -> stop
    timer_id.textContent = "00:00"; //timer retart from 0
    startTimer(20); // Self-set

    // Reset data upon game start
    drumBeatHistory = []; // Clear History
    currentBeat = 0; // Reset Position
  } else {
    startBtn.textContent = "Start Game";
    clearInterval(interval_id); // stop the timer
  }
  // call again to update the target display
  clearTarget();
  updateTargetKeys();
});

//Clearing target-box
function clearTarget() {
  const target_box = document.querySelector(".target-box");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}

//For updating target
function displayTargetKeys(combinedArray) {
  combinedArray.forEach((t) => {
    // <div></div>
    const target_card = document.createElement("div");
    // <div class="target-card"></div>
    target_card.classList.add("target-card");
    if (t.status !== "") {
      target_card.classList.add(t.status);
    }

    // <div class="target-box"></div>
    //    <div class="target-card active"> ></div>
    // </div>
    target_card.textContent = t.key;
    const target_box = document.querySelector(".target-box");
    target_box.appendChild(target_card);
  });
}
