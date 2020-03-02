const gameName = 'Munchie Gobbler';

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
    setFooter();
    this.options = {
      boardX: 10,
      boardY: 10,
      obstacles: 'none',
      munchies: 'average',
    }
  }

  /*
   * Generate a new board
   */
  startGame() {
    console.log('New Game');

    let boardX = this.options.boardX;
    let boardY = this.options.boardY;

    console.log(`Board: ${boardX} by ${boardY}`);
    //createBoard(this.options.boardX, this.options.boardY);
    console.log(`Obstacles: ${this.options.obstacles}`);
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