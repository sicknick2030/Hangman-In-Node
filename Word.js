function checkForLetter(letter, word){

  // Check if the letter is in the word
  if(word.indexOf(letter) != -1){
    return true;
  }
  else{
    return false;
  }

}



// Export the function
module.exports = checkForLetter;


// var Letters = require("./Letters.js")

//  function Word(target) {
// 	this.target = target;
// 	this.letters = [];
// 	this.found = false;

// 	this.getLet = function() {
// 		for (var i=0; i < this.target.length; i++) {
// 			this.letters.push(this.target[i]);
// 		}
// 	};

// 	this.findWord = function() {
// 		this.found = this.letters.every(function(currLett) {
// 			return currLett.show;
// 		});
// 		return this.found;
// 	};

// 	this.checkLetter = function(guessLet) {
// 		var toReturn = 0;

// 		for (var i = 0; i < this.letters.length; i++) {
// 			if (this.letters[i].value == guessLet){
// 				this.letters[i].appear = true;
// 				toReturn++;
// 			}
// 		}
// 		return toReturn;
// 	};

// 	this.wordRender = function() {
// 		var string = '';
// 		for (var i=0; i < this.letters.length; i++){
// 			string += this.letters[i].letterRender();
// 		}
// 		return string;

// 	};

// }


// module.exports = Word;

// var word1 = new Word()
// word1.wordRender()
