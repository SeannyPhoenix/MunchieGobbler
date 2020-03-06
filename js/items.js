const munchieStyles = {
  sweet: {
    apple: {
      points: 1,
      style: 'fas',
      icon: 'fa-apple-alt',
    },
    candyCane: {
      points: 2,
      style: 'fas',
      icon: 'fa-candy-cane',
    },
    cookie: {
      points: 3,
      style: 'fas',
      icon: 'fa-cookie',
    },
    iceCream: {
      points: 4,
      style: 'fas',
      icon: 'fa-ice-cream',
    },
    pie: {
      points: 5,
      style: 'fas',
      icon: 'fa-stroopwafel'
    },
    birthdayCake: {
      points: 10,
      style: 'fas',
      icon: 'fa-birthday-cake',
    },
    lemon: {
      points: -2,
      style: 'fas',
      icon: 'fa-lemon',
    },
  },
  savory: {
    cheese: {
      points: 1,
      style: 'fas',
      icon: 'fa-cheese',
    },
    hotdog: {
      points: 2,
      style: 'fas',
      icon: 'fa-hotdog',
    },
    pizza: {
      points: 3,
      style: 'fas',
      icon: 'fa-pizza-slice',
    },
    hamburger: {
      points: 5,
      style: 'fas',
      icon: 'fa-hamburger',
    },
    bone: {
      points: -3,
      style: 'fas',
      icon: 'fa-bone',
    },
  },
}

class Item {
  constructor(type, category, name) {
    switch (type) {
      case 'blob':
        this.name = 'blob';
        this.classList = ['fas', 'fa-splotch'];
        break;
      case 'munchie':
        this.type = type;
        this.munchie = this.pickRandom(category);
        this.name = this.munchie.name;
        // this.points = this.munchie.points;
        this.points = 5;
        this.classList = [
          this.munchie.style,
          this.munchie.icon,
        ];
        break;
      case 'blocker':
        this.type = type;
        this.classList = ['far', 'fa-times-circle'];
    }
    this.element = document.createElement('div');
    this.element.classList.add(type, ...this.classList);
  }

  pickRandom(category) {
    let options = Object.keys(munchieStyles[category]);
    let size = options.length;
    let index = randomizeInt({
      lower: 0,
      upper: size - 1
    });
    return Object.values(munchieStyles[category])[index];
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
  constructor(category, name) {
    super('munchie', category, name);
  }
}

class Blob extends Item {
  constructor() {
    super('blob');
  }
}

class Blocker extends Item {
  constructor() {
    super('blocker');
  }
}