const menu = [{
    title: 'All Games',
    type: 'heading',
    icon: 'fa-dice',
    action: [{
        title: 'Munchie Gobbler',
        type: 'link',
        action: null,
      },
      {
        title: 'SPACEBATTLE',
        type: 'current',
        action: null,
      }
    ],
    float: 'left',
  },
  {
    title: 'Seanny',
    type: 'heading',
    icon: 'fa-globe-americas',
    action: [{
        title: 'Facebook',
        type: 'link',
        action: 'https://www.facebook.com/ThatSeannyBoy',
      },
      {
        title: 'LinkedIn',
        type: 'link',
        action: 'https://www.linkedin.com/in/seannyphoenix/',
      },
      {
        title: 'Instagram',
        type: 'link',
        action: 'https://www.instagram.com/thatseannyboy/',
      },
    ],
    float: 'left',
  },
];


class Menu {
  constructor() {
    super.constructor();
    this.menu = menu;
  }

  addItem(item) {
    menu.push(item);
  }

  getAllItems() {
    //return a copy of the menu; we don't want anyone modifying it externally
    return menu.slice();
  }
}