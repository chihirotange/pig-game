/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentPlayer, currentScore, dice, diceDisplay, gameInProgress, preDice;

gameInit();

document.querySelector('.btn-new').addEventListener('click', gameInit);

document.querySelector('.btn-roll').addEventListener('click', function() {
		
	if(gameInProgress) {
		diceRoll();

		if (preDice === dice) {
			scoreTo0();
			currentScoreTo0();
			resetPreDice();
			switchPlayer();
			console.log('switch player!');
			

		} else if (dice === 6) {
			addScore();
			preDice = 6;
			document.querySelector('.dice-1').style.display = 'block';
			document.querySelector('.dice-1').src = 'dice-6.png';
		} 

		else if (dice !== 1) {
			addScore();
			resetPreDice();

		} else {
			// set current score to 0
			currentScoreTo0()
			switchPlayer();
			resetPreDice();
		}
	}
})

document.querySelector('.btn-hold').addEventListener('click', function() {

	if (gameInProgress) {
		// add current score to total score
		scores[currentPlayer] += currentScore;
		document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];

		currentScoreTo0();
		if(scores[currentPlayer] >= 100) {
			winner();
			gameInProgress = false;
		} else {
			switchPlayer();
		}
		document.querySelector('.dice-1').style.display = 'none';
	}
});

// roll random number and show on UI
function diceRoll() {

	dice = Math.floor(Math.random() * 6 + 1);
	diceDisplay = document.querySelector('.dice').src = 'dice-' + dice + '.png';
	return dice;
}

// add current dice score to score
function addScore() {

	currentScore += dice;
	document.getElementById('current-' + currentPlayer).textContent = currentScore;
}

// switch player
function switchPlayer() {

	// switch
	document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
	currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
	document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');
}

function winner() {

	document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
	document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
}

function gameInit() {

	currentPlayer = 0;
	scores = [0,0];
	currentScore = 0;
	gameInProgress = true;
	resetPreDice();
	document.getElementById('score-1').textContent = 0;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');
}

// reset current score back to 0
function currentScoreTo0() {
	currentScore = 0;
	document.getElementById('current-' + currentPlayer).textContent = currentScore;
}

function scoreTo0() {

	scores[currentPlayer] = 0;
	document.getElementById('score-'+currentPlayer).textContent = 0;
}

function resetPreDice() {

	preDice = 0;
	document.querySelector('.dice-1').style.display = 'none';
}