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
    this.size = x * y;

    this.board = [];

    for (let i = 0; i < this.dimX * this.dimY; i++) {
      this.board.push(null);
    }

  }

  setItem(x, y, item) {
    if (x <= this.dimX && y <= this.dimY) {
      let position = twoDimToOneDim(x, y, this.dimX);
      if (this.board[position]) {
        return false;
      } else {
        this.board[position] = item;
        return true;
      }
    } else {
      return false;
    }
  }

  getItem1D(index) {
    if (index < this.size) {
      return this.board[index];
    } else {
      return null;
    }
  }

  getItem(x, y) {
    if (x <= this.dimX && y <= this.dimY) {
      let position = twoDimToOneDim(x, y, this.dimX);
      return this.board[position];
    } else {
      return null;
    }
  }

  getSize() {
    return this.size;
  }

  getDimensions() {
    return {
      x: this.dimX,
      y: this.dimY,
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

class Item {
  constructor(name, points = 0, type) {
    this.name = name;
    this.type = type;
    this.points = 0;

    this.element = document.createElement('div');
    this.element.classList.add(this.type);
  }

  getElement() {
    return this.element;
  }

  getType() {
    return this.type;
  }

  getScore() {
    return this.points;
  }
}

class Munchie extends Item {
  constructor(name, points) {
    super(name, points, 'munchie');
  }
}

class Blob extends Item {
  constructor() {
    super('blob', 0, 'blob');
  }
}

class MunchieGobblerGame {

  /*
   * Initialize the game page
   * Attach event handlers
   */
  constructor() {
    buildTitle(gameName);

    this.setMenu();
    buildMenu(this.menu);

    buildPlayingField();

    this.setOptions();
    buildOptions(this.options);

    this.setInstructions();
    buildInstructions(this.instructions);

    buildFooter();
  }

  /*
   * Generate a new board
   */
  startGame() {
    console.log('New Game');

    this.gameBoard = new GameBoard(this.options.boardX, this.options.boardY);

    this.player = 'Player 1';

    let blobCoods = randomizeCoordinates(this.gameBoard.getDimensions());

    this.blob = {
      blobX: blobCoods.x,
      blobY: blobCoods.y,
      blob: new Blob(),
    }

    this.gameBoard.setItem(
      this.blob.blobX,
      this.blob.blobY,
      this.blob.blob);

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


    // Generate Munchies

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

    let range = {
      upper: this.gameBoard.getSize() * .15,
      lower: this.gameBoard.getSize() * .05,
    }
    let munchieCount = randomizeInt(range);

    let upperLimit = munchieCount + (munchieCount / 2);
    for (let i = 0; i < munchieCount && i < upperLimit; i++) {
      let coord = randomizeCoordinates(this.gameBoard.getDimensions());
      if (!this.gameBoard.getItem(coord.x, coord.y)) {
        this.gameBoard.setItem(coord.x, coord.y, new Munchie('candy', 1));
      } else {
        munchieCount++;
      }
    }

    showBoard(this.gameBoard);

  }

  /*
   *
   */
  switchPlayer() {
    switch (this.player) {
      case 'Player 1':
        this.player = 'Player 2';
        break;
      default:
        this.player = 'Player 1';
    }
  }

  takeTurn() {}

  setMenu() {
    this.menu = new Menu();
    this.menu.addItem({
      title: 'Options',
      type: 'click',
      icon: 'fa-cog',
      action: this.displayOptions.bind(this),
      float: 'right',
    });
    this.menu.addItem({
      title: 'Instructions',
      type: 'click',
      icon: 'fa-file-alt',
      action: this.displayInstructions.bind(this),
      float: 'right',
    })
  }

  setOptions() {
    this.options = {
      boardX: 7,
      boardY: 7,
      obstacles: 'none',
      munchies: 'average',
      buttons: [{
          text: 'Cancel',
          style: 'button-2',
          action: this.displayOptions.bind(this),
        },
        {
          text: 'Save',
          style: 'button-1',
          action: this.displayOptions.bind(this),
        }
      ],
      show: false,
    };
  }

  displayOptions() {
    this.options.show = !this.options.show;
    this.instructions.show = false;
    showPage(this.options.show, this.instructions.show);
  }

  setInstructions() {
    this.instructions = {
      title: 'Munchie Gobbler: Instructions',
      paragraphs: [{
          heading: 'Game Board',
          text: '',
        },
        {
          heading: 'Gameplay',
          text: '',
        }
      ],
      buttons: [{
        text: 'Done',
        style: 'button-1',
        action: this.displayInstructions.bind(this),
      }, ],
      show: false,
    };
  }

  displayInstructions() {
    this.instructions.show = !this.instructions.show;
    this.options.show = false;
    showPage(this.options.show, this.instructions.show);
  }

}

let thisGame = new MunchieGobblerGame();
// thisGame.startGame();