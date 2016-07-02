var haiku = require('./haiku');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What haiku structure would you like? \nEnter like a string 5,7,5:  ', (answer) => { 
	if(answer === "") { 
 	 	answer = "5,7,5";
 	};
 	var answerArray = answer.split(",").map(Number); 
 	haiku.createHaiku(answerArray); 
	rl.close();
});