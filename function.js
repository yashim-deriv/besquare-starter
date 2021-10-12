//list of keys
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

//keyboard and click keys
for (const key in key_drum_pair) {
  let drum_card = document.getElementById(key_drum_pair[key]);
  var e = drum_card.addEventListener("click", () => {
    playSound(key_drum_pair[key]);
  });
}

function playSound(e) {
  let audio = new Audio(`./sounds/${e}.wav`);
  audio.play();
}

//Timer part
function startTimer(duration) {
  let current_time = 0;
  const interval_id = setInterval(() => {
    current_time++;
    const timer_id = document.getElementById("timer-box");
    timer_id.textContent = formatTime(current_time);
    if (current_time > duration) {
      clearInterval(interval_id);
    }
  }, 1000);
  return 1;
}

function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}

//Targetbox part
function clearTarget() {
  const target_box = document.querySelector(".target-box");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}

const target_card_ref = ["A", "S", "D", "F", "K"];

const target_card_data = [
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

function startTarget() {
  var last = target_card_ref.length;
  for (let i = last - 1; i >= 0; i--) {
    if (i == last - 1) {
      target_card_data.push({ key: target_card_ref[i], status: "active" });
    } else {
      target_card_data.push({ key: target_card_ref[i], status: "" });
    }
  }
  console.log(target_card_data);
  for (let i = 6; i >= 0; i--) {
    console.log(i);
    let t = target_card_data[i];
    console.log(t);
    const target_card = document.createElement("div");
    //add class name for this div
    target_card.classList.add("target-card");
    if (t.status !== "") {
      target_card.classList.add(t.status);
    }
    target_card.textContent = t.key;
    const target_box = document.querySelector(".target-box");
    target_box.appendChild(target_card);
  }
}
const btn = document.getElementById("strtBtn");
document.getElementById("strtBtn").addEventListener("click", () => {
  if (btn.innerText === "Start Game") {
    btn.innerHTML = "End Game";
  } else {
    btn.innerText = "Start Game";
  }
  clearTarget();
  startTarget();
  startTimer(30);
  document.addEventListener("keypress", (e) => {
    press_key = e.key.toUpperCase();
    playSound(key_drum_pair[e.key]);
    var m = document.getElementsByClassName("target-card active");
    const activeIndex = target_card_data.findIndex(function (e) {
      return e.status == "active";
    });
    console.log(`active:${activeIndex}`);
    if (activeIndex !== -1) {
      if (press_key == m[0].innerHTML) {
        target_card_data[activeIndex].status = "correct";
        console.log("correct!");
      } else {
        target_card_data[activeIndex].status = "wrong";
        console.log("eh salah");
      }
      target_card_data[activeIndex + 1].status = "active";
      const last_tc = target_card_data.splice(1);
      last_tc.push({ key: "", status: "" });
      console.log(last_tc);
      console.log(target_card_data);
      clearTarget();
      for (let i = 6; i >= 0; i--) {
        console.log(i);
        let t = last_tc[i];
        console.log(t);
        const target_card = document.createElement("div");
        target_card.classList.add("target-card");
        if (t.status !== "") {
          target_card.classList.add(t.status);
        }
        target_card.textContent = t.key;
        const target_box = document.querySelector(".target-box");
        target_box.appendChild(target_card);
      }
    }
  });
});
