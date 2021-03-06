let rounds
let currentRound = 1
let playerChoice
let computerChoice
let alreadyClicked = false
let score = [0, 0]
let winner // 0 = draw  1 = player wins  2 = computer wins
const currentRoundOutputElt = document.getElementById('currentRoundOutput')
const scoreOutputElt = document.getElementById('scoreOutput')
const playerActionElt = document.getElementById('playerAction')
const computerActionElt = document.getElementById('computerAction')
const gameButtonElts = document.getElementsByClassName('gameButton')
const actionsContainer = document.getElementById('actionsContainer')

function displayChosenRounds() {
    document.getElementById('roundsOutput').innerHTML = rounds = document.getElementById('roundsInput').value
}

function startGame() {
    document.getElementById('roundsOption').style.display = 'none'
    document.getElementById('gameWindow').style.display = 'flex'
    currentRoundOutputElt.innerHTML += rounds
    document.getElementById('iconsAttribution').style.display = 'block'
}

function playerAction(elt) {
    if (!alreadyClicked) {
        alreadyClicked = true
        gameButtonElts[0].style.transform = gameButtonElts[1].style.transform = gameButtonElts[2].style.transform = 'scale(1)'
        setAndSlideInImages(elt)
        detectRoundWinner()
        setTimeout(colorizeAndSetScores, 500) // Call functions chain to give player feedback about current score / round and reset stuff
    }
}

function setAndSlideInImages(elt) {
    if (elt.id == 'rockButton') {
        playerChoice = 'rock'
        playerActionElt.style.background = 'url(assets/img/rock.png) center/cover no-repeat'
    }
    else if (elt.id == 'paperButton') {
        playerChoice = 'paper'
        playerActionElt.style.background = 'url(assets/img/paper.png) center/cover no-repeat'
    }
    else if (elt.id == 'scissorsButton') {
        playerChoice = 'scissors'
        playerActionElt.style.background = 'url(assets/img/scissors.png) center/cover no-repeat'
    }
    let rand = getRandomIntInclusive(1, 3)
    if (rand == 1) {
        computerChoice = 'rock'
        computerActionElt.style.background = 'url(assets/img/rock.png) center/cover no-repeat'
    }
    else if (rand == 2) {
        computerChoice = 'paper'
        computerActionElt.style.background = 'url(assets/img/paper.png) center/cover no-repeat'
    }
    else if (rand == 3) {
        computerChoice = 'scissors'
        computerActionElt.style.background = 'url(assets/img/scissors.png) center/cover no-repeat'
    }
    computerActionElt.style.right = playerActionElt.style.left = '-15px'
}

function detectRoundWinner() {
    if (playerChoice == computerChoice) {
        winner = 0
    }
    else {
        if (playerChoice == 'rock') {
            if (computerChoice == 'paper') {
                winner = 2
            }
            else if (computerChoice == 'scissors') {
                winner = 1
            }
        }
        else if (playerChoice == 'paper') {
            if (computerChoice == 'rock') {
                winner = 1
            }
            else if (computerChoice == 'scissors') {
                winner = 2
            }
        }
        else if (playerChoice == 'scissors') {
            if (computerChoice == 'rock') {
                winner = 2
            }
            else if (computerChoice == 'paper') {
                winner = 1
            }
        }
    }
}

function colorizeAndSetScores() {
    if (winner == 0) {
        actionsContainer.style.borderLeft = actionsContainer.style.borderRight = '10px solid #00c'
        document.getElementById('actionTextDraw').style.color = '#000'
    }
    else {
        document.getElementById('actionTextDraw').style.color = '#fff'
        if (winner == 1) {
            actionsContainer.style.borderLeft = '10px solid #0c0'
            actionsContainer.style.borderRight = '10px solid #c00'
            scoreOutputElt.style.transform = 'translateY(35px) scaleX(1.25)'
            playerActionElt.style.left = '0'
        }
        else if (winner == 2) {
            actionsContainer.style.borderLeft = '10px solid #c00'
            actionsContainer.style.borderRight = '10px solid #0c0'
            scoreOutputElt.style.transform = 'translateY(35px) scaleX(1.25)'
            computerActionElt.style.right = '0'
        }
    }
    if (winner == 1) {
        score[0]++
    }
    else if (winner == 2) {
        score[1]++
    }
    scoreOutputElt.innerHTML = `${score[0]} : ${score[1]}`
    setTimeout(resetRound, 1800)
}

function resetRound() {
    // Check if game is finished and display according messages if so
    if (currentRound == rounds) {
        document.getElementById('actionTextDraw').innerHTML = 'Game Over!'
        document.getElementById('actionTextDraw').style.color = '#000'
        setTimeout(finished, 2000)
    }
    else {
        // Refresh current round output
        currentRound++
        currentRoundOutputElt.innerHTML = `Round ${currentRound} / ${rounds}`
        // Reset everything for the next round
        computerActionElt.style.right = playerActionElt.style.left = '-280px'
        actionsContainer.style.borderLeft = actionsContainer.style.borderRight = '10px solid #000'
        document.getElementById('actionTextDraw').style.color = '#fff'
        winner = playerChoice = computerChoice = gameButtonElts[0].style.transform = gameButtonElts[1].style.transform = gameButtonElts[2].style.transform = scoreOutputElt.style.transform = null
        alreadyClicked = false
    }
}

function finished() {
    document.getElementById('gameWindow').style.display = document.getElementById('iconsAttribution').style.display = 'none'
    let messages = document.getElementById('finishedMessages')
    let msg = document.getElementById('finishedMessage')
    let msg2 = document.getElementById('finishedMessage2')
    let msg3 = document.getElementById('finishedMessage3')
    messages.style.display = 'block'
    if (rounds == 1) { // Check if only one round was played ("round" / "rounds")
        msg.innerHTML = `You played&nbsp;<strong>${rounds}</strong>&nbsp;round and`
    }
    else {
        msg.innerHTML = `You played&nbsp;<strong>${rounds}</strong>&nbsp;rounds and`
    }
    msg3.innerHTML = `against the computer.<br><br>The final score is <strong>${score[0]} : ${score[1]}</strong><br><br><br><form action="index.html"><input type="submit" value="Play again!"></form>`
    if (score[0] == score[1]) {
        msg2.innerHTML = 'tied'
        msg3.innerHTML = `with the computer.<br><br>The final score is <strong>${score[0]} : ${score[1]}</strong><br><br><br><form action="index.html"><input type="submit" value="Play again!"></form>`
    }
    else if (score[0] < score[1]) {
        msg2.innerHTML = 'lost'
    }
    else if (score[0] > score[1]) {
        msg2.innerHTML = 'won'
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}