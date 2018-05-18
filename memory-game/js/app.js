//List that holds all of of the cards
const cards = ['bart', 'homer', 'flanders', 'grandpa', 'mr_burns', 'lisa', 'marge', 'willy', 'bart', 'homer', 'flanders', 'grandpa', 'mr_burns', 'lisa', 'marge', 'willy'];
//Game board
let board = [];
//Opened cards array
let opened = [];
//Clicked cards array
let clickedCard = [];
//Array to hold the matched cards
let matched = [];
//Number of moves
let moves = 0;
//Keep track of time
let time;
//Helps with starting the time on first click
let startTime = 'false';
//Get the minutes and seconds
let min = "";
let sec = "";
//Deal with plural and singular. minutes vs minute, seconds vs second.
let s = "";
let m = "";
//Gets the div holding the stars
let stars = "";
let star = "";
let icon = "";
//Store a card
let liCard;
let movesCount = document.querySelector(".moves-counter");
let numberOfStars = 5;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}



//Create cards and add the to board
function setDeck() {
    addStars();
    shuffle(cards);
    board = document.getElementById('board');
    for (let i = 0; i < cards.length; i++) {
        liCard = document.createElement('LI');
        liCard.classList.add("card");

        let IMG = document.createElement('IMG');
        IMG.setAttribute('src', 'img/' + cards[i] + '.png');
        IMG.classList.add("img-fluid");
        liCard.appendChild(IMG);
        board.appendChild(liCard);

        switch (cards[i]) {
            case 'bart':
                liCard.classList.add("bart");
                IMG.alt="bart";
                break;
            case 'homer':
                liCard.classList.add("homer");
                IMG.alt="homer";
                break;
            case 'flanders':
                liCard.classList.add("flanders");
                IMG.alt="flanders";
                break;
            case 'grandpa':
                liCard.classList.add("grandpa");
                IMG.alt="grandpa";
                break;
            case 'mr_burns':
                liCard.classList.add("mr_burns");
                IMG.alt="mr_burns";
                break;
            case 'lisa':
                liCard.classList.add("lisa");
                IMG.alt="lisa";
                break;
            case 'marge':
                liCard.classList.add("marge");
                IMG.alt="marge";
                break;
            case 'willy':
                liCard.classList.add("willy");
                IMG.alt="willy";
        }
    }
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Bonus points for

/*   - play playSound
      - animate on match and noMatch
      - custom css
*/

//Start the game
function startGame() {

    setDeck();

    document.getElementById('board').addEventListener('click', function(e) {
        //If the click was on a 'LI' emelent
        if (e.target.nodeName === "LI") {
            console.log('li element clicked');
            // Save selected card in a variable
            clickedCard = e.target;
            //add card to 'opened' array

            // Function to count the number of moves
            movesNumber();

            // The function to reveal the clicked card
            open();

            // The function to send 2 cards to be compared
            sendToCompare();

            // Function to start the timer
            startTimer();
        }
    });
}

startGame();

function open() {
    opened.push(clickedCard);
    clickedCard.classList.add('open');
};

//Function that sends opened cards to compare function and runs the win and removeStars function
function sendToCompare() {
    if (opened.length === 2) {
        board.classList.add('not-clickable');
        compare();
        win();
        removeStars();
    };
};

//Compare the opened cards
function compare() {
    if (opened[0].innerHTML === opened[1].innerHTML) {
        match();
        playSound();
    } else {
        noMatch();
    }
}

//Add match class if cards match
function match() {
    opened[0].classList.add('match');
    opened[1].classList.add('match');
    addToMatched();
    opened[0].classList.remove('match');
    opened[1].classList.remove('match');
    opened = [];
    board.classList.remove('not-clickable');
    console.log(matched);
}

function noMatch() {
  opened[0].classList.add('shake');
  opened[1].classList.add('shake');
    setTimeout(function() {
        opened[0].classList.remove('open');
        opened[1].classList.remove('open');
        opened[0].classList.remove('shake');
        opened[1].classList.remove('shake');
        opened = [];
        board.classList.remove('not-clickable');
    }, 1000)
    console.log('not equal!');
}

function addToMatched() {
    matched.push(opened[0]);
    matched.push(opened[1]);
}

function playSound() {
    if (clickedCard.classList.contains("bart")) {
        var audio = new Audio('sound/bart.wav');
        audio.play();
    }

    if (clickedCard.classList.contains("homer")) {
        var audio = new Audio('sound/homer.wav');
        audio.play();
    }

    if (clickedCard.classList.contains("lisa")) {
        var audio = new Audio('sound/lisa.wav');
        audio.play();
    }

    if (clickedCard.classList.contains("marge")) {
        var audio = new Audio('sound/marge.wav');
        audio.play();
    }

    if (clickedCard.classList.contains("willy")) {
        var audio = new Audio('sound/willy.wav');
        audio.play();
    }

    if (clickedCard.classList.contains("flanders")) {
        var audio = new Audio('sound/flanders.wav');
        audio.play();
    }

    if (clickedCard.classList.contains("mr_burns")) {
        var audio = new Audio('sound/mr_burns.wav');
        audio.play();
    }

    if (clickedCard.classList.contains("grandpa")) {
        var audio = new Audio('sound/grandpa.wav');
        audio.play();
    }
}

// Number of moves function
function movesNumber() {

    moves += 1;
    movesCount.innerHTML = moves;
}

function clearMovesNumber() {
    movesCount.innerHTML = "0";
    moves.length = 0;
}

function startTimer() {
    if (startTime == 'false') {
        startTime = 'true';
        timer();
    }
}

//Timer function, source https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function timer() {
    var sec = 0;

    function pad(val) {
        return val > 9 ? val : "0" + val;
    }
    time = setInterval(function() {
        document.getElementById("seconds").innerHTML = pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    }, 1000)
}

function win() {
    if (matched.length === 16) {
        getTime();
        launchModal();
        stopTimer();
    }
}

function getTime() {
    min = document.getElementById('minutes').textContent;
    sec = document.getElementById('seconds').textContent;
    if (sec === 1) {
        s = "second";
    } else {
        s = "seconds";
    }

    if (min === 1) {
        m = "minute";
    } else {
        m = "minutes";
    }

    if (min === "00") {
        min = "";
        m = "";
    }
}

// Get the modal
function launchModal() {
    setTimeout(function() {
        modal.style.display = "block";
        document.getElementById('howManyMoves').innerHTML = "<p>" + moves + " moves in " + min + " " + m + " " + sec + " " + s + " gives us a total of " + numberOfStars + " stars:" + stars.outerHTML + "</p>";
    }, 1000)
}

function stopTimer() {
    clearInterval(time);
}

function clearDeck() {
    let deck = document.querySelector('#board');
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}

function clearHistory() {
    for (let i = 0; i < cards.length; i++) {
        liCard.classList.remove("open");
        liCard.classList.remove("match");
        console.log("card.class.removed");
    }
}

//Add the stars
function addStars() {
    for (i = 0; i < 5; i++) {
        stars = document.querySelector('.stars');
        star = document.createElement('LI');
        stars.appendChild(star);
        icon = document.createElement('I');
        icon.classList.add("fa");
        icon.classList.add("fa-star");

        star.appendChild(icon);
    }
}

function clearStars() {
    while (stars.hasChildNodes()) {
        stars.removeChild(stars.firstChild);
    };
    console.log("stars removed");
}

function removeStars() {
    if (moves === 30) {
        stars.removeChild(stars.childNodes[4]);
        numberOfStars = 4;
    }

    if (moves === 40) {
        stars.removeChild(stars.childNodes[3]);
        numberOfStars = 3;
    }

    if (moves === 50) {
        stars.removeChild(stars.childNodes[2]);
        numberOfStars = 2;
    }

    if (moves === 60) {
        stars.removeChild(stars.childNodes[1]);
        numberOfStars = 1;
    }
}

const restart = document.querySelector('.restart');
restart.addEventListener('click', reset);

const playAgain = document.querySelector('.playAgain');
playAgain.addEventListener('click', reset);

function reset() {
    location.reload();
}

//MODAL
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
