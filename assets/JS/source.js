//JavaScript file for Robo Hangman
//Written by James Calderon (jamescalderon.com)

//Main word array
var categoryArray = ["robot", "machine", "automated", "computer", "humanoid", "bender", "mode", "animated", "mechanical", "programmed", "can", "automaton", "sonny", "dumb", "technology", "future"];
var randWord = Math.floor(Math.random() * categoryArray.length);
var word = categoryArray[randWord];

//  - (begin stubbed code) - random word generator from API - will enable at later date

// var randN = randGen(0); //random number
// var randL = randGen(1); //random letter

// var yourUrl = "https://api.datamuse.com/words?ml=" + categoryArray[randWord] + "&sp=" + randL + "*&max=" + randN;

//URL call
// var xhReq = new XMLHttpRequest();
// xhReq.open("GET", yourUrl, false);
// xhReq.send(null);
// var jsonObject = JSON.parse(xhReq.responseText);
// var word = jsonObject[0].word; //word from URL call
//var randNN = Math.floor(Math.random() * jsonObject.length); //generate number limited by JSON object's length (used to choose random word position within returned JSON query)

//  - (end stubbed code) - 

//enable to see word in console
//console.log("word: " + word);

//assign to array of characters
var wordArray = word.split('');
var lettersChosen = []; //holds letters user has chosen
var lettersMatched = []; //matched letters to display
var wordDisplayed = ""
var totCharactersLeft = wordArray.length; //set initial value
var robopartsLeft = 6; //total robo parts (to hang)
var gameDone = false; //used to flag game end

//populate dashes in wordDisplayed and lettersMatched from wordArray
for (var index = 0; index < wordArray.length; index++) {
    wordDisplayed += "-"
    lettersMatched[index] = "-";
}

//initialize visual displays
gameStatusDisplays(robopartsLeft);

//PLAY THE GAME

//main event - activated when user releases key
document.onkeyup = function(event) {
    var keyPressed = event.key.toLowerCase(); //lower case key
    var charsFound = 0;

    //Actions if key not pressed before
    if (contains(lettersChosen, keyPressed) == 0 && gameDone == false) {
        charsFound = letterLoop(wordArray, lettersMatched, keyPressed); //find/replace chars in string if they match

        //Check if letter right/wrong
        if (charsFound > 0) { //if chars found (right letter chosen)
            lettersChosen.push(keyPressed); //add found letter
            totCharactersLeft -= charsFound; //deduct how many found from count

        } else { //if no chars found (wrong letter chosen)
            //add robo body part (remove 1 from available parts left)
            robopartsLeft--;
        }

        //Check for game end and act accordingly:
        // - check for no more robo parts left (game lost)
        if (robopartsLeft == 0) {
            gameDone = true; //set flag
            endWell(false); //trigger game lost 
        }

        // - check for no more letters left (game won)
        if (totCharactersLeft == 0) {
            gameDone = true; //set flag
            endWell(true); //trigger game won
        }

        //updates to display (except last pass, once final dispays are rendered):
        if (gameDone != true) {
            gameStatusDisplays(robopartsLeft);
        }
    } //end if
}; //end of keyup

//CUSTOM FUNCTIONS
function gameStatusDisplays(roboparts) {

    //this function displays the changes dynamically
    if (roboparts == 6) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g0.svg" class="main_image" >';

        //green button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" disabled="disabled" id="button_text">6 robo parts left!</a>'
    }

    if (roboparts == 5) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g1.svg" class="main_image" >';

        //green button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" disabled="disabled" id="button_text">5 robo parts left!</a>'
    }

    if (roboparts == 4) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g2.svg" class="main_image" >';

        //yellow button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-warning" disabled="disabled" id="button_text">4 robo parts left!</a>'
    }

    if (roboparts == 3) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g3.svg" class="main_image" >';

        //yellow button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-warning" disabled="disabled" id="button_text">3 robo parts left!</a>'
    }

    if (roboparts == 2) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g4.svg" class="main_image" >';

        //red button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-danger" disabled="disabled" id="button_text">2 robo parts left!</a>'
    }

    if (roboparts == 1) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g5.svg" class="main_image" >';

        //red button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-danger" disabled="disabled" id="button_text">1 robo parts left!</a>'
    }

    if (roboparts == 0) { //if done - show robo on gallows
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g6.svg" class="main_image" >';

        //button final display in endWell function
    }

    //general updates:
    wordDisplayed = lettersMatched.join(""); //update word displayed
    document.getElementById("text_middle").innerHTML = wordDisplayed; // display updated word

    document.getElementById("text_bottom").innerHTML = "( total characters left: " + totCharactersLeft + " )"; // display how many characters are left in word
}

function contains(arrIn, keyIn) {
    //this function counts how many times a character is in the word - returns count

    var counter = 0;

    //filter out anything besides lowercase letters (a -> z)
    if (keyIn.toLowerCase().charCodeAt(0) < 97 || keyIn.toLowerCase().charCodeAt(0) > 122) {
        return counter = 1; //cut it short and return 
    } else {
        for (var index = 0; index < arrIn.length; index++) {;

            if (arrIn[index] == keyIn) {
                counter++; //add 1
            }
        }
        return counter; //return how many times in array character exists
    }
}

function letterLoop(arrayToSearch, arrayToReplace, key) {
    //goes through and replaces letters when found 
    //returns how many letters replaced, if any

    var count = 0;
    for (var index = 0; index < arrayToSearch.length; index++) {
        //if key matches letter in array, replace
        if (key == arrayToSearch[index]) {
            arrayToReplace[index] = arrayToSearch[index]; //replace character by index
            count++; //+1
        }
    }

    return count; //report back how many chars replaced
}

function randGen(valIn) {
    //returns random letters/numbers (up to 26)

    var chars = 'abcdefghijklmnopqrstuvwxyz';
    var ch = Math.floor(Math.random() * chars.length);

    if (valIn == 0) {
        return ch; //return number
    } else {
        return chars[ch]; //return letter
    }
}

function endWell(result) {
    if (result) {

        //if true - game won
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/robo_alive.svg" class="main_image" >'; //if done - show robo alive face

        document.getElementById("top_text").innerHTML = "It's alive - ALIVE!"; // display robo's status

        document.getElementById("text_middle").innerHTML = wordArray.join(''); //display  word

        document.getElementById("text_bottom").innerHTML = ""; // clear bottom text

    } else {
        //if false - game lost
        document.getElementById("top_text").innerHTML = "It's D-E-D!"; // display robo's status

        document.getElementById("text_middle").innerHTML = wordArray.join(''); //display  word

        document.getElementById("text_bottom").innerHTML = ""; // clear bottom text
    }
    gameDone = true; //done with game - set flag

    //change button to reset
    document.getElementById("button").innerHTML = ' <a href="game.html" class="btn btn-lg active btn-primary">PLAY AGAIN</a>'
}

//testing functions
function printArray(array) {

    var s = "";
    for (var index = 0; index < array.length; index++) {
        s += array[index];
    }
    console.log("printed array: " + s);
}