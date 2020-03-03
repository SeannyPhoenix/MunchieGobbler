const gameName = 'Munchie Gobbler';

class GameBoard {

  /*
   * The board is displayed with 0, 0 at the top left corner.
   * x represents the column, and y represents the row.
   *
   *    0  1  2  3  4
   *
   *    5  6  7  8  9
   *
   * ^ 10 11 12 13 14
   * |
   * y 15 16 17 18 19
   *   x - >
   */

  constructor(x, y) {
    this.dimX = x;
    this.dimY = y;

    this.board = [];

    for (let i = 0; i < this.dimX * this.dimY; i++) {
      this.board.push(null);
    }
  }

  setItem(x, y, item) {
    if (x <= this.dimX && y <= this.dimY) {
      let position = (this.dimX * x) + y;
      if (this.board.position) {
        return false;
      } else {
        this.board[position] = item;
        return true;
      }
    } else {
      return false;
    }
  }

  getItem(x, y) {
    if (x <= this.dimX && y <= this.dimY) {
      let position = (this.dimX * x) + y;
      return this.board[position];
    } else {
      return null;
    }
  }

  displayInfo() {
    return {
      dimX: this.dimX,
      dimY: this.dimY,
      board: this.board.slice(),
    };
  }
}

class Munchie {
  constructor(name, points) {
    super.constructor();
    this.name = name;
    this.points = points;

    let munchie = document.createElement('div');
    munchie.classList.add('munchie');
    this.element = munchie;
  }

  getElement() {
    return this.element;
  }

  getScore() {
    return this.points;
  }

}

class Blog {
  constructor() {
    super.constructor();
  }
}

class MunchieGobblerGame {

  /*
   * Initialize the game page
   * Attach event handlers
   */
  constructor() {
    super.constructor();

    this.menu = new Menu();
    setTitle(gameName);
    setMenu(this.menu);
    initializePlayingField();
    setFooter();
    this.options = {
      boardX: 7,
      boardY: 7,
      obstacles: 'none',
      munchies: 'average',
    }
  }

  /*
   * Generate a new board
   */
  startGame() {
    console.log('New Game');

    this.gameBoard = new GameBoard(this.options.boardX, this.options.boardY);

    showBoard(this.gameBoard);

    switch (this.options.obstacles) {
      case 'none':
        break;
      case 'mild':
        break;
      case 'medium':
        break;
      case 'spicy':
        break;
      case 'hell fire':
        break;
      default:
        break;
    }

    console.log(`Munchies: ${this.options.munchies}`);
    switch (this.options.munchies) {
      case 'average':
        break;
      case 'sweets':
        break;
      case 'sweet and sour':
        break;
      case 'savory':
        break;
      default:
        break;
    }
  }

  /*
   *
   */
  setPlayer() {}

  takeTurn() {}

  displayOptions() {}

}

let thisGame = new MunchieGobblerGame();

thisGame.startGame();