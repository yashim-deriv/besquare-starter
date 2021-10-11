const drumBeat = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const drumBeatHistory = ["p", "b", "c"];

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

document.addEventListener("keydown", checkKeys);

//timer
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

//timer formatting 00:00 (in seconds)
function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}

/* startTimer(); */

//Clearing .target-box, * mean all children
function clearTarget() {
  const target_box = document.querySelector(".target-box");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}

//Add target
const target_card_data = [
  {
    key: "A",
    status: "",
  },
  {
    key: "S",
    status: "",
  },
  {
    key: "D",
    status: "",
  },
  {
    key: "F",
    status: "active",
  },
  {
    key: "G",
    status: "wrong",
  },
  {
    key: "H",
    status: "correct",
  },
  {
    key: "J",
    status: "timeout",
  },
];

function updateTarget() {
  target_card_data.forEach((t) => {
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
