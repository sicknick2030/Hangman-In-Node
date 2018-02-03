
var inquirer = require('inquirer');
var guessWordList = require('./index.js');
var checkForLetter = require('./Word.js');
var lettersToDisplay = require('./Letters.js');

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];      
var displayHangman;

var game = {

  wordBank : guessWordList, 
  guessesRemaining : 10, 
  currentWrd : null, 


  startGame : function(){
    
    this.guessesRemaining = 10;

    
    var i = Math.floor(Math.random() * this.wordBank.length);
    this.currentWrd = this.wordBank[i];


    console.log('*************************************************************************');
    console.log('');
    console.log('Do you Like the NBA? Because if you do, this hangman game should be easy!');
    console.log('');
    console.log('*************************************************************************');
    console.log('');
    displayHangman = new lettersToDisplay(this.currentWrd);
    displayHangman.parseDisplay();
    console.log('Guesses Left: ' + game.guessesRemaining);
    // console.log(`${displayHangman.parseDisplay()}    Guesses left: ${game.guessesRemaining}`)

    
    keepPromptingUser();
  }

};




function keepPromptingUser(){

  
  console.log('');
  console.log('');

  
  if(game.guessesRemaining > 0){
	    inquirer.prompt([
	      {
	        type: "value",
	        name: "letter",
	        message: "Guess a Letter: "
	      }
	    ]).then(function(userInput){

	      
	      var inputLetter = userInput.letter.toLowerCase();
	      
	      
	      if(alphabet.indexOf(inputLetter) == -1){

	        
	        console.log('Sorry but, "' + inputLetter + '" is not a letter. Try again!');
	        console.log('Guesses Left: ' + game.guessesRemaining);
	        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
	        keepPromptingUser();

	      }
	      else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

	        // Tell user they already guessed that letter
	        console.log('You already guessed "' + inputLetter + '". Try again!');
	        console.log('Guesses Left: ' + game.guessesRemaining);
	        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
	        keepPromptingUser();

	      }
	      else{

	        
	        lettersAlreadyGuessed.push(inputLetter);
	        var letterInWord = checkForLetter(inputLetter, game.currentWrd);
	        if(letterInWord){
	          lettersCorrectlyGuessed.push(inputLetter);
	          displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
	          displayHangman.parseDisplay();

	            if(displayHangman.winner){
	            console.log('You win!!');
	            askToPlayAgain();
	          }
	          
	          else{
	            console.log('Guesses Left: ' + game.guessesRemaining);
	            console.log('Letters already guessed: ' + lettersAlreadyGuessed);
	            keepPromptingUser();
	          }

	        }
	        
	        else{
	          game.guessesRemaining--;
	          displayHangman.parseDisplay();
	          console.log('Guesses Left: ' + game.guessesRemaining);
	          console.log('Letters already guessed: ' + lettersAlreadyGuessed);
	          keepPromptingUser();
	        }
	        
	      }

	    });
  	}
  
  else{
    console.log('Sorry. You Loose');
    console.log('The word was "' + game.currentWrd + '".');
    askToPlayAgain();
  }
 	this.askToPlayAgain = function(){
		inquirer.prompt([
			{
		        name: "Play Again",
		        type: "confirm",
		        message: "Would you like to Play again?",     
		    }
	    ]).then(function(res) {
		    console.log(res);
		    if (res["Play Again"] === true) {
		        game.startGame();
		        lettersAlreadyGuessed = [];
				lettersCorrectlyGuessed = [];
		   	}
		    else{
		    	this.quit();
		    }	
		})
	}
	this.quit = function(){
		console.log("Goodbye");
		process.exit(0);
	}
}


// Create a new game object using the constructor and begin playing
game.startGame();


// var inquirer = require("inquirer");
// // var prompt = require('prompt');
// var Word = require("./Word.js");
// var words = ["Knicks", "LeBron James", "Steph Curry", "basketball", "dunk", "Kevin Durant", "Court", "Jumper", "Kyrie Irving", "James Harden", "Warriors"];


// var Game = function(){
// 	var self = this;
// 	this.play = function(){
// 		this.guessesLeft = 10;
// 		this.nextWord();
// 	} 

// 	this.nextWord = function(){
// 		var letters =[]
// 		var randomIndex = Math.floor(Math.random() * words.length);
// 		var randomWord = words[randomIndex];
// 		console.log(randomWord);
// 		this.currentWord = randomWord;
// 		for (i = 0; i < randomWord.length; i++){
//           letters.push("_");
// 			console.log(letters)
// 		}
// 		this.makeGuess();
// 	};

// 	this.makeGuess = function(){
// 		console.log("i am in makeGuess");
// 		this.currentWord.then(function(){
// 			if(self.guessesLeft < 1){
// 				console.log("you loose");
// 			}
// 			else if(self.currentWord.guessCorrectly()){
// 				console.log("Great Job");
// 				self.guessesLeft = 10;
// 				self.nextWord();
// 			}
// 			else{
// 				self.makeGuess();
// 			}
// 		})
// 	}

	// this.askToPlayAgain = function(){
	// 	inquirer.prompt([
	// 		{
	// 	        name: "Play Again",
	// 	        type: "confirm",
	// 	        message: "Would you like to Play again?",
	      
		         
	// 	    }

	//     ]).then(function(res) {
	// 	        	console.log(res)
	// 	          if (res["Play Again"] === true) {
	// 	          	console.log("works");
	// 	          	Game();
	// 	          	this.play;
	// 	          }
	// 	          else{
	// 	          	game.quit();
	// 	          }	
	// 			})
	    

// 		//use inquirer to ask user if you want to play again.
// 		//if yes fun this.play
// 		//else this.quit
// 	}

// 	// this.askForLetter = function(){
// 	// 	inquirer.prompt([ 
// 	// {
//  //        name: "letter",
//  //        message: "Guess a Letter",
      
//  //        validate: function(value) {
//  //          if() {
//  //            	Game();
//  //          }
//  //          else{
//  //          	this.quit;
//  //          }	
//  //        }
//  //    }
//  //    ])
// 	// 	use inqirerer to ask for a letter
// 	// 	if the letter is correct console it is correct
// 	// 	else self.guessesleft -= 1
// 	// 	console.log incorrect and you have number of quesses left
// 	// }

// 	this.quit = function(){
// 		console.log("Goodbye");
// 		process.exit(0);
// 	}
// }

// module.exports = Game

// var game = new Game()
// // game.askToPlayAgain()
// game.nextWord()
// // game.makeGuess()
// // game.quit()

