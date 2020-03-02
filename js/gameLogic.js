const gameName = 'Munchie Gobbler';

class MunchieGobblerGame {
  constructor() {
    super.constructor();
    setTitle(gameName);
    setMenu();
    setFooter();
  }
}

let thisGame = new MunchieGobblerGame();