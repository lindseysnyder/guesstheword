/* UI elements */
const startPlay = document.querySelector('[data-start-play]')
const enteredWord = document.querySelector('[data-entered-word]')
const wordContainer = document.querySelector('[data-word-container]')
const wordWrapper = document.querySelector('[data-word-wrapper]')
const playBtn = document.querySelector('[data-play-button]')
const guessInput = document.querySelector('[data-guess]')
const guessWrapper = document.querySelector('[data-guess-wrapper]')
const guessBtn = document.querySelector('[data-guess-button]')
const newGameBtn = document.querySelector('[data-new-game-button]')
const statusWrapper = document.querySelector('[data-status-wrapper]')
const statusContainer = document.querySelector('[data-status-container]')

/* Regex */
const alphaNumRegex = /^[0-9a-zA-Z]+$/ // match alphanumeric

/* Data */
let charsArray = [] // chars from entered word/phrase
let charsToGuess = []
let charsOnPage = ''
let guessVal = ''
let showOnPage = ''
let newText = ''

// Split input val into array of characters
function getCharsArray(el) {
  let theChars = el.value.split('')
  return theChars
}

// Remove duplicates
function removeDuplicates(arr) {
  let unique = Array.from(new Set(arr))
  return unique
}

// Filter out punctuation - only need to guess alpha/num
function filterToAlphaNumeric(arr) {
  const filtered = arr.filter(function(value){
    return value.match(alphaNumRegex)
  })
  return filtered
}

// Remove guessed letter
function filterGuessed(arr, guess) {
  let guessIndex = arr.indexOf(guess)
  arr.splice(guessIndex, 1)
  return arr
}

function showLetters(phrase, key) {
  let redacted = ''
  phrase.forEach((el) => {
    // If key has el, print '*'
    redacted += key.includes(el) ? '*' : el
  })
  return redacted
}

function updatePhrase(text) {
  newText = document.createTextNode(text)
  // If child text node exists, remove it first
  while (wordContainer.firstChild) {
    wordContainer.removeChild(wordContainer.firstChild);
  }
  wordContainer.appendChild(newText);
}

function updateText(container, text) {
  newText = document.createTextNode(text)
  while(container.firstChild) {
    container.removeChild(container.firstChild)
  }
  container.appendChild(newText)
}

/* 
 * START SCREEN HIDE/SHOW
 */
function hideStartScreen() {
  document.querySelector('[data-gamestart]').classList.add('none')
  document.querySelector('[data-gameplay]').classList.remove('none')
}

function showStartScreen() {
  document.querySelector('[data-gamestart]').classList.remove('none')
  document.querySelector('[data-gameplay]').classList.add('none')
}


/* 
 * THESE ARE THE TWO MAIN FUNCTIONS THAT CONSTITUTE GAME PLAY
 */

// Begin game - this only runs when a new phrase is entered
function initPlay() {
  charsArray = getCharsArray(enteredWord)
  let uniqueChars = removeDuplicates(charsArray)
  charsToGuess = filterToAlphaNumeric(uniqueChars) 
  showOnPage = showLetters(charsArray, charsToGuess) 

  updateText(wordContainer, showOnPage)
  
  // Show and hide elements
  enteredWord.value = ''
  startPlay.classList.add('none')
  newGameBtn.classList.remove('none')
  wordWrapper.classList.remove('none')
  guessWrapper.classList.remove('none')
  statusWrapper.classList.remove('none')
}

function checkGuess() {
  guessVal = guessInput.value
  let statusMsg = ''

  // If guess matches a letter in unique set
  if (charsToGuess.includes(guessVal)) {
    filterGuessed(charsToGuess, guessVal)

    // Print phrase with updated letters
    showOnPage = showLetters(charsArray, charsToGuess)
    updateText(wordContainer, showOnPage)
    statusMsg = 'Good guess'
  } else {
    statusMsg = 'Not a match'
  }

  guessInput.value = ''
  updateText(statusContainer, statusMsg)
}

function clearGame() {
  updateText(wordContainer, '')
  charsToGuess = []
  charsArray = []

  enteredWord.classList.remove('none')
  playBtn.classList.remove('none')
  newGameBtn.classList.add('none')
  updateText(statusContainer, '')
}

document.addEventListener('click', function(e) {
  if (e.target.matches('[data-gamestart-button]')) hideStartScreen()
  if (e.target.matches('[data-backtostart-button]')) showStartScreen()
  if (e.target.matches('[data-play-button]')) initPlay()
  if (e.target.matches('[data-guess-button]')) checkGuess()
  if (e.target.matches('[data-new-game-button]')) clearGame()
})
// v helpful https://www.blog.duomly.com/13-useful-javascript-array-tips-and-tricks-you-should-know/

