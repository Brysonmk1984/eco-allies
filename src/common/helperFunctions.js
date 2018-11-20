const lowercaseUnderscore = function(ally){
    return ally.replace(/\s+/g, '_').toLowerCase();
};
const lowercaseDash = function(ally){
    return ally.replace(/\s+/g, '-').toLowerCase();
};

const shuffleArray = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


export { lowercaseUnderscore, lowercaseDash, shuffleArray };