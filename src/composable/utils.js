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

export function setString(String) {

}