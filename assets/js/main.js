let rounds

function displayChosenRounds() {
    document.getElementById('roundsOutput').innerHTML = rounds = document.getElementById('roundsInput').value
}

function startGame() {
    document.getElementById('roundsOption').style.display = 'none'
    document.getElementById('gameWindow').style.display = 'flex'
}