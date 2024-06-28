// game params
const gameTypes = {
  blocking: "blockingGame",
  noBlocking: "noBlockingGame",
};
const currentGameType = ref("noBlogkingGame");
const timerTypes = {
  free: "free",
  chrono: "chrono",
};
const currentTimerType = ref("free");

// tableau de mots
const wordsArray = ref([]);

// décompteurs de temps
const fixedMaxChrono = 1; // nombre de muinutes à partir duquel le chrono débute
const minutes = ref(0);
const seconds = ref(0);

// variables statistisues
let countWords = ref();
let countletters = 0;
let countAttempts = 0;

// touches insensibles
const keysToSkip1 = ["Shift", "CapsLock", "Dead", "Control", "Alt"];
const keysToSkip2 = [
  "Shift",
  "CapsLock",
  "Dead",
  "Control",
  "Alt",
  "Backspace",
];

// position de la lettre courante
let count = 0;
// position du mot courant
let wordCount = 0;

// indique la premmière frappe
let startCounter = ref(0);

const isGameParamsComponentVisible = ref(true);
const isResultVisible = ref(false);
const resultData = ref({
  precision: 0,
  speed: 0,
  time: 0,
});

/* FONCTIONS */
/** Fonction permettant d'obtenir les mots à travvers un API */
export async function getWorlds() {
  fetch("https://trouve-mot.fr/api/random/20")
    .then((response) => response.json())
    .then((data) => {
      // retourne les mots sous forme d'objets dans le tableau wordsArray
      data.forEach((word, index) => {
        const letters = [];

        word.name.split("").forEach((letter) => {
          letters.push({ char: letter, isRight: "", tentative: 0 });
        });

        if (index !== data.length - 1) {
          wordsArray.value.push(
            {
              value: word.name,
              letters,
              isRight: "",
              tentative: 0,
              type: "word",
            },
            {
              value: " ",
              letters: [{ char: " ", isRight: "", tentative: 0 }],
              isRight: "",
              tentative: 0,
              type: "space",
            }
          );
        } else {
          wordsArray.value.push({
            value: word.name,
            letters,
            isRight: "",
            tentative: 0,
            type: "word",
          });
        }
      });
      // mémoriser le nombre de mot
      countWords = wordsArray.value.length;
    });
}

/** règle le nombre de minute, suspend le défilement provoqué par "espace" puis lance le jeux */
export function startGame() {
  minutes.value =
    currentTimerType.value === timerTypes.chrono ? fixedMaxChrono : 0;
  isGameParamsComponentVisible.value = false;
  window.addEventListener("keydown", stopSpaceKeyScrolling);
  if (currentGameType.value === "blockingGame") {
    document.addEventListener("keydown", startBlockingTyping);
  } else {
    document.addEventListener("keydown", startNoBlockingTyping);
  }
}

/** Formate le temps effectué en un format mm:ss */
export function formatTime(t) {
  if (t < 10) {
    return `0${t}`;
  }
  return t;
}

/** initie un jeux bloqusant */
export function startBlockingTyping(e) {
  if (
    currentTimerType.value === timerTypes.chrono &&
    minutes.value == 0 &&
    seconds.value == 0
  ) {
    document.removeEventListener("keydown", startBlockingTyping);
    document.removeEventListener("keydown", stopSpaceKeyScrolling);
    displayResult();
    return;
  }
  // Détecter la toute première frappe
  if (startCounter.value < 1) {
    startCounter.value++;
  }
  if (
    wordCount === wordsArray.value.length - 1 &&
    count === wordsArray.value[wordsArray.value.length - 1].letters.length - 1
  ) {
    // supprimer les écouteurs d'évênements
    document.removeEventListener("keydown", startBlockingTyping);
    document.removeEventListener("keydown", stopSpaceKeyScrolling);
    // Afficher le composant ResultComponent après la dernière frappe
    displayResult();
  } else {
    if (!keysToSkip2.includes(e.key)) {
      if (wordsArray.value[wordCount].letters.length !== count) {
        if (wordsArray.value[wordCount].letters[count].char === e.key) {
          wordsArray.value[wordCount].letters[count].tentative > 0
            ? (wordsArray.value[wordCount].letters[count].isRight =
                "succesAfterManyAttempts")
            : (wordsArray.value[wordCount].letters[count].isRight =
                "successAfterOneAttempt");
          count++;
        } else {
          wordsArray.value[wordCount].letters[count].isRight = "failed";
          wordsArray.value[wordCount].letters[count].tentative++;
        }
      } else {
        wordCount++;
        count = 0;
        if (wordsArray.value[wordCount].letters[count].char === e.key) {
          wordsArray.value[wordCount].letters[count].isRight =
            "successAfterOneAttempt";
          count++;
        } else {
          wordsArray.value[wordCount].letters[count].isRight = "failed";
          wordsArray.value[wordCount].letters[count].tentative++;
        }
      }
    }
  }
}

/** initie un jeux non bloquant */
export function startNoBlockingTyping(e) {
  if (
    currentTimerType.value === timerTypes.chrono &&
    minutes.value == 0 &&
    seconds.value == 0
  ) {
    document.removeEventListener("keydown", startBlockingTyping);
    document.removeEventListener("keydown", stopSpaceKeyScrolling);
    displayResult();
    return;
  }
  // Détecter la toute première frappe
  if (startCounter.value < 1) {
    startCounter.value++;
  }
  if (
    wordCount === wordsArray.value.length - 1 &&
    count === wordsArray.value[wordsArray.value.length - 1].letters.length - 1
  ) {
    // supprimer les écouteurs d'évênements
    document.removeEventListener("keydown", startBlockingTyping);
    document.removeEventListener("keydown", stopSpaceKeyScrolling);
    console.log("CEST LA FIN", wordsArray.value);
    // Afficher le composant ResultComponent après la dernière frappe
    displayResult();
  } else {
    // condition de suppression
    if (e.key === "Backspace") {
      // à la première lettre, on retire le style lié à isRight sans décrémenter count
      if (wordCount === 0 && count === 0) {
        wordsArray.value[wordCount].letters[count].isRight = "";
        console.log("count", count);
        console.log(
          "element suppr",
          wordsArray.value[wordCount].letters[count].char
        );
        // après le premier caractère on décrémente count puis on retire le style lié à isRight
      } else {
        if (count !== 0) {
          wordsArray.value[wordCount].letters[--count].isRight = "";
          console.log("count", count);
          console.log(
            "element suppr",
            wordsArray.value[wordCount].letters[count].char
          );
        }
      }
    } else {
      if (!keysToSkip1.includes(e.key)) {
        // consition de non prises en comptes des touches insensibles
        if (wordsArray.value[wordCount].letters.length !== count) {
          if (wordsArray.value[wordCount].letters[count].char === e.key) {
            wordsArray.value[wordCount].letters[count].tentative > 0
              ? (wordsArray.value[wordCount].letters[count].isRight =
                  "succesAfterManyAttempts")
              : (wordsArray.value[wordCount].letters[count].isRight =
                  "successAfterOneAttempt");
          } else {
            wordsArray.value[wordCount].letters[count].isRight = "failed";
            wordsArray.value[wordCount].letters[count].tentative++;
          }
          count++;
        } else {
          wordCount++;
          count = 0;
          if (wordsArray.value[wordCount].letters[count].char === e.key) {
            wordsArray.value[wordCount].letters[count].isRight =
              "successAfterOneAttempt";
            count++;
          } else {
            wordsArray.value[wordCount].letters[count].isRight = "failed";
            wordsArray.value[wordCount].letters[count].tentative++;
          }
        }
      }
    }
  }
}

/** compte le temps en minutes et en secondes */
export function timer() {
  const intervalId = setInterval(() => {
    if (seconds.value === 60) {
      minutes.value++;
      seconds.value = 0;
    } else if (seconds.value < 60) {
      seconds.value++;
    }
    if (count === lettersArray.value.length - 1) clearInterval(intervalId);
  }, 1000);
}

/**  */
export function chrono() {
  const intervalId = setInterval(() => {
    if (seconds.value === 0 && minutes.value === 0) {
      clearInterval(intervalId);
    } else {
      if (seconds.value > 0) {
        seconds.value--;
      } else if (seconds.value === 0) {
        minutes.value--;
        seconds.value = 59;
      }
    }
  }, 1000);
}

/** compte le nombre de mots tapés */
export function getOfTypedWordsNumber() {
  return wordCount;
}

/** calcule la précision */
export function getPrecision() {
  //statistiques
  const attempts = [];
  wordsArray.value.forEach((word) => {
    // reccuillir les tentatives
    word.letters.forEach((l) => {
      attempts.push(l.tentative);
    });
    // compter le nombre de lettres
    countletters += word.letters.length;
  });

  // compter les tentatives
  countAttempts = attempts.reduce((acc, curr) => acc + curr, 0);
  if (Math.floor(((countletters - countAttempts) * 100) / countletters) > 0) {
    return Math.floor(((countletters - countAttempts) * 100) / countletters);
  }
  return 0;
}

/** calcule la vitesse */
export function getSpeed() {
  if (currentTimerType.value === timerTypes.chrono) {
    const countMinutes = minutes.value + seconds.value / 60;
    const secs = (fixedMaxChrono - countMinutes) * 60;
    minutes.value = 0;
    seconds.value = secs;
    return Math.floor(getOfTypedWordsNumber() / fixedMaxChrono - countMinutes);
  } else {
    const countMinutes = minutes.value + seconds.value / 60;
    return Math.floor(getOfTypedWordsNumber() / countMinutes);
  }
}

// affiche le composant ResultComponent
export function displayResult() {
  resultData.value.precision = getPrecision();
  resultData.value.speed = getSpeed();
  resultData.value.time = `${formatTime(minutes.value)} min ${formatTime(
    seconds.value
  )} s`;
  isResultVisible.value = true;
}

/** empêche défilement à la frappe de la touche Space */
export function stopSpaceKeyScrolling(e) {
  if (e.code == "Space" && e.target == document.body) {
    e.preventDefault();
  }
}
