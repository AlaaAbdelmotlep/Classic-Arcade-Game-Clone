let gameScore = 0,
	lives = 5, 
	livesLeft = document.querySelector('.lives > span'),
	score = document.querySelector('.score > span');

//enemy class
//it require update() , render()  method
//rander for drowing enemy image ,, update for set the movement and check collision.

class Enemy {
	//x is row ,, movement of enemy ,, y is col 
	constructor(x, y, movement) {
		this.x = x;
		this.y = y;
		this.movement = movement;
		//to lode image
		this.sprite = 'images/enemy-bug.png';
	}

	update(dt) {
		//multiplay any movement by dt parameter to ensure
		//that emeny run at same movment for all computer
		this.x += this.movement * dt;
		//set the available lives
		livesLeft.innerText = lives;
		//reset the position of enemy when it reach to end of row(500)
		//to begine from the left again ,, set it to (-150) to be hide
		//then set its movement to (150) first to be apper
		//using math.random to get random value * max-movment
		//using math.floor to get num without decimal.
		//set +600 for hard ,, +200 for easy level
		if (this.x > 500) {
			this.x = -150;
			this.movement = 150 + Math.floor(Math.random() * 400);
		}

		//Checks collisons and restarts player at the bottom
		//we should check the collision from x and y dimensions
		//these value to make sence of collision ,, without them collision won't happen
		if (player.x < this.x + 60 &&
			player.x + 30 > this.x &&
			player.y < this.y + 30 &&
			30 + player.y > this.y) {
			player.x = 200;
			player.y = 400;
			lives--;
			livesLeft.innerText = lives;
			if (lives === 0) {
				//will reset game to intial state
				//apper as model
				confirm(`Game Over! Do you want to play again?`);
				lives = 5;
				gameScore = 0;
				livesLeft.innerText = lives;
				score.innerText = '';
			}
		}
	}
	// Draw the enemy on the screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

//player class 
//it require update() , render() method
//update() to control movement of player, rander() to drow player image on screen
class Player {
	constructor(x, y, movement) {
		this.x = x;
		this.y = y;
		this.movement = movement;
		//to lode image
		this.sprite = 'images/char-boy.png';
	}
	update() {
		//set diminial for player left/right/bottom/top the canvas
		if (this.y > 380) {
			this.y = 380;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		// Once player reaches the water, 10 points will be added to game score
		if (this.y < 0) {
			this.x = 200;
			this.y = 380;
			gameScore++;
			score.innerText = gameScore * 10;
			if (gameScore === 10 && lives > 0) {
				confirm('You won the game!');
				lives = 5;
				gameScore = 0;
				livesLeft.innerText = lives;
				score.innerText = '';
			}
		}
	}
	//move player with key arrow
	arrowInput(keyInput) {
		switch (keyInput) {
			case 'left':
				this.x -= this.movement + 50;
				break;
			case 'up':
				this.y -= this.movement + 30;
				break;
			case 'right':
				this.x += this.movement + 50;
				break;
			case 'down':
				this.y += this.movement + 30;
				break;
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

//listens for input arrow and sends the input to Player.arrowInput() method.

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.arrowInput(allowedKeys[e.keyCode]);
});
 
// Now instantiate your objects.
let allEnemies = [];
// Canvas position of created enemies and player x, y, movement
let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);

//Creates array of enemy objects
enemyPosition.forEach((yPosition) => {
	let enemy = new Enemy(0, yPosition, 100 + Math.floor(Math.random() * 400));
	allEnemies.push(enemy);
});
