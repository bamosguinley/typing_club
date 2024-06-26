import data from './data'

function getWord(position, nombreMot) {
    position = Math.floor(Math.random() * 100);
    let data2 = [];
    for (let i = position; i < data.length; i++) {
      data2 += data[i];
    }
    console.log(data2);
  }
  
  getWord(5, 8);
getWord(5,8)