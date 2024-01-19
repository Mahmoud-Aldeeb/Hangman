//letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//Get Array from letters
let lettersArray = Array.from(letters);

//select Letters container
let lettersContainer =document.querySelector(".letters");

//generate letters
lettersArray.forEach(letter => {

    //create span
    let span = document.createElement("span");

    //create letter text node
    let theletter = document.createTextNode(letter);

    //append the letter to span
    span.appendChild(theletter);

    //add class on span
    span.className = "letter-box";
    
    //append span to the letters container
    lettersContainer.appendChild(span);

});

//object of words + categories
const words = {
    programming: ["php","javascript","go","scala","fortran","r","mysql","python"],
    movies: ["prestige","inception","parasite","interstellar","Whiplash","Memento","coco","up"],
    people: ["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatma Ghandi"],
    countries: ["United States","syria","Palestine","Yemen","Egypt","Bahrain","Qatar"]
}

//get random property
let allkeys = Object.keys(words);

//random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allkeys.length);

//category
let randomPropName = allkeys[randomPropNumber];
let randomPropValue = words[randomPropName];


//random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

//the chosen word
let randomValueValue = randomPropValue[randomValueNumber];

//set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;




//select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

//convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

//create Spans depend on word
lettersAndSpace.forEach(letter => {

    //create empty span
    let emptySpan = document.createElement("span");

    //if letter is space
    if(letter === ' '){

        //add class to span
        emptySpan.className = 'with-space';

    }

    //append spans to the guess container
    lettersGuessContainer.appendChild(emptySpan);
});

//select gusses spans
let guessSpans = document.querySelectorAll(".letters-guess span");

//Set Wrong attempts
let wrongAttempts = 0;


//select the Drawelement
let theDraw = document.querySelector(".hangman-draw");



// handle clicking on letters 
document.addEventListener('click', (e) => {

    //set the chose status
    let theStatus = false;

    if (e.target.className === 'letter-box') {
        e.target.classList.add('clicked');

        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        //the chosen word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, WordIndex) => {

            //if the cliced letter eual to one of the chosen word letter
            if (theClickedLetter == wordLetter) {
                
                // set status to correct
                theStatus = true;

                //loop om all guess spans
                guessSpans.forEach((span, spanIndex) => {

                    if (WordIndex === spanIndex) {

                        span.innerHTML = theClickedLetter;

                    }

                });
                




            }
        });
        //outloop
        
        //if letter is wrong 
        if (theStatus !== true) {

            //increase the wrong attempts
            wrongAttempts++;

            //add class wrong on the draw element
            theDraw.classList.add (`wrong-${wrongAttempts}`);

            //play fail sound
            document.getElementById("fail").play ();

            if (wrongAttempts === 8) {
                endGame ();
                lettersContainer.classList.add ("finished");
            }

        }else {
            //play success sound
            document.getElementById("success").play ();
        }

    }
});

//end game function
function endGame (){
    //create popup div
    let div = document.createElement ("div");
    
    //create text
    let divText = document.createTextNode (`Game Over, The word Is ${randomValueValue}`);

    //Append text to div
    div.appendChild(divText);

    //add classon div 
    div.className = 'popup';

    //append to the body
    document.body.appendChild(div);
};