import data from './data'
/*
*Récuperation des mots de façon aléatoire 
*/
export function getWord(position, nombreMot) {
  position = Math.floor(Math.random() * 100);
  for (let i = position; i < data.length; i++) {
    if (data[i] === " ") {
      count.value++;
      console.log(count.value);
    }
    if (count <= nombreMot) {
      data2.value += data[i];
    }
  }
  console.log(data2.value);
}

getWord(5, 10);



const myWords = ["chat", "chien", "oiseau", "fleur"];



function getRandomWord(wordsArray) {
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  return wordsArray[randomIndex];
}
 

// Appel de la fonction au chargement de la page
window.addEventListener("load", () => {
  const randomWord = getRandomWord(myWords);
  console.log("Mot aléatoire au chargement de la page :", randomWord);
});


function storeRandomWord(word) {
  localStorage.setItem("randomWord", word);
}

// Appel de la fonction lors de la génération du mot aléatoire
const newRandomWord = getRandomWord(myWords);
storeRandomWord(newRandomWord);


window.addEventListener("load", () => {
  const storedRandomWord = localStorage.getItem("randomWord");
  console.log("Mot aléatoire précédent :", storedRandomWord);
});


export function setString(String) {

}