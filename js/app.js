// Enemies our player must avoid
let Enemy = function (x, y, movSpd) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Position information
    this.x = x;
    this.y = y;
    //Movement speed
    this.movementSpeed = movSpd;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Get the speed
    this.x += speedCalculator(this.movementSpeed) * dt;
    if (this.x > 606) {
        this.x = -120;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
    this.sprite = 'images/char-cat-girl.png';
    //Establish position
    this.x = x;
    this.y = y;
    //Establish whether dead or winning
    this.dead = false;
    this.victory = false;
};

Player.prototype.update = function (dt) {
    this.victory = hasWon(player);
    allEnemies.forEach((enemy) => {
        //Check if the player has collided with an enemy
        if (collideCol(player, enemy) && collideRow(player, enemy)) {
            //Collided and dead
            this.dead = true;
        }
    });
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    //Move between tiles depending on direction
    switch (direction) {
        case "left":
            if (this.x > 100) {
                this.x -= 101;
            }
            break;
        case "up":
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case "right":
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case "down":
            if (this.y < 320) {
                this.y += 83;
            }
            break;
    }
};

//Reset player position and characteristics
Player.prototype.reset = function () {
    player.x = columns[2];
    player.y = rows[4];
    player.dead = false;
    player.victory = false;
};

//Display a win message if make it to the water
Player.prototype.win = function() {
    window.alert("YOU WIN!!!");
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Initialize the rows coordinates
let rows = [];
for (let i = 0; i < 6; i++) {
    rows[i] = calculateRow(i + 1);
}
//Initialize the column coordinates
let columns = [];
for (let i = 0; i < 5; i++) {
    columns[i] = calculateColumn(i);
}

//Initialize the players and enemies
let player = new Player(columns[2], rows[4]);
let allEnemies = [
    new Enemy(columns[0], rows[0], "slow"),
    new Enemy(columns[1], rows[0], "normal"),
    new Enemy(columns[2], rows[1], "normal"),
    new Enemy(columns[3], rows[1], "fast"),
    new Enemy(columns[4], rows[2], "slow"),
    new Enemy(columns[5], rows[2], "fast")
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Helper Functions

//Calculates the row coordinate based on square index
function calculateRow(row) {
    return (row * 83) - 20;
}

//Calculate the column coordinate based on square index
function calculateColumn(col) {
    return col * 101;
}

//Calculate speed based on entry string
function speedCalculator(speed) {
    switch (speed) {
        case "slow":
            return 120;
        case "normal":
            return 180;
        case "fast":
            return 240;
    }
}

//Check to see if the player has collided on the x axis
function collideCol(player, enemy) {
    let e = {
        lowX: enemy.x,
        hiX: enemy.x + 101
    };
    let p = {
        lowX: player.x + 20,
        hiX: player.x + 101
    };

    if (p.lowX < e.hiX && p.lowX > e.lowX) {
        return true;
    } else return p.hiX > e.lowX && p.hiX < e.hiX;
}

//Check to see if the player has collided on the y axis
function collideRow(player, enemy) {
    return player.y === enemy.y;
}

//Check to see if the player has won
function hasWon(player) {
    if(player.y<=-20){
        return true;
    }
}