//song (?)
const tune = ["f", "a", "s", "d", "l", "g", "h", "k", "a", "f", "g"];

//declare empty target cards
const target_card_data = [];

let current_time = 10;

let score = 0;

let game_state = false;

const timer = document.getElementById("timer");

const scoreBoard = document.getElementById("score");
//fill in empty initial history
for (let i = 0; i < 3; i++) {
  target_card_data.unshift({
    key: "",
    status: "",
  });
}

//set initial active state
target_card_data.unshift({ key: tune[0], status: "active" });
tune.shift();

//set cards for following keys to press
for (let i = 0; i < 3; i++) {
  target_card_data.unshift({
    key: tune[0],
    status: "",
  });

  tune.shift();
}

// key-sound pair
const key_sound = {
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

//keyboard

document.addEventListener("keypress", (event) => {
  Object.keys(key_sound).map((key, value) => {
    if (game_state) {
      if (event.key === key) {
        new Audio(`sounds/${key_sound[key]}.wav`).play();

        //key check logic
        if (event.key === target_card_data[3].key) {
          target_card_data[3].status = "correct";
          current_time += 5;
          score++;
          scoreBoard.innerHTML = score;
        } else {
          target_card_data[3].status = "wrong";
          current_time -= 2;
        }
        target_card_data[2].status = "active";
        target_card_data.pop();
        target_card_data.unshift({ key: tune[0], status: "" });
        tune.shift();

        clearTarget();
        updateTarget();
      }
    }
  });
});

//clicking
document.querySelectorAll(".key-card").forEach((item) => {
  item.addEventListener("click", () => {
    new Audio(`sounds/${item.id}.wav`).play();
  });
});

function toggleGameState() {
  game_state = !game_state;
  console.log(game_state);
}

//clears target cards
function clearTarget() {
  const target_box = document
    .querySelector(".target-box")
    .querySelectorAll("*")
    .forEach((e) => {
      e.remove();
    });
}

function startTimer() {
  current_time = 10;
  const interval_id = setInterval(() => {
    console.log("hey");
    timer.innerHTML = formatTime(current_time);
    current_time--;
    if (current_time < 0) {
      clearInterval(interval_id);
      toggleGameState();

      score = 0;
    }
  }, 1000);
}

function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);

  return `${minutes}:${seconds}`;
}

function updateTarget() {
  target_card_data.forEach((item) => {
    const target_card = document.createElement("div");
    target_card.classList.add("target-card");
    if (item.status !== "") {
      target_card.classList.add(item.status);
    }

    target_card.textContent = item.key;
    const target_box = document
      .querySelector(".target-box")
      .appendChild(target_card);
  });
}

document.getElementById("start-game").addEventListener("click", startGame);

document.getElementById("free-play").addEventListener("click", freePlay);

function freePlay() {
  toggleGameState();
}

function startGame() {
  toggleGameState();
  startTimer();
}

clearTarget();
updateTarget();
