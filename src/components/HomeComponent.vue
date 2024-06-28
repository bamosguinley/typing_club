<script setup>
import { onMounted, ref, watch } from "vue";
import IconeTime from "./icons/IconeTime.vue";
import ResultComponent from "./ResultComponent.vue";
import PageDeBord from "./PageDeBord.vue";

const words = ref("");
const lettersArray = ref([]);

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
const currentTimerType = ref("free")


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
const keysToSkip2 = ["Shift", "CapsLock", "Dead", "Control", "Alt", "Backspace"];

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
async function getWorlds() {
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

function setGameType(b) {
  currentGameType.value =
    b === "blocking" ? gameTypes.blocking : gameTypes.noBlocking;
}

function setTimerType(c) {
  currentTimerType.value =
    c === "chrono" ? timerTypes.chrono : timerTypes.free;
}

/** règle le nombre de minute, suspend le défilement provoqué par "espace" puis lance le jeux */
function startGame() {
  minutes.value = currentTimerType.value === timerTypes.chrono ? fixedMaxChrono : 0
  isGameParamsComponentVisible.value = false
  window.addEventListener("keydown", stopSpaceKeyScrolling);
  if (currentGameType.value === "blockingGame") {
    document.addEventListener("keydown", startBlockingTyping);
  } else {
    document.addEventListener("keydown", startNoBlockingTyping);
  }
}

/** Formate le temps effectué en un format mm:ss */
function formatTime(t) {
  if (t < 10) {
    return `0${t}`;
  }
  return t;
}

/** initie un jeux bloqusant */
function startBlockingTyping(e) {
  if (currentTimerType.value === timerTypes.chrono && minutes.value == 0 && seconds.value == 0) {
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
function startNoBlockingTyping(e) {
  if (currentTimerType.value === timerTypes.chrono && minutes.value == 0 && seconds.value == 0) {
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
function timer() {
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
function chrono() {
  const intervalId = setInterval(() => {
    if (seconds.value === 0 && minutes.value === 0) {
      clearInterval(intervalId)
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
function getOfTypedWordsNumber() {
  return wordCount
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
function getSpeed() {
  if (currentTimerType.value === timerTypes.chrono) {
    const countMinutes = minutes.value + seconds.value / 60;
    const secs = (fixedMaxChrono - countMinutes) * 60
    minutes.value = 0;
    seconds.value = secs
    return Math.floor(getOfTypedWordsNumber() / fixedMaxChrono - countMinutes);
  } else {
    const countMinutes = minutes.value + seconds.value / 60;
    return Math.floor(getOfTypedWordsNumber() / countMinutes);
  }
}

// affiche le composant ResultComponent
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

// lance le counter à la première frappe
watch(startCounter, () => {
  // application du type de tymer
  if (currentTimerType.value === "chrono") {
    chrono();
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
    <div v-if="isGameParamsComponentVisible" class="params-container">
      <h2>Choisir paramètres du jeux {{ currentGameType }}</h2>
      <div class="radios-groupes-container">
        <div>
          <h3>Type de jeux</h3>
          <input type="radio" id="noBlogking" value="noBlogkingGame" v-model="currentGameType">
          <label for="noBlogking">Non Bloquant</label>
          <br>
          <input type="radio" id="blocking" value="blockingGame" v-model="currentGameType">
          <label for="blocking">Bloquant</label>
        </div>
        <div>
          <h3>Type de décompte : {{ currentTimerType }} </h3>
          <input type="radio" id="free" value="free" v-model="currentTimerType">
          <label for="free">Libre</label>
          <br>
          <input type="radio" id="chrono" value="chrono" v-model="currentTimerType">
          <label for="chrono">Chrono</label>
        </div>
      </div>
      <p class="start-text-container">
        <button @click="startGame" style="cursor: pointer;">Valider</button>
      </p>
    </div>
    <div v-else>
      <div v-if="isResultVisible">
        <!-- resultData est l'objet contenant la vitesse, la précision et la durée de la session -->
        <ResultComponent :data="resultData" />
      </div>
      <div v-else>
        <p class="start-text-container">
          <span v-show="!startCounter">Commencez à taper</span>
        </p>
        <div class="container">
          <div class="text-container" ref="textContainersRef">
            <p v-for="(word, index) in wordsArray" :key="index">
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
        <p class="game-type">{{ currentGameType === gameTypes.blocking ? "BLOCKING GAME" : "NO-BLOCKING GAME" }} </p>
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

.params-container {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
}

.params-container button {
  font-size: 20px;
  padding: 8px;
  font-weight: bold;
  color: #fff;
  border: none;
  background-color: #0275d8;
}

.params-container button:hover {
  opacity: 0.9;
}

.radios-groupes-container label {
  margin-bottom: 20px;
  font-size: 16px;
  padding: 5px;
  cursor: pointer;
  color: #fff;
  border: none;
  background-color: #0275d8;
}

.radios-groupes-container input {
  margin-bottom: 20px;
  padding: 5px;
  width: 100px;
  cursor: pointer;
}
</style>
