// const targetArray = ["g", "a", "g", "a", "g", "g","a","g", "g","a"];
// let arrayIndex = 0;

// const historyArray = [];

// const array1 = [targetArray.slice(arrayIndex, arrayIndex+3)]
// const array2 = historyArray.slice(3)
// const combined_array = [...array1, array2];

// document.getElementById("clap").addEventListener("click",(event) => {
//     makeSound("a")
// })
var started = false;


document.getElementById("gameStart").addEventListener("click", function(){
    if(!started){
        function startTimer(duration){
            let current_time = 59;
            setInterval(() =>{
                const timer_id = document.getElementById("timer");
                timer_id.textContent = formatTime(current_time);
                current_time--;
                if(current_time < duration){
                    clearInterval(interval_id);
                }
            }, 1000);
        }
        
        // time:secs 00:00
        function formatTime(time){
            minutes = ("0" + Math.floor(time/60)).substr(-2);
            seconds = ("0" + Math.floor(time % 60)).substr(-2);
            return `${minutes}:${seconds}`;
        }
        
        startTimer();
        started = true;

    }

});
document.addEventListener("keydown", function (event) {
    makeSound(event.key);
    console.log(event.key);
    const activeIndex = target_data_card.findIndex(function (element) {
    return element.status == "active";
    });
    console.log(target_data_card);
    if (activeIndex !== -1) {
    if (event.key.toUpperCase() == target_data_card[activeIndex].key) {
    target_data_card[activeIndex].status = "correct";
    } else {
    target_data_card[activeIndex].status = "wrong";
    }
    target_data_card[activeIndex - 1].status = "active";
    
    const last_target_data_card = target_data_card.splice(
    target_data_card.length - 1,
    1
    )[0];
    target_data_card.unshift(last_target_data_card);
    
    clearTarget();
    updateTarget();
    }
    });

// document.addEventListener("keydown", function(event){
//     if (event.key === targetArray[arrayIndex]){
//         arrayIndex++;
//         console.log(arrayIndex);
//     }
//     historyArray.push(event.key);
//     makeSound(event.key);
//     // console.log(event.key);
// })

function makeSound(key){
    switch (key){
        case "a":
            var clap = new Audio('sounds/clap.wav')
            clap.play();
            break;
        case "s":
            var hiHat = new Audio('sounds/hi_hat.wav')
            hiHat.play();
            break;
        case "d":
            var kick = new Audio('sounds/kick.wav')
            kick.play();
            break;
        case "f":
            var openHat = new Audio('sounds/open_hat.wav')
            openHat.play();
            break;
        case "g":
            var boom = new Audio('sounds/boom.wav')
            boom.play();
            break;
        case "h":
            var ride = new Audio('sounds/ride.wav')
            ride.play();
            break;
        case "j":
            var snare = new Audio('sounds/snare.wav')
            snare.play();
            break;
        case "k":
            var tom = new Audio('sounds/tom.wav')
            tom.play();
            break;
        case "l":
            var tink = new Audio('sounds/tink.wav')
            tink.play();
            break;

       default:  
            
    }
}



// function startTimer(duration){
//     let current_time = 1;
//     setInterval(() =>{
//         const timer_id = document.getElementById("timer");
//         timer_id.textContent = formatTime(current_time);
//         current_time++;
//         if(current_time > duration){
//             clearInterval(interval_id);
//         }
//     }, 1000);
// }

// // time:secs 00:00
// function formatTime(time){
//     minutes = ("0" + Math.floor(time/60)).substr(-2);
//     seconds = ("0" + Math.floor(time % 60)).substr(-2);
//     return `${minutes}:${seconds}`;
// }

// startTimer();

function clearTarget(){
    const target_box = document.querySelector(".target-box");
    target_box.querySelectorAll("*").forEach((e) => e.remove());
    
}
const target_data_card = [
    {
      key: "A",
      status: "",
    },
    {
      key: "G",
      status: "",
    },
    {
      key: "A",
      status: "",
    },
    {
      key: "G",
      status: "active",
    },
    {
      key: "G",
      status: "",
    },
    {
      key: "G",
      status: "",
    },
    {
      key: "A",
      status: "",
    },
  ];

  function updateTarget() {
    target_data_card.forEach((t) => {
      // <div></div>
      const target_card = document.createElement("div");
      // <div class="target-card"></div>
      target_card.classList.add("target-card");
      if (t.status !== "") {
        // <div class="target-card active"></div>
        target_card.classList.add(t.status);
      }
  
      // <div class="target-card active">A</div>
      target_card.textContent = t.key;
  
      // <div class="target-container">
      //    <div class="target-card active">A</div>
      // </div>
      const target_box = document.querySelector(".target-box");
      target_box.appendChild(target_card);
    });
  }
  
  clearTarget();
  updateTarget();

  function startOver(){
      current_time = 59;
      started=false;
  }
  


























// var numberOfAlphabets = document.querySelectorAll(".key-card").length

// for (var i = 0; i < numberOfAlphabets; i++){
//     document.querySelectorAll(".key-card")[i].addEventListener("click", handleClick);
// }

// function handleClick(){
//     var buttonInnerHTML = this.innerHTML;
//     makeSound(buttonInnerHTML);

// }