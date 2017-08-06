//get random word from http://setgetgo.com/randomword/get.php

//HTTP POST Request (Synchronous)
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://setgetgo.com/randomword/get.php", false);
xhr.send();

var word = xhr.responseText.toLowerCase(); //assign lower case word 

//assign to array of characters
var wordArray = word.split('');

var lettersChosen = []; //holds letters user has chosen

var wordDisplayed = ""

var roboBitsLeft = 6;

//populate wordDisplayed from wordArray
for (var index = 0; index < wordArray.length; index++) {
    wordDisplayed += "-"

}

//BEGIN THE GAME

//display word
document.getElementById("text_middle").innerHTML = wordDisplayed;

//initialize button
buttonStatus(roboBitsLeft);




// console.log(word);
// console.log(wordDisplayed);



//CUSTOM FUNCTIONS
function buttonStatus(roboBitsLeft) {
    // changes button features, according to how many robot bits left (until they're hanged)

    if (roboBitsLeft == 6 || roboBitsLeft == 5) {
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" id="button_text">6 robo bits left!</a>'
    }

    if (roboBitsLeft == 4 || roboBitsLeft == 3) {
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-warning" id="button_text">6 robo bits left!</a>'
    }

    if (roboBitsLeft == 2 || roboBitsLeft == 1) {
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-danger" id="button_text">6 robo bits left!</a>'
    }

    //if less than 1, stop and declare robot dead and offer a refresh of page

    document.getElementById("button_text").innerHTML = roboBitsLeft + " robo bits left!"; // display how many tries until robot is hangged

}