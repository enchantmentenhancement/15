function GameManager(size, InputManager, Actuator, ScoreManager) {
  this.size         = size; // Size of the grid
  this.inputManager = new InputManager;
  this.scoreManager = new ScoreManager;
  this.actuator     = new Actuator;

  this.startTiles   = 1;

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));

  this.setup();
}

// Restart the game
GameManager.prototype.restart = function () {
  this.actuator.continue();
  this.setup();
};

// Keep playing after winning
GameManager.prototype.keepPlaying = function () {
  this.keepPlaying = true;
  this.actuator.continue();
};

GameManager.prototype.isGameTerminated = function () {
  if (this.over || (this.won && !this.keepPlaying)) {
    return true;
  } else {
    return false;
  }
};

// Set up the game
GameManager.prototype.setup = function () {
  this.grid        = new Grid(this.size);

  this.score       = 0;
  this.over        = false;
  this.won         = false;
  this.keepPlaying = false;

  // Add the initial tiles
  this.addStartTiles();

  // Update the actuator
  this.actuate();
};

// Set up the initial tiles to start the game with
GameManager.prototype.addStartTiles = function () {
  for (var i = 0; i < this.startTiles; i++) {
    this.addRandomTile();
  }
};

// Adds a tile in a random position
GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
    var value = Math.random() < 0.999999999999 ? Math.random() < 0.99999999999 ? Math.random() < 0.99999999998 ? Math.random() < 0.99999999995 ? Math.random() < 0.99999999993333333333333333333333 ? Math.random() < 0.9999999999 ? Math.random() < 0.999999999875 ? Math.random() < 0.9999999998 ? Math.random() < 0.99999999975 ? Math.random() < 0.9999999995 ? Math.random() < 0.999999999 ? Math.random() < 0.99999999880952381 ? Math.random() < 0.9999999986666666666666666666666666 ? Math.random() < 0.99999999857142857142857142 ? Math.random() < 0.999999998333333333333333333333 ? Math.random() < 0.9999999981818181818181818181 ? Math.random() < 0.999999998 ? Math.random() < 0.99999999761904761904 ? Math.random() < 0.99999999722222222222222222222222 ? Math.random() < 0.999999996875 ? Math.random() < 0.9999999966666666666666666666666666666 ? Math.random() < 0.999999996363636363636363 ? Math.random() < 0.999999996 ? Math.random() < 0.999999995555555555555555555555 ? Math.random() < 0.999999995 ? Math.random() < 0.9999999944444444444444444444444 ? Math.random() < 0.99999999375 ? Math.random() < 0.99999999285714285714285714 ? Math.random() < 0.999999991666666666666666666666 ? Math.random() < 0.99999999 ? Math.random() < 0.9999999875 ? Math.random() < 0.99999998333333333333333 ? Math.random() < 0.99999998 ? Math.random() < 0.99999995 ? Math.random() < 0.999999875 ? Math.random() < 0.999999 ? Math.random() < 0.99995 ? Math.random() < 0.9995 ? Math.random() < 0.9984 ? 1 : Math.random() < 0.999999 ? 2 : 98 : Math.random() < 0.9999975 ? Math.random() < 0.8 ? 3 : 4 : 3434343434 : Math.random() < 0.99995 ? Math.random() < 0.9 ? Math.random() < 0.8 ? 5 : 6 : Math.random() < 0.75 ? 7 : 8 : 11/2 : Math.random() < 0.98 ? Math.random() < 0.9 ? Math.random() < 0.8 ? 9 : 10 : Math.random() < 0.75 ? 11 : 12 : Math.random() < 0.8333333333333333333333333333333333333 ? Math.random() < 0.66666666666666666666666666666 ? 13 : 14 : Math.random() < 0.666666666666666666666 ? 15 : 16 : 49 : Math.random() < 0.9833333333333333333 ? Math.random() < 0.91666666666666666666 ? 33 : Math.random() < 0.91666666666666666666 ? 34 : Math.random() < 0.9166666666666666666666 ? 35 : 36 : 32 : 70 : 19 : 20 : 21 : 79 : 80 : 31 : 48 : 56 : 22 : Math.random() < 0.5 ? 71 : 72 : 37 : 40 : Math.random() < 0.5 ? 29 : 30 : 23 : 63 : 73 : 62 : 88 : 26 : 83 : 66 : -1 : -2 : 42 : 55 : 84 : 90 : 91 : 5000 : 10000 : 97;
    var tile = new Tile(this.grid.randomAvailableCell(), value);
    
    this.grid.insertTile(tile);
  }
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  if (this.scoreManager.get() < this.score) {
    this.scoreManager.set(this.score);
  }

  this.actuator.actuate(this.grid, {
    score:      this.score,
    over:       this.over,
    won:        this.won,
    bestScore:  this.scoreManager.get(),
    terminated: this.isGameTerminated()
  });

};

// Save all tile positions and remove merger info
GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

// Move a tile and its representation
GameManager.prototype.moveTile = function (tile, cell) {
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};

// Move tiles on the grid in the specified direction
GameManager.prototype.move = function (direction) {
  // 0: up, 1: right, 2:down, 3: left
  var self = this;

  if (this.isGameTerminated()) return; // Don't do anything if the game's over

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);

        // Only one merger per row traversal?
        if (next && next.value === tile.value && !next.mergedFrom) { 
          var merged = new Tile(positions.next, tile.value + 0);
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);

          // Update the score
          self.score += merged.value;

          // The mighty 10 tile
          if (merged.value === 10) self.won = true;
        } else {
          self.moveTile(tile, positions.farthest);
        }

        if (!self.positionsEqual(cell, tile)) {
          moved = true; // The tile moved from its original cell!
        }
      }
    });
  });

  if (moved) {
    this.addRandomTile();

    if (!this.movesAvailable()) {
      this.over = true; // Game over!
    }

    this.actuate();
  }
};

// Get the vector representing the chosen direction
GameManager.prototype.getVector = function (direction) {
  // Vectors representing tile movement
  var map = {
    0: { x: 0,  y: -1 }, // up
    1: { x: 1,  y: 0 },  // right
    2: { x: 0,  y: 1 },  // down
    3: { x: -1, y: 0 }   // left
  };

  return map[direction];
};

// Build a list of positions to traverse in the right order
GameManager.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // Always traverse from the farthest cell in the chosen direction
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

GameManager.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  // Progress towards the vector direction until an obstacle is found
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (this.grid.withinBounds(cell) &&
           this.grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell // Used to check if a merge is required
  };
};

GameManager.prototype.movesAvailable = function () {
  return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

// Check for available matches between tiles (more expensive check)
GameManager.prototype.tileMatchesAvailable = function () {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; // These two tiles can be merged
          }
        }
      }
    }
  }

  return false;
};

GameManager.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};
