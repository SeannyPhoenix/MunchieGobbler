const elems = {
  title: document.querySelector('title'),
  header: document.querySelector('header'),
  menu: document.querySelector('nav'),
  main: document.querySelector('main'),
  leftBar: null,
  playingField: null,
  rightBar: null,
  footer: document.querySelector('footer'),
}

/*
 * Sets the title and header content
 */
function setTitle(gameTitle) {
  elems.title.innerText = gameTitle;
  let title = document.createElement('h1');
  title.innerText = gameTitle;
  elems.header.appendChild(title);
  let sub = document.createElement('h4');
  sub.innerText = 'a game by Seanny Drakon Phoenix';
  elems.header.appendChild(sub);
}

function setMenu(menu) {

  menu.addItem({
    title: 'Options',
    type: 'click',
    icon: 'fa-cog',
    action: null,
  });

  menu.getAllItems().forEach((menuItem, i) => {
    let header, icon, text;
    switch (menuItem.type) {
      case 'heading':
        header = document.createElement('div');
        header.className = 'menu-level-1';
        icon = document.createElement('i');
        icon.classList.add('fas', menuItem.icon);
        text = document.createElement('p');
        text.innerText = menuItem.title;
        header.appendChild(icon);
        header.appendChild(text);
        elems.menu.appendChild(header);
        break;
      case 'click':
        header = document.createElement('div');
        header.className = 'menu-level-1';
        icon = document.createElement('i');
        icon.classList.add('fas', menuItem.icon);
        text = document.createElement('p');
        text.innerText = menuItem.title;
        header.appendChild(icon);
        header.appendChild(text);
        elems.menu.appendChild(header);
        break;
      default:
        break;
    }
  });
}

function initializePlayingField() {
  elems.leftBar = document.createElement('aside');
  elems.playingField = document.createElement('div');
  elems.playingField.classList.add('playing-field');
  elems.rightBar = document.createElement('aside');
  elems.main.appendChild(elems.leftBar);
  elems.main.appendChild(elems.playingField);
  elems.main.appendChild(elems.rightBar);
}

function setFooter() {

  //Copyright Info
  let copyright = document.createElement('p');
  copyright.className = 'copyright';
  copyright.innerHTML = '&#169;	2020 Seanny Drakon Phoenix';
  elems.footer.appendChild(copyright);

  //GA Link
  let gaLink = document.createElement('a');
  gaLink.className = 'ga-link';
  gaLink.href = 'https://generalassemb.ly/';
  gaLink.target = '_blank';
  gaLink.addEventListener('mouseover', () => activateIcon(gaLinkIcon));
  gaLink.addEventListener('mouseout', () => deactivateIcon(gaLinkIcon));

  let gaIcon = document.createElement('div');
  gaIcon.className = 'ga-icon';
  gaLink.appendChild(gaIcon);

  let gaText = document.createElement('p');
  gaText.className = 'ga-link-text';
  gaText.innerHTML = 'General Assembly';
  gaLink.appendChild(gaText);

  let gaLinkIcon = document.createElement('i');
  gaLinkIcon.classList.add('fas', 'fa-external-link-alt', 'ga-link-icon');
  gaLink.appendChild(gaLinkIcon);

  elems.footer.appendChild(gaLink);
}

function activateIcon(icon) {
  icon.classList.add('show');
}

function deactivateIcon(icon) {
  icon.classList.remove('show');
}

function showBoard(board) {
  let gameBoard = document.createElement('div');
  gameBoard.classList = 'game-board';

  // Set up the number of columns
  let gridColumns = '';
  for (let i = 0; i < board.dimX; i++) {
    gridColumns += '1fr ';
  }
  gameBoard.setAttribute('style', `grid-template-columns: ${gridColumns};`);

  // Create and add squares
  let row = [];
  let munchieCount = 0;

  for (let i = 0; i < board.dimX * board.dimY; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.id = `sq${i}`;
    item = board.getItem1D(i);
    if (item) {
      if (item.getType() === 'munchie') {
        munchieCount++;
      }
      square.classList.add(item.getType());
    }
    row.push(square);
    gameBoard.appendChild(square);
  }
  elems.playingField.append(gameBoard);
}