let rounds
let currentRound = 1
let score = [0, 0]
let currentRoundOutputElt = document.getElementById('currentRoundOutput')
let scoreOutputElt = document.getElementById('scoreOutput')
let winner // 0 = draw  1 = player wins  2 = computer wins
let playerActionElt = document.getElementById('playerAction')
let computerActionElt = document.getElementById('computerAction')
let alreadyClicked = false

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
        // Get user choice and computer random choice and set images accordingly
        let playerChoice
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
        let computerChoice
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
        // Set visuals slide in
        computerActionElt.style.right = '0'
        playerActionElt.style.left = '0'
        // Detect round winner
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
        // Call functions to give player feedback about current score and round and to reset stuff
        setTimeout(colorize, 500)
    }
}
function colorize() {
    if (winner == 1) {
        playerActionElt.style.borderBottom = '10px solid #0c0'
        computerActionElt.style.borderBottom = '10px solid #c00'
    }
    else if (winner == 2) {
        playerActionElt.style.borderBottom = '10px solid #c00'
        computerActionElt.style.borderBottom = '10px solid #0c0'
    }
    else {
        playerActionElt.style.borderBottom = computerActionElt.style.borderBottom = '10px solid #00c'
    }
    // Score output: score[player, computer]
    if (winner == 1) {
        score[0]++
    }
    else if (winner == 2) {
        score[1]++
    }
    scoreOutputElt.innerHTML = `${score[0]} : ${score[1]}`
    setTimeout(reset, 1500)
}
function reset() {
    // Refresh current round output
    currentRound++
    currentRoundOutputElt.innerHTML = `Round ${currentRound} / ${rounds}`
    // Check if game is finished and display according messages if so
    if (currentRound > rounds) {
        document.getElementById('gameWindow').style.display = 'none'
        document.getElementById('iconsAttribution').style.display = 'none'
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
    // Reset everything for the next round
    computerActionElt.style.right = '-280px'
    playerActionElt.style.left = '-280px'
    playerActionElt.style.borderBottom = computerActionElt.style.borderBottom = '10px solid #fff'
    winner = null
    playerChoice = null
    computerChoice = null
    alreadyClicked = false
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}