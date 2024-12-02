function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.sharingContainer = document.querySelector(".score-sharing");

  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continue = function () {
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "restart");
  }

  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 999999999999999999999999999999999999999999999) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;
  if (tile.value === 17) inner.textContent = "1.3";
  if (tile.value === 18) inner.textContent = "0.85";
  if (tile.value === 19) inner.textContent = "0.9";
  if (tile.value === 20) inner.textContent = "9.0";
  if (tile.value === 21) inner.textContent = "1.2";
  if (tile.value === 22) inner.textContent = "1.1";
  if (tile.value === 23) inner.textContent = "1.0";
  if (tile.value === 24) inner.textContent = "1.4";
  if (tile.value === 25) inner.textContent = "1.5";
  if (tile.value === 26) inner.textContent = "2.5";
  if (tile.value === 50) inner.textContent = "5.0";
  if (tile.value === -1) inner.textContent = " ";
  if (tile.value === -2) inner.textContent = " ";
  if (tile.value === -3) inner.textContent = " ";
  if (tile.value === -4) inner.textContent = " ";
  if (tile.value === -5) inner.textContent = " ";
  if (tile.value === -6) inner.textContent = " ";
  if (tile.value === -7) inner.textContent = " ";
  if (tile.value === -8) inner.textContent = " ";
  if (tile.value === -9) inner.textContent = " ";
  if (tile.value === -10) inner.textContent = " ";
  if (tile.value === -11) inner.textContent = " ";
  if (tile.value === -12) inner.textContent = " ";
  if (tile.value === -13) inner.textContent = " ";
  if (tile.value === -14) inner.textContent = " ";
  if (tile.value === -15) inner.textContent = " ";
  if (tile.value === -16) inner.textContent = " ";
  if (tile.value === -17) inner.textContent = " ";
  if (tile.value === -18) inner.textContent = " ";
  if (tile.value === -19) inner.textContent = " ";
  if (tile.value === -20) inner.textContent = " ";
  if (tile.value === -21) inner.textContent = " ";
  if (tile.value === -22) inner.textContent = " ";
  if (tile.value === -23) inner.textContent = " ";
  if (tile.value === -24) inner.textContent = " ";
  if (tile.value === -25) inner.textContent = " ";
  if (tile.value === -26) inner.textContent = " ";
  if (tile.value === -27) inner.textContent = " ";
  if (tile.value === -28) inner.textContent = " ";
  if (tile.value === -29) inner.textContent = " ";
  if (tile.value === -30) inner.textContent = " ";
  if (tile.value === -31) inner.textContent = " ";
  if (tile.value === -32) inner.textContent = " ";
  if (tile.value === -33) inner.textContent = " ";
  if (tile.value === -34) inner.textContent = " ";
  if (tile.value === -35) inner.textContent = " ";
  if (tile.value === -36) inner.textContent = " ";
  if (tile.value === -37) inner.textContent = " ";
  if (tile.value === -38) inner.textContent = " ";
  if (tile.value === -39) inner.textContent = " ";
  if (tile.value === -40) inner.textContent = " ";
  if (tile.value === -41) inner.textContent = " ";
  if (tile.value === -42) inner.textContent = " ";
  if (tile.value === -43) inner.textContent = " ";
  if (tile.value === -44) inner.textContent = " ";
  if (tile.value === -45) inner.textContent = " ";
  if (tile.value === -46) inner.textContent = " ";
  if (tile.value === -47) inner.textContent = " ";
  if (tile.value === -48) inner.textContent = " ";
  if (tile.value === -49) inner.textContent = " ";
  if (tile.value === -50) inner.textContent = " ";
  if (tile.value === -51) inner.textContent = " ";
  if (tile.value === -52) inner.textContent = " ";
  if (tile.value === -53) inner.textContent = " ";
  if (tile.value === -54) inner.textContent = " ";
  if (tile.value === -55) inner.textContent = " ";
  if (tile.value === -56) inner.textContent = " ";
  if (tile.value === -57) inner.textContent = " ";
  if (tile.value === -58) inner.textContent = " ";
  if (tile.value === -59) inner.textContent = " ";
  if (tile.value === -60) inner.textContent = " ";
  if (tile.value === -61) inner.textContent = " ";
  if (tile.value === -62) inner.textContent = " ";
  if (tile.value === -63) inner.textContent = " ";
  if (tile.value === -64) inner.textContent = " ";
  if (tile.value === -65) inner.textContent = " ";
  if (tile.value === -66) inner.textContent = " ";

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "0.85!" : "ap hunter...";

  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "end", type, this.score);
  }

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;

  this.clearContainer(this.sharingContainer);
  this.sharingContainer.appendChild(this.scoreTweetButton());
  twttr.widgets.load();
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};

HTMLActuator.prototype.scoreTweetButton = function () {
  var tweet = document.createElement("a");
  tweet.classList.add("twitter-share-button");
  tweet.setAttribute("href", "https://twitter.com/share");
  tweet.setAttribute("data-via", "0.85");
  tweet.textContent = "Tweet";

  var text = "I spawned " + this.score + " this many tiles on quakecraft, a game where you " +
             "subscribe to rackals! #ilovequake";
  tweet.setAttribute("data-text", text);

  return tweet;
};
