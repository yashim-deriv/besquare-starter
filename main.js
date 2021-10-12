//Sound
document.addEventListener("keydown", function (e) {
  play_instrument(e.key);
});

function play_instrument(event) {
  let audio = "";
  switch (event) {
    case "a":
      audio = new Audio("/sounds/clap.wav");
      audio.play();
      break;
    case "s":
      audio = new Audio("/sounds/hi_hat.wav");
      audio.play();
      break;
    case "d":
      audio = new Audio("/sounds/kick.wav");
      audio.play();
      break;
    case "f":
      audio = new Audio("/sounds/open_hat.wav");
      audio.play();
      break;
    case "g":
      audio = new Audio("/sounds/boom.wav");
      audio.play();
      break;
    case "h":
      audio = new Audio("/sounds/ride.wav");
      audio.play();
      break;
    case "j":
      audio = new Audio("/sounds/snare.wav");
      audio.play();
      break;
    case "k":
      audio = new Audio("/sounds/tom.wav");
      audio.play();
      break;
    case "l":
      audio = new Audio("/sounds/tink.wav");
      audio.play();
      break;
    default:
      break;
  }
}

//Update Target
let array_keys = ["G", "A", "S", "G", "A", "S", "H"];
let history_keys = [
  { key: "", status: "" },
  { key: "", status: "" },
  { key: "", status: "" },
];
let display_keys = [];
const target_card_data = [
  {
    key: "",
    status: "active",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
];
const default_card_data = [
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "active",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
  {
    key: "",
    status: "",
  },
];
let reset_timer = false;
let pause_timer = false;

document.addEventListener("keydown", function (e) {
  read_value(e.key);
});

function read_value(key_pressed) {
  array_keys.shift();
  checkTarget(key_pressed);
  clearTarget();
  calculateTarget();
  updateTarget();
}

clearTarget();
defaultTarget();
// calculateTarget();
// updateTarget();

let count_score = 1;

function defaultTarget() {
  default_card_data.forEach((t) => {
    const target_card = document.createElement("div");
    target_card.classList.add("target-card");
    if (t.status !== "") {
      target_card.classList.add(t.status);
    }

    target_card.textContent = t.key;
    const target_box = document.querySelector(".target-box");
    target_box.appendChild(target_card);
  });
}

function checkTarget(target) {
  let history_object = {};
  history_object.key = target.toUpperCase();
  if (display_keys[3].key === target.toUpperCase()) {
    document.getElementById("score").innerText = count_score++;
    history_object.status = "correct";
  } else {
    history_object.status = "wrong";
  }
  if (display_keys[2].key === undefined) {
    pause_timer = true;
  }
  history_keys.push(history_object);
  history_keys.shift();
}

//Clear Target
function clearTarget() {
  display_keys = [];
  const target_box = document.querySelector(".target-box");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}

function calculateTarget() {
  let count = 0;
  let inverse = 3;
  let inverse_history = 2;
  let new_target_card_data = [];
  let new_history_key = [];

  for (let i = 0; i < history_keys.length; i++) {
    new_history_key.push(history_keys[inverse_history]);
    inverse_history--;
  }

  target_card_data.forEach((t) => {
    if (count <= 3) {
      target_card_data[inverse].key = array_keys[inverse];
      new_target_card_data.push(target_card_data[inverse]);
      inverse--;
      count++;
    }
  });

  let new_display_keys = [[...new_target_card_data], [...new_history_key]];
  for (let i = 0; i < new_display_keys.length; i++) {
    for (let j = 0; j < new_display_keys[i].length; j++) {
      display_keys.push(new_display_keys[i][j]);
    }
  }
}

function updateTarget() {
  display_keys.forEach((t) => {
    const target_card = document.createElement("div");
    target_card.classList.add("target-card");
    if (t.status !== "") {
      target_card.classList.add(t.status);
    }

    target_card.textContent = t.key;
    const target_box = document.querySelector(".target-box");
    target_box.appendChild(target_card);
  });
}

//Timer Part

function start_timer(duration) {
  let current_time = 180;
  const interval_id = setInterval(() => {
    const timer_id = document.getElementById("timer");
    timer_id.textContent = formatTime(current_time);
    current_time--;
    if (current_time > duration) {
      clearInterval(interval_id);
    }
    if (reset_timer == true) {
      clearInterval(interval_id);
      document.getElementById("timer").innerText = "00:00";
    }
    if (pause_timer == true) {
      clearInterval(interval_id);
    }
  }, 1000);
}

function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}

// let minute = 0;
// let second = 0;
// let millisecond = 0;
// let cron;

// function timer() {
//   if ((millisecond += 10) == 1000) {
//     millisecond = 0;
//     second++;
//   }
//   if (second == 60) {
//     second = 0;
//     minute++;
//   }
//   document.getElementById("seconds").innerText = returnData(second);
//   document.getElementById("minutes").innerText = returnData(minute);
// }

// function returnData(input) {
//   return input > 10 ? input : `0${input}`;
// }

let play_btn = document.getElementById("start_end_btn");
play_btn.addEventListener("click", prepare_timer);

function prepare_timer() {
  if (play_btn.innerText === "Start Game") {
    count_score = 1;
    array_keys = ["G", "A", "S", "G", "A", "S", "H"];
    history_keys = [
      { key: "", status: "" },
      { key: "", status: "" },
      { key: "", status: "" },
    ];
    clearTarget();
    calculateTarget();
    updateTarget();
    play_btn.innerText = "End Game";
    pause_timer = false;
    reset_timer = false;
    start_timer();
  } else if (play_btn.innerText === "End Game") {
    reset();
  }
}
// function count_time() {
//   play_btn.innerText = "End Game";
//   cron = setInterval(() => {
//     timer();
//   }, 10);
// }

function reset() {
  reset_timer = true;
  document.getElementById("score").innerText = "0";
  document.getElementById("timer").innerText = "00:00";
  clearTarget();
  defaultTarget();
  play_btn.innerText = "Start Game";
}
