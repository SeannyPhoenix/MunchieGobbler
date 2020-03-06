class Players {
  constructor() {
    this.player1 = {
      name: 'Player 1',
      munchies: [],
      score: 0,
    };
    this.player2 = {
      name: 'Player 2',
      munchies: [],
      score: 0,
    };
    this.current = null;
  }

  name() {
    return this.current.name;
  }

  switch () {
    if (!this.current || this.current === this.player2) {
      // Player 1 if there is no player or if Player 2 just went
      this.current = this.player1;
    } else {
      // Otherwise, it's clearly Player 2
      this.current = this.player2;
    }
  }

  gobble(munchie) {
    this.current.munchies.push(munchie);
    this.current.score += munchie.getScore();
    //this.current.score = this.current.munchies.map(munchie => munchie.getScore()).reduce((a, b) => a + b, 0);
  }

  score() {
    return this.current.score;
  }

  scores() {
    return {
      player1: this.player1.score,
      player2: this.player2.score,
    }
  }

  winner() {
    if (this.player1.score > this.player2.score) {
      return {
        name: this.player1.name,
        score: this.player1.score,
      }
    } else if (this.player2.score > this.player1.score) {
      return {
        name: this.player2.name,
        score: this.player2.score,
      }
    } else {
      //There is a tie!
      return {
        name: 'Both players',
        score: player1.score,
      }
    }
  }
}