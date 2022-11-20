document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;

    let word = prompt("What is your five-letter word?", "");
    let hint = prompt("What is your hint?", "");

    console.log()

    let guessedWordCount = 0;

    const keys = document.querySelectorAll(".keyboard-row button")

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr();

        if(currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter);

            const availableSpaceEL = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEL.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if(!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr();
        if(currentWordArr.length !== 5){
            window.alert("Word must be " + 5 + " letters");
        }

        if(currentWordArr.length == 5) {

        const currentWord = currentWordArr.join('');

        const firstLetterId = guessedWordCount * word.length + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout( () => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });

        guessedWordCount += 1;

        if(currentWord === word) {
            window.alert(`Congratulations, you got the word! The word is ${word}.`);
        }

        if((guessedWords.length === 5) &&(!(currentWord===word))) {
            window.alert("Last chance!")
        }

        if((guessedWords.length === 6) &&(!(currentWord===word))) {
            window.alert(`Sorry, there is no more chances! The word is ${word}.`)
        }

        guessedWords.push([]);
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();
        guessedWords[guessedWords.length - 1] = currentWordArr;
        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    function containsNumbers(str) {
        return /[0-9]/.test(str);
      }

    for(let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if(letter ==='enter') {
                handleSubmitWord()
                return;
            }

            if(letter ==='hint') {
                if (containsNumbers(word) == false) {
                    window.alert(`There is no numbers in the word \n${hint}`)
                }
                else if (containsNumbers(word) == true) {
                    window.alert(`There is one or more numbersin the word \n${hint}.`)
                }         
                return;
            }

            if(letter === 'del') {
                handleDeleteLetter()
                return;
            }

            updateGuessedWords(letter);
        };
    }

})
