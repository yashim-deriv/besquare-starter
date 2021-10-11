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
const drumBeat = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
let currentBeat = 0; //use index to access drumBeat
const drumBeatHistory = [];

document.addEventListener("keydown", (e) => {
  //for sounds
  checkKeys(e);

  //to check if key match w/ currentBeat
  const isMatched = e.key === drumBeat[currentBeat];
  if (isMatched) {
    currentBeat++;
    drumBeatHistory.push({
      key: e.key,
      status: isMatched ? "correct" : "wrong",
    });
  }
});

//What's coming? -> 3x upcoming + 1x active + 3x history
//Upcoming beat
let upcomingBeat = drumBeat.slice(currentBeat + 1, currentBeat + 4); // [s,d,f]
upcomingBeat.reverse(); // [f,d,s]

//Current Beat Position
const activeBeat = drumBeat[currentBeat]; // [a]

//Beat History
let beatHistory = drumBeatHistory.slice(-3); // [ , , , ]

//from ['' , ''] to [{}, {}]
upcomingBeat.map((e) => ({ key: e, status: "" }));
history.map((e) => ({ key: e, status: "" }));
activeBeat.map((e) => ({ key: e, status: "active" }));

const combine = [...upcomingBeat, activeBeat, ...beatHistory]; // [f,d,s,a]

//For timer
function startTimer(duration) {
  let current_time = 1;
  const interval_id = setInterval(() => {
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

//Clearing target-box
function clearTarget() {
  const target_box = document.querySelector(".target-box");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}

//For updating target
function updateTarget(beat) {
  beat.forEach((t) => {
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

clearTarget();
updateTarget();

/*

let game_timer;
let current_key_position = 0;
let score = 0;
let is_game_started = false;
let history = [];

const sample_game_mode = [
  "g",
  "a",
  "g",
  "g",
  "a",
  "g",
  "g",
  "a",
  "g",
  "g",
  "a",
  "g",
];

const key_drum_pair = {
  a: "clap",
  s: "hi_hat",
  d: "kick",
  f: "open_hat",
  g: "boom",
  h: "ride",
  j: "snare",
  k: "tom",
  l: "tink",
};

// Element
const timer_element = document.getElementById("timer");
const score_element = document.getElementById("score");

// Default data
const key_status_pair = [
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
];

const start_game_btn = document.getElementById("start_game");
start_game_btn.addEventListener("click", () => {
  is_game_started = !is_game_started;
  if (is_game_started) {
    startGame();
  } else {
    endGame();
  }
});

function startGame() {
  current_key_position = 0;
  score = 0;
  history = [];
  startTimer(120);
  updateTargets();
  score_element.textContent = 0;
  start_game_btn.textContent = "End Game";
}

function endGame() {
  clearInterval(game_timer);
  start_game_btn.textContent = "Start Game";
  timer_element.textContent = "00:00";
}

Object.keys(key_drum_pair).forEach((key) => {
  const drum_type = key_drum_pair[key];
  const key_card = document.getElementById(drum_type);
  key_card.addEventListener("click", () => playSound(drum_type));
});

document.addEventListener("keydown", (e) => {
  processKeyPress(e.key.toLocaleLowerCase());
});

function processKeyPress(key) {
  const drum_type = key_drum_pair[key];
  if (drum_type) {
    playSound(drum_type);
  }

  let key_correct = false;
  if (is_game_started) {
    if (key === sample_game_mode[current_key_position]) {
      score++;
      key_correct = true;
      current_key_position++;
    }

    if (Object.keys(key_drum_pair).includes(key)) {
      history.push({
        id: key,
        status: key_correct ? "correct" : "wrong",
      });
    }

    updateScore();
    updateTargets();

    if (sample_game_mode.length === current_key_position + 1) {
      endGame();
    }
  }
}

function playSound(drum_type) {
  const audio = new Audio(`./sounds/${drum_type}.wav`);
  audio.play();
}

// Sets Timer. Duration is in seconds.
function startTimer(duration) {
  let current_time = 0;
  game_timer = setInterval(() => {
    current_time++;
    timer_element.textContent = formatTime(current_time);
    if (current_time >= duration) {
      clearInterval(game_timer);
    }
  }, 1000);
}

// Converts seconds to mm:ss. Time is in seconds.
function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}

// Updates target display
function updateTargets() {
  clearTargets();

  // Upcoming Keys
  let upcoming_keys = sample_game_mode.slice(
    current_key_position + 1,
    current_key_position + 4
  );

  let upcoming_keys_array = upcoming_keys.map((k) => ({
    id: k,
    status: "",
  }));

  upcoming_keys_array = fillDefaultStatus(upcoming_keys_array, 3);
  upcoming_keys_array.reverse();

  // Current Key
  const current_key = sample_game_mode[current_key_position];

  // History Keys
  let history_keys = history.slice(-3);
  history_keys = fillDefaultStatus(history_keys, 3);
  history_keys.reverse();

  const target_array = [
    ...upcoming_keys_array,
    { id: current_key, status: "active" },
    ...history_keys,
  ];

  target_array.forEach((t) => {
    const { id, status } = t;
    const target_card = document.createElement("div");
    target_card.classList.add("target-card");
    if (status) {
      target_card.classList.add(status);
    }
    const target_text = document.createTextNode(id.toUpperCase());
    target_card.appendChild(target_text);
    const target_box = document.querySelector(".target-container");
    target_box.appendChild(target_card);
  });
}

function fillDefaultStatus(array, min_element) {
  const array_copy = [...array];
  const default_data = {
    id: "",
    status: "",
  };

  if (array.length < min_element) {
    for (let index = 0; index < min_element - array.length; index++) {
      array_copy.push(default_data);
    }
  }

  return array_copy;
}

function updateScore() {
  score_element.textContent = score;
}

updateTargets(key_status_pair);

function clearTargets() {
  const target_box = document.querySelector(".target-container");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}


*/
