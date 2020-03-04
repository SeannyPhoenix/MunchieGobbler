const elems = {
  doc: document,
  title: document.querySelector('title'),
  header: document.querySelector('header'),
  menu: document.querySelector('nav'),
  main: document.querySelector('main'),
  footer: document.querySelector('footer'),
}

const eventHandlers = {

}

/*
 * Sets the title and header content
 */
function buildTitle(gameTitle) {
  elems.title.innerText = gameTitle;
  let title = document.createElement('h1');
  title.innerText = gameTitle;
  elems.header.appendChild(title);
  let sub = document.createElement('p');
  sub.innerText = 'a game by Seanny Drakon Phoenix';
  elems.header.appendChild(sub);
}

/*
 * Build Menu
 */

function buildMenu(menu) {
  menu.getAllItems().forEach((menuItem, i) => {
    let header, icon, text;
    header = document.createElement('div');
    header.className = 'menu-level-1';
    icon = document.createElement('i');
    icon.classList.add('fas', menuItem.icon);
    text = document.createElement('p');
    text.innerText = menuItem.title;
    header.appendChild(icon);
    header.appendChild(text);
    header.setAttribute('style', `float: ${menuItem.float};`);
    elems.menu.appendChild(header);
    switch (menuItem.type) {
      case 'heading':
        header.addEventListener('mouseover', null);
        header.addEventListener('mouseout', null);
        break;
      case 'click':
        header.addEventListener('click', menuItem.action)
        break;
      default:
        break;
    }
  });
}

function buildPlayingField() {
  elems.leftBar = document.createElement('aside');
  elems.leftBar.className = 'left-bar';
  elems.playingField = document.createElement('div');
  elems.playingField.classList.add('playing-field');
  elems.rightBar = document.createElement('aside');
  elems.rightBar.className = 'right-bar';
  elems.promptList = document.createElement('aside');
  elems.promptList.className = 'prompt-list';

  elems.main.appendChild(elems.leftBar);
  elems.main.appendChild(elems.playingField);
  elems.main.appendChild(elems.rightBar);
  elems.main.appendChild(elems.promptList);
}

/*
 * Build Options Page
 */
function buildOptions(options) {
  elems.options = document.createElement('div');
  elems.options.classList.add('page', 'options');
  elems.playingField.appendChild(elems.options);

  options.buttons.forEach(button => {
    let btn = document.createElement('button');
    btn.classList.add(button.style);
    btn.addEventListener('click', button.action);
    btn.innerText = button.text;
    elems.options.appendChild(btn);
  });
}

/*
 * Build Instructions Page
 */
function buildInstructions(instructions) {
  elems.instructions = document.createElement('div');
  elems.instructions.classList.add('page', 'instructions');
  elems.playingField.appendChild(elems.instructions);

  let title = document.createElement('h2');
  title.innerText = instructions.title;
  elems.instructions.appendChild(title);

  instructions.paragraphs.forEach(paragraph => {
    let heading = document.createElement('h3');
    heading.innerText = paragraph.heading;
    elems.instructions.appendChild(heading);

    let text = document.createElement('p');
    text.innerText = paragraph.text;
    elems.instructions.appendChild(text);
  })

  instructions.buttons.forEach(button => {
    let btn = document.createElement('button');
    btn.classList.add(button.style);
    btn.addEventListener('click', button.action);
    btn.innerText = button.text;
    elems.instructions.appendChild(btn);
  });
}

/*
 * Build Prompt
 */
function buildPromptList(prompt) {

}

/*
 * Build Footer
 */
function buildFooter() {
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

/*
 * Build Event Handlers
 */
function buildEventHandlers(events) {
  Object.keys(events).forEach(eventType => {
    eventHandlers[eventType] = (event) => {
      try {
        events[eventType][event.code]();
      } catch {}
    };
    document.addEventListener(eventType, eventHandlers[eventType]);
  });
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
  let queue = new DoQueue(10, 20);
  for (let i = 0; i < board.dimX * board.dimY; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.id = `sq${i}`;
    item = board.getItem1D(i);
    if (item) {
      let itemDiv = document.createElement('div');
      itemDiv.classList.add(item.getType());
      square.appendChild(itemDiv);
    }
    queue.addToQueue(() => {
      gameBoard.appendChild(square);
    });
  }
  elems.playingField.append(gameBoard);
}

function showPage(options, instructions) {
  let mainElements = document.querySelectorAll('aside');
  for (let i = 0; i < mainElements.length; i++) {
    if (options || instructions) {
      mainElements[i].classList.add('fade');
    } else {
      mainElements[i].classList.remove('fade');
    }
  }
  if (options) {
    elems.options.classList.add('show');
    elems.instructions.classList.remove('show');
  } else if (instructions) {
    elems.options.classList.remove('show');
    elems.instructions.classList.add('show');
  } else {
    elems.options.classList.remove('show');
    elems.instructions.classList.remove('show');
  }
}

function updatePromptStart(prompt) {
  let lines = elems.promptList.children;
  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.add('leave');
  }
  let welcome = document.createElement('h1');
  welcome.innerText = prompt.welcome;
  welcome.classList.add('prompt');
  setTimeout(() => {
    for (let i = 0; i < lines.length; i++) {
      lines[i].remove();
    }
    elems.promptList.appendChild(welcome);
  }, 700);
}

function updatePromptPlayer(prompt, player) {
  let lines = elems.promptList.children;
  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.add('leave');
  }
  let line1 = document.createElement('h3');
  line1.innerText = player;
  line1.classList.add('prompt');
  let line2 = document.createElement('h3');
  line2.innerText = prompt.playerLine2;
  line2.classList.add('prompt');
  let line3 = document.createElement('h3');
  line3.innerText = prompt.playerLine3;
  line3.classList.add('prompt');
  setTimeout(() => {
    for (let i = 0; i < lines.length; i++) {
      lines[i].remove();
    }
    elems.promptList.appendChild(line1);
    elems.promptList.appendChild(line2);
    elems.promptList.appendChild(line3);
  }, 700);
}

function updatePromptPause(prompt) {
  let lines = elems.promptList.children;
  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.add('leave');
  }
  let pause = document.createElement('h2');
  pause.innerText = prompt.pause;
  pause.classList.add('prompt');
  setTimeout(() => {
    for (let i = 0; i < lines.length; i++) {
      lines[i].remove();
    }
    elems.promptList.appendChild(pause);
  }, 700);
}