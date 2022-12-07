let casovi = [
  {
    cas: 1,
    start: "07:30:00",
    end: "08:15:00",
  },

  {
    cas: 2,
    start: "08:20:00",
    end: "09:05:00",
  },
  {
    cas: 3,
    start: "09:25:00",
    end: "10:10:00",
  },
  {
    cas: 4,
    start: "10:15:00",
    end: "11:00:00",
  },
  {
    cas: 5,
    start: "11:10:00",
    end: "11:50:00",
  },
  {
    cas: 6,
    start: "11:55:00",
    end: "12:35:00",
  },
  {
    cas: 7,
    start: "12:40:00",
    end: "13:15:00",
  },
  {
    cas: 1,
    start: "13:30:00",
    end: "14:15:00",
  },
  {
    cas: 2,
    start: "14:20:00",
    end: "15:05:00",
  },
  {
    cas: 3,
    start: "15:25:00",
    end: "16:10:00",
  },
  {
    cas: 4,
    start: "16:15:00",
    end: "17:00:00",
  },
  {
    cas: 5,
    start: "17:10:00",
    end: "17:50:00",
  },
  {
    cas: 6,
    start: "17:55:00",
    end: "18:35:00",
  },
  {
    cas: 7,
    start: "18:40:00",
    end: "19:15:00",
  },
];
let casoviSkrPo5 = [
  {
    cas: 1,
    start: "07:30:00",
    end: "08:10:00",
  },

  {
    cas: 2,
    start: "08:15:00",
    end: "08:55:00",
  },
  {
    cas: 3,
    start: "09:15:00",
    end: "09:55:00",
  },
  {
    cas: 4,
    start: "10:00:00",
    end: "10:40:00",
  },
  {
    cas: 5,
    start: "10:50:00",
    end: "11:30:00",
  },
  {
    cas: 6,
    start: "11:35:00",
    end: "12:15:00",
  },
  {
    cas: 7,
    start: "12:20:00",
    end: "13:00:00",
  },
  {
    cas: 1,
    start: "13:30:00",
    end: "14:10:00",
  },
  {
    cas: 2,
    start: "14:15:00",
    end: "14:55:00",
  },
  {
    cas: 3,
    start: "15:15:00",
    end: "15:55:00",
  },
  {
    cas: 4,
    start: "16:00:00",
    end: "16:40:00",
  },
  {
    cas: 5,
    start: "16:50:00",
    end: "17:30:00",
  },
  {
    cas: 6,
    start: "17:35:00",
    end: "18:15:00",
  },
  {
    cas: 7,
    start: "18:20:00",
    end: "19:00:00",
  },
];
let casoviSkrPo10 = [
  {
    cas: 1,
    start: "07:30:00",
    end: "08:05:00",
  },

  {
    cas: 2,
    start: "08:10:00",
    end: "09:45:00",
  },
  {
    cas: 3,
    start: "09:05:00",
    end: "09:40:00",
  },
  {
    cas: 4,
    start: "09:45:00",
    end: "10:20:00",
  },
  {
    cas: 5,
    start: "10:30:00",
    end: "11:05:00",
  },
  {
    cas: 6,
    start: "11:10:00",
    end: "11:45:00",
  },
  {
    cas: 7,
    start: "11:50:00",
    end: "12:25:00",
  },
  {
    cas: 1,
    start: "13:30:00",
    end: "14:05:00",
  },
  {
    cas: 2,
    start: "14:10:00",
    end: "14:45:00",
  },
  {
    cas: 3,
    start: "15:05:00",
    end: "15:45:00",
  },
  {
    cas: 4,
    start: "15:50:00",
    end: "16:25:00",
  },
  {
    cas: 5,
    start: "16:30:00",
    end: "17:05:00",
  },
  {
    cas: 6,
    start: "17:10:00",
    end: "17:45:00",
  },
  {
    cas: 7,
    start: "17:50:00",
    end: "18:25:00",
  },
];
let counter;
let currentCas;
let videoFlag = 1;
function init(hours) {
  counter = setInterval(function () {
    let date = new Date();
    let fulltime = date.getTime();
    let month = date.toLocaleString("default", { month: "short" });

    let day = date.getDate();

    let year = date.getFullYear();

    let midnight = new Date(`${month} ${day}, ${year} 00:00:00`).getTime();

    let currentTime = fulltime - midnight;
    console.log(currentTime, "momentalno vreme");

    let casoviInMilisecons = hours.map((item) => {
      let container = {};
      container.cas = item.cas;
      container.start =
        new Date(`${month} ${day}, ${year} ${item.start}`).getTime() - midnight;
      container.end =
        new Date(`${month} ${day}, ${year} ${item.end}`).getTime() - midnight;
      return container;
    });

    let currentCas = casoviInMilisecons.find((cas) => {
      return currentTime >= Number(cas.start) && currentTime <= Number(cas.end);
    });

    console.log("currentCas", currentCas);

    if (currentCas) {
      console.log("currentCas", currentCas);
      let diff = currentCas.end - currentTime;

      console.log(diff);
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      casPause.innerHTML = `ЧАС-${currentCas.cas}`;
      minutesEl.textContent = minutes >= 10 ? minutes : `0${minutes}`;
      secondsEl.innerHTML = seconds >= 10 ? seconds : `0${seconds}`;

      if (minutes <= 1 && diff > 0) {
        if (videoFlag == 1) {
          form.classList.add("hide");
          playVideo();
        }
      } else if (diff <= 0) {
        displayPause();
      }
    } else {
      stopVideo();
      form.classList.remove("hide");
      displayPause();
    }
  }, 1000);
}

function displayPause() {
  casPause.innerHTML = "ПАУЗА";
}
function playVideo() {
  videoFlag = 0;

  console.log("se ukluci video");
  frame.innerHTML = `<video width="100%" height="100%" autoplay muted controls id="video">
  <source src="MladenDelic.mp4" type="video/mp4" />
</video>`;
}
function stopVideo() {
  frame.innerHTML = "";
  videoFlag = 1;
}

const minutesEl = document.querySelector(".min");
const secondsEl = document.querySelector(".sec");
const casPause = document.querySelector(".cas-pauza");

const frame = document.querySelector(".frame");
const form = document.querySelector("form");
console.log(form.hourLength.value);

form.addEventListener("change", () => {
  clearInterval(counter);
  if (form.hourLength.value == "10") {
    init(casoviSkrPo10);
  } else if (form.hourLength.value == "5") {
    init(casoviSkrPo5);
  } else init(casovi);
});
init(casovi);
