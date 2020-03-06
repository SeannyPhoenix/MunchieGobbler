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
  }
}

class Item {
  constructor(name, points = 0, type) {
    this.name = name;
    this.type = type;
    this.points = points;

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