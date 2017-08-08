//get random word from http://setgetgo.com/randomword/get.php

//HTTP POST Request (Synchronous)
// var xhr = new XMLHttpRequest();
// xhr.open('GET', "http://setgetgo.com/randomword/get.php", false);
// xhr.send();

//get https word from API




var yourUrl = "https://api.datamuse.com/words?ml=robot&sp=ab*&max=10";
var xhReq = new XMLHttpRequest();
xhReq.open("GET", yourUrl, false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);
console.log(jsonObject[0].word);


//if response is > 10 characters, go back and get another word until it is 10 or less
// do {
//     xhr = new XMLHttpRequest();
//     xhr.open('GET', "http://setgetgo.com/randomword/get.php", false);
//     xhr.send();
//     // console.log("over: " + xhr.responseText.toLowerCase());

// } while (xhr.responseText.length > 8);

var word = jsonObject[0].word;
console.log(word);
// xhr.responseText.toLowerCase(); //assign lower case word if correct
// console.log("the word is : " + word);

//assign to array of characters
var wordArray = word.split('');
var lettersChosen = []; //holds letters user has chosen
var lettersMatched = []; //matched letters to display
var wordDisplayed = ""
var totCharactersLeft = wordArray.length; //set initial value
var roboBitsLeft = 6; //total robo parts (to hang)
var gameDone = false; //used to flag game end

//populate dashes in wordDisplayed and lettersMatched from wordArray
for (var index = 0; index < wordArray.length; index++) {
    wordDisplayed += "-"
    lettersMatched[index] = "-";
}

//initialize visual displays
gameStatusDisplays(roboBitsLeft);

//PLAY THE GAME

//main event - activated when user releases key
document.onkeyup = function(event) {
    var keyPressed = event.key.toLowerCase(); //lower case key
    var charsFound = 0;

    // console.log(keyPressed);

    //Actions if key not pressed before
    if (contains(lettersChosen, keyPressed) == 0 && gameDone == false) {
        charsFound = letterLoop(wordArray, lettersMatched, keyPressed); //find/replace chars in string if they match

        //Check if letter right/wrong
        if (charsFound > 0) { //if chars found (right letter chosen)
            lettersChosen.push(keyPressed); //add found letter
            totCharactersLeft -= charsFound; //deduct how many found from count
        } else { //if no chars found (wrong letter chosen)
            //add robo body bit (remove 1 from available bits left)
            roboBitsLeft--;
            // hangRobot(roboBitsLeft); //punish robot
        }

        //Check for game end and act accordingly:
        // - check for no more robo bits left (game lost)
        if (roboBitsLeft == 0) {
            endWell(false); //trigger game lost 
        }

        // - check for no more letters left (game won)
        if (totCharactersLeft == 0) {
            endWell(true); //trigger game won
        }

        // ( if here, game is still going )

        //updates to display:
        gameStatusDisplays(roboBitsLeft);

    } //end if

}; //end of keyup

//CUSTOM FUNCTIONS
function gameStatusDisplays(roboBits) {

    //this function displays the changes dynamically
    if (roboBits == 6) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g0.svg" class="main_image" height="50%" width="50%">';

        //green button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" disabled="disabled" id="button_text">6 robo bits left!</a>'
    }

    if (roboBits == 5) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g1.svg" class="main_image" height="50%" width="50%">';

        //green button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" disabled="disabled" id="button_text">5 robo bits left!</a>'
    }

    if (roboBits == 4) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g2.svg" class="main_image" height="50%" width="50%">';

        //yellow button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-warning" disabled="disabled" id="button_text">4 robo bits left!</a>'
    }

    if (roboBits == 3) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g3.svg" class="main_image" height="50%" width="50%">';

        //yellow button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-warning" disabled="disabled" id="button_text">3 robo bits left!</a>'
    }

    if (roboBits == 2) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g4.svg" class="main_image" height="50%" width="50%">';

        //red button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-danger" disabled="disabled" id="button_text">2 robo bits left!</a>'
    }

    if (roboBits == 1) {
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g5.svg" class="main_image" height="50%" width="50%">';

        //red button
        document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-danger" disabled="disabled" id="button_text">1 robo bits left!</a>'
    }

    if (roboBits == 0) { //if done - show robo on gallows
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/g6.svg" class="main_image" height="50%" width="50%">';

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
    // printArray(arrayToSearch);
    // printArray(arrayToReplace);
    return count; //report back how many chars replaced
}

// function hangRobot(roboBits) {
//     //this function changes main display and button text dynamically (robo bits added to gallows)

//     if (roboBits == 5) {
//         document.getElementById("top_image").innerHTML = '<img src="./assets/images/g1.svg" class="main_image" height="50%" width="50%">';

//         document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" id="button_text">5 robo bits left!</a>'
//     }

//     if (roboBits == 4) {
//         document.getElementById("top_image").innerHTML = '<img src="./assets/images/g2.svg" class="main_image" height="50%" width="50%">';

//         document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" id="button_text">4 robo bits left!</a>'
//     }

//     if (roboBits == 3) {
//         document.getElementById("top_image").innerHTML = '<img src="./assets/images/g3.svg" class="main_image" height="50%" width="50%">';

//         document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" id="button_text">3 robo bits left!</a>'
//     }

//     if (roboBits == 2) {
//         document.getElementById("top_image").innerHTML = '<img src="./assets/images/g4.svg" class="main_image" height="50%" width="50%">';

//         document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" id="button_text">2 robo bits left!</a>'
//     }

//     if (roboBits == 1) {
//         document.getElementById("top_image").innerHTML = '<img src="./assets/images/g5.svg" class="main_image" height="50%" width="50%">';

//         document.getElementById("button").innerHTML = '<a class="btn btn-lg active btn-success" id="button_text">1 robo bits left!</a>'
//     }

//     if (roboBits == 0) { //if done - show robo on gallows
//         document.getElementById("top_image").innerHTML = '<img src="./assets/images/g6.svg" class="main_image" height="50%" width="50%">';
//     }

// }

function endWell(result) {
    if (result) {
        //if true - game won
        document.getElementById("top_image").innerHTML = '<img src="./assets/images/robo_alive.svg" class="main_image" height="50%" width="50%">'; //if done - show robo alive face

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
    document.getElementById("button").innerHTML = ' <a href="game.html" class="btn btn-lg active btn-primary" >PLAY AGAIN</a>'
}

//testing functions
function printArray(array) {

    var s = "";
    for (var index = 0; index < array.length; index++) {
        s += array[index];

    }
    console.log("printed array: " + s);
}