var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');
var syllabesArr = [ [], [] ,[] ,[] ,[] ,[] ,[] ,[] ];
var formattedArray = [ [], [], [] ];

function readCmudictFile (file){
	return fs.readFileSync(file).toString(); 
}

function formatData(data){ 
	var lines = data.toString().split("\n");
	var	lineSplit;
	lines.forEach(function(line){
		lineSplit = line.split("  ");
		if(lineSplit[1].match(/\d/g)!==null && lineSplit[0].match(/\(|\./)===null){ 
			var count = lineSplit[1].match(/\d/g).length;
			if(count<=7){
				syllabesArr[count].push(lineSplit[0]); 
			}
		} 
	});
	return syllabesArr;
}
function structuredArray(strArray){ 
	var sylTotal = 0; 
	for(var s = 0; s < strArray.length; s++){
		if(sylTotal + strArray[s] <= 5){ 
			formattedArray[0].push(strArray[s]);
			sylTotal += strArray[s];
		} else if(sylTotal + strArray[s] <= 12){ 
			formattedArray[1].push(strArray[s]);
			sylTotal += Number(strArray[s]);
		} else{ 
			formattedArray[2].push(strArray[s]);
		}
	}
	return formattedArray;	
}
function randomPick(formArray){  
	for(var f = 0; f < formattedArray.length; f++){ 
		var arraySegment = formattedArray[f];
		var randomWord = "";
		for(var r = 0; r < arraySegment.length; r++){
			var maxArray = syllabesArr[arraySegment[r]].length;	
			var randomNum = Math.floor(Math.random() * (maxArray - 0));
			randomWord += syllabesArr[arraySegment[r]][randomNum]; 
			if(r < arraySegment.length - 1){
				randomWord += " ";
			}
		}
		console.log(randomWord.slice(0,1) + randomWord.slice(1).toLowerCase()); 
	}
}
function createHaiku(structure){
	console.log("Please enjoy this original haiku:");
	formatData(cmudictFile); 
	structuredArray(structure); 
	randomPick(formattedArray); 
}

module.exports = {
	createHaiku: createHaiku,
};
