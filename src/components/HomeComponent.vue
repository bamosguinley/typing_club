<script setup>
import { onMounted, ref, watch } from "vue";

// icons
import IconeTime from "./icons/IconeTime.vue";
import IconRestar from "./icons/IconRestar.vue";

// components
import ResultComponent from "./ResultComponent.vue";
import SettingComponent from "@/components/SettingsComponent.vue";
import DriverComponent from "@/components/DriverComponen.vue";

// utils
import { formatTime } from "@/composable/utils2";

// game params
const gameTypes = {
  blocking: "blockingGame",
  noBlocking: "noBlockingGame",
};
const currentGameType = ref("noBlogkingGame");
const timerTypes = {
  timeCounter: "timeCounter",
  countDown: "countDown",
};
const currentTimerType = ref("timeCounter");

// nombre de mots API
const numberOfWordsToFetch = 30;

// tableau de mots
const wordsArray = ref([]);

// décompteurs de temps
const minutes = ref(0);
const seconds = ref(0);
const maxcountDownMinutes = 1; // nombre de muinutes à partir duquel le countDown débute
let timerIntervalId = null;

// variables statistisues
let countWords = ref(0);
let countLetters = ref(0);
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

// car position
const far = ref(0);
const step = ref(0);

//drive ref
const driveRef = ref(null)

/* FONCTIONS */
/** Fonction permettant d'obtenir les mots à travvers un API */
async function getWorlds() {
  fetch(`https://trouve-mot.fr/api/random/${numberOfWordsToFetch}`)
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
              focus: false,
            },
            {
              value: " ",
              letters: [{ char: " ", isRight: "", tentative: 0 }],
              isRight: "",
              tentative: 0,
              type: "space",
              focus: false,
            }
          );
        } else {
          wordsArray.value.push({
            value: word.name,
            letters,
            isRight: "",
            tentative: 0,
            type: "word",
            focus: false,
          });
        }
      });
      // mémoriser le nombre de mot
      countWords.value = wordsArray.value.length;
      wordsArray.value.forEach((word) => {
        countLetters.value += word.letters.length;
      });
    })
    .catch((e) => {
      // s'il n'y a pas la connection
      const sentence =
        "grand exploit fut certainement la manière avec laquelle il osa";
      const data = sentence.split(" ");
      data.forEach((word, index) => {
        const letters = [];

        word.split("").forEach((letter) => {
          letters.push({ char: letter, isRight: "", tentative: 0 });
        });

        if (index !== data.length - 1) {
          wordsArray.value.push(
            {
              value: word,
              letters,
              isRight: "",
              tentative: 0,
              type: "word",
              focus: false,
            },
            {
              value: " ",
              letters: [{ char: " ", isRight: "", tentative: 0 }],
              isRight: "",
              tentative: 0,
              type: "space",
              focus: false,
            }
          );
        } else {
          wordsArray.value.push({
            value: word.name,
            letters,
            isRight: "",
            tentative: 0,
            type: "word",
            focus: false,
          });
        }
      });
      // mémoriser le nombre de mot
      countWords.value = wordsArray.value.length;
      // compter le nombre de lettres
      wordsArray.value.forEach((word) => {
        countLetters.value += word.letters.length;
      });
    });
}

/** défini les réglagles de la partie */
function gameSetting(setting) {
  currentGameType.value = setting.gameType;
  currentTimerType.value = setting.timerType;
  startGame();
}

/** règle le nombre de minute, suspend le défilement provoqué par "espace" puis lance le jeux */
function startGame() {
  minutes.value =
    currentTimerType.value === timerTypes.countDown ? maxcountDownMinutes : 0;
  isGameParamsComponentVisible.value = false;
  window.addEventListener("keydown", stopSpaceKeyScrolling);
  if (currentGameType.value === "blockingGame") {
    document.addEventListener("keydown", startBlockingTyping);
  } else {
    document.addEventListener("keydown", startNoBlockingTyping);
  }
}

/**
 * Démarre un jeux bloqusant.
 * Ne passe pas à la lettre suivante après une frappe incorrecte.
 * N'autorise pas la suppression
 * @param {keyboardEvent} e
 * */
function startBlockingTyping(e) {
  if (!keysToSkip2.includes(e.key)) {
    // Détecter la toute première frappe
    if (startCounter.value < 1) {
      startCounter.value++;
    }

    if (wordsArray.value[wordCount].letters[count].char === e.key) {
      wordsArray.value[wordCount].letters[count].tentative > 0
        ? (wordsArray.value[wordCount].letters[count].isRight =
          "succesAfterManyAttempts")
        : (wordsArray.value[wordCount].letters[count].isRight =
          "successAfterOneAttempt");

      if (count < wordsArray.value[wordCount].letters.length - 1) {
        // si on est pas sur la dernière lettre d'un mot
        count++;
      } else {
        // si on est sur la dernière lettre d'un mot
        wordCount++; // passer le compteur au mot suivant
        count = 0; // réinitialiser le compteur de lettres
      }
      far.value + step.value;
    } else {
      wordsArray.value[wordCount].letters[count].isRight = "failed";
      wordsArray.value[wordCount].letters[count].tentative++;
    }
  }

  const isTooLastLetter =
    wordCount > wordsArray.value.length - 1 && count === 0;
  // si le type de decompte est countDown et qu'il s'est arrêté ou si on est sur la toute dernière lettre
  if (isTooLastLetter) {
    stopTimer();
    stopGame();
  }
}

/**
 * Démarre un jeux non bloqusant.
 * Ne passe pas à la lettre suivante après une frappe incorrecte.
 * Autorise la suppression
 * @param {keyboardEvent} e
 * */
function startNoBlockingTyping(e) {
  // si on appuie sur la touche de suppression
  if (e.key === "Backspace") {
    // à la première lettre, on retire le style lié à isRight sans décrémenter count
    if (wordCount === 0) {
      if (count === 0) {
        wordsArray.value[wordCount].letters[count].isRight = "";
      } else {
        wordsArray.value[wordCount].letters[--count].isRight = "";
      }
      // après le premier caractère on décrémente count puis on retire le style lié à isRight
    } else if (wordCount > 0) {
      if (count === 0) {
        // à la première lettre d'un mot supérieur ou égal au deuxième, à la suppression on retourne sur le mot précédent
        --wordCount;
        count = wordsArray.value[wordCount].letters.length - 1;
        wordsArray.value[wordCount].letters[count].isRight = "";
      } else {
        wordsArray.value[wordCount].letters[--count].isRight = "";
      }
      far.value -= step.value;
    }
  } else {
    // condition de non prises en comptes des touches insensibles
    if (!keysToSkip1.includes(e.key)) {
      // Détecter la toute première frappe
      if (startCounter.value < 1) {
        startCounter.value++;
      }

      // si la bonne lettre est frappée
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
      // si on est pas sur la dernière lettre d'un mot
      if (count < wordsArray.value[wordCount].letters.length - 1) {
        count++;
      } else {
        wordCount++; // passer le compteur au mot suivant
        count = 0; // réinitialiser le compteur de lettres
        if (wordCount < wordsArray.value.length - 1)
          wordsArray.value[wordCount].focus = true;
      }
      far.value += step.value;
    }
  }

  const isTooLastLetter =
    wordCount > wordsArray.value.length - 1 && count === 0;
  // si le type de decompte est countDown et qu'il s'est arrêté ou si on est sur la toute dernière lettre
  if (isTooLastLetter) {
    stopTimer();
    stopGame();
  }
}

function stopTimer() {
  clearInterval(timerIntervalId);
}

function stopGame() {
  // supprimer les écouteurs d'évênements
  if (currentGameType === gameTypes.blocking) {
    document.removeEventListener("keydown", startBlockingTyping);
  } else {
    document.removeEventListener("keydown", startNoBlockingTyping);
  }
  document.removeEventListener("keydown", stopSpaceKeyScrolling);
  // Afficher le composant ResultComponent après la dernière frappe
  displayResult();
}

/** Compte le temps en minutes et en secondes */
function timer() {
  timerIntervalId = setInterval(() => {
    if (seconds.value === 60) {
      minutes.value++;
      seconds.value = 0;
    } else if (seconds.value < 60) {
      seconds.value++;
    }
  }, 1000);
}

/** Lance un Compte à Rebours */
function countDown() {
  const isTimeOut = seconds.value === 0 && minutes.value === 0;
  timerIntervalId = setInterval(() => {
    if (isTimeOut) {
      stopTimer();
      stopGame();
    } else {
      if (seconds.value > 0) {
        seconds.value--;
      } else if (seconds.value === 0) {
        minutes.value--;
        seconds.value = 60;
      }
    }
  }, 1000);
}

/** Renvoie le nombre de mots tapés */
function countTypedWords() {
  if (currentTimerType.value === timerTypes.countDown) {
    const nwords = wordCount + 1;
    return (nwords + 1) / 2;
  } else {
    const nwords = (countWords.value + 1) / 2;
    return nwords;
  }
}

/** calcule la précision */
function getPrecision() {
  //statistiques
  const attempts = [];
  wordsArray.value.forEach((word) => {
    // reccuillir les tentatives
    word.letters.forEach((l) => {
      attempts.push(l.tentative);
    });
    // compter le nombre de lettres
    countLetters.value += word.letters.length;
  });
  // compter les tentatives
  countAttempts = attempts.reduce((acc, curr) => acc + curr, 0);
  if (Math.floor(((countLetters.value - countAttempts) / countLetters.value) * 100) > 0) {
    return Math.floor(((countLetters.value - countAttempts) / countLetters.value) * 100);
  }
  return 0;
}

/** calcule la vitesse */
function getSpeed() {
  const isCountDown = currentTimerType.value === timerTypes.countDown;
  if (isCountDown) {
    const countMinutes = minutes.value + seconds.value / 60;
    const secs = (maxcountDownMinutes - countMinutes) * 60;
    const speed = Math.floor(
      countTypedWords() / (maxcountDownMinutes - countMinutes)
    );
    minutes.value = parseInt(secs / 60);
    seconds.value = (secs / 60 - parseInt(secs / 60)) * 60;
    return speed;
  } else {
    const countMinutes = minutes.value + seconds.value / 60;
    return Math.floor(countTypedWords() / countMinutes);
  }
}

/** affiche le composant ResultComponent */
function displayResult() {
  resultData.value.precision = getPrecision();
  resultData.value.speed = getSpeed();
  resultData.value.time = `${formatTime(minutes.value)} min ${formatTime(
    seconds.value
  )} s`;
  isResultVisible.value = true;
}

/** empêche défilement à la frappe de la touche Space */
function stopSpaceKeyScrolling(e) {
  if (e.code == "Space" && e.target == document.body) {
    e.preventDefault();
  }
}

// lance le time counter à la première frappe
watch(startCounter, () => {
  if (currentTimerType.value === "countDown") {
    countDown();
  } else {
    timer();
  }
});

onMounted(() => {
  getWorlds();
});
</script>
<template>
  <div>
    <div v-if="isGameParamsComponentVisible">
      <SettingComponent @emitGameSettings="gameSetting" />
    </div>
    <div v-else>
      <div v-if="isResultVisible">
        <ResultComponent :data="resultData" />
      </div>
      <div v-else>
        <p class="start-text-container">
          <span v-show="!startCounter">Commencez à taper</span>
        </p>
        <div class="container">
          <div class="text-container" ref="textContainersRef">
            <DriverComponent :far="far" ref="driveRef" :countLetters="countLetters" @emitStep="(data) => step = data" />
          </div>
          <div class="text-container" ref="textContainersRef">
            <p v-for="(word, index) in wordsArray" :key="index" :class="{ wordFocus: word.focus }">
              <span v-for="(letter, i) in word.letters" :key="i" :class="{
                spaceClass: letter.char === ' ',
                letterClass: true,
                letterRight: letter.isRight === 'successAfterOneAttempt',
                letterWrong: letter.isRight === 'failed',
                letterRepeat: letter.isRight === 'succesAfterManyAttempts',
              }">
                {{ letter.char }}
              </span>
            </p>
          </div>
        </div>
        <p class="start-text-container">
          <IconeTime /><br />
          <span>{{ formatTime(minutes) + " : " + formatTime(seconds) }}</span>
        </p>
        <p class="restar-btn-container">
          <a href="">
            <IconRestar />
          </a>
        </p>
        <p class="game-type">
          {{
            currentGameType === gameTypes.blocking
              ? "BLOCKING GAME"
              : "NO-BLOCKING GAME "
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-type {
  margin: 20px;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
}

.start-text-container {
  text-align: center;
}

.start-text-container span {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 8px;
  font-weight: bold;
  display: inline-block;
  color: #fff;
  background-color: #0275d8;
}

.container {
  line-height: 70px;
  font-size: 50px;
  width: 90%;
  margin: 0 auto;
  height: fit-content;
  box-shadow: 5px 5px 12px gray;
  background-color: #fff;
}

.wordFocus {
  background-color: #00000015;
}

.spaceClass {
  content: " ";
  padding: 0;
  padding-inline: 10px !important;

  width: 10px;
}

.letterClass {
  padding-inline: 3px;
  padding-bottom: 0;
  margin-left: 2px;
}

.letterRight {
  color: green;
  background-color: rgba(172, 255, 47, 0.3);
  border-bottom: 3px solid rgb(120, 185, 23);
  box-shadow: 1px 1px 1px;
}

.letterWrong {
  color: red;
  background-color: rgba(255, 0, 0, 0.3);
  border-bottom: 3px solid red;
  box-shadow: 1px 1px 1px;
}

.letterRepeat {
  color: orange;
  background-color: rgba(255, 166, 0, 0.3);
  border-bottom: 3px solid orange;
  box-shadow: 1px 1px 1px;
}

.text-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.text-container p {
  margin: 0;
}

.result-container h4 {
  text-decoration: double;
}

.result-container span {
  color: rgb(31, 190, 31);
}

.restar-btn-container {
  text-align: center;
}

.restar-btn-container a:hover {
  opacity: 0.7;
}
</style>
