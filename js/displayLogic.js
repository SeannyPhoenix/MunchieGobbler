const elems = {
  doc: document,
  title: document.querySelector('title'),
  header: document.querySelector('header'),
  menu: document.querySelector('nav'),
  main: document.querySelector('main'),
  footer: document.querySelector('footer'),
}

const eventHandlers = {};

const currentMove = {
  direction: null,
  spaces: [],
  hasMoves: function() {
    return !!this.direction;
  },
  reset: function() {
    this.direction = null;
    this.spaces = [];
  },
  addMove: function(direction, index) {
    this.direction = direction;
    this.spaces.push(index);
  },
  lastMove: function() {
    return this.spaces[this.spaces.length - 1];
  },
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

/*
 * Build Playing Field
 */
function buildPlayingField() {
  elems.player1Score = document.createElement('aside');
  elems.player1Score.classList.add('score-board', 'player-1');
  elems.playingField = document.createElement('div');
  elems.playingField.classList.add('playing-field');
  elems.player2Score = document.createElement('aside');
  elems.player2Score.classList.add('score-board', 'player-2');
  elems.promptList = document.createElement('aside');
  elems.promptList.className = 'prompt-list';

  elems.main.appendChild(elems.player1Score);
  elems.main.appendChild(elems.playingField);
  elems.main.appendChild(elems.player2Score);
  elems.main.appendChild(elems.promptList);
}

/*
 * Build Score Boards
 */
function buildScoreBoards() {
  [elems.player1Score, elems.player2Score].forEach((scoreBoard, i) => {
    let name = document.createElement('div');
    name.classList.add('name');
    name.innerText = `Player ${i+1}`;
    scoreBoard.appendChild(name);

    let munchies = document.createElement('div');
    munchies.classList.add('munchie-jar');
    scoreBoard.appendChild(munchies);

    let score = document.createElement('div');
    score.classList.add('score');
    score.innerText = 'Score: 0';
    scoreBoard.appendChild(score);
  });
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

    paragraph.text.forEach((text, i) => {
      let line = document.createElement('p');
      if (i > 0) {
        line.classList.add('first-line');
      }
      line.innerText = text;
      elems.instructions.appendChild(line);
    });
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
 * Build Reset Dialog
 */
function buildResetDiaolg(resetDialog) {
  elems.resetDialog = document.createElement('div');
  elems.resetDialog.classList.add('page', 'reset-dialog');
  elems.playingField.appendChild(elems.resetDialog);

  let title = document.createElement('h2');
  title.innerText = resetDialog.title;
  elems.resetDialog.appendChild(title);

  resetDialog.paragraphs.forEach(paragraph => {
    let heading = document.createElement('h3');
    heading.innerText = paragraph.heading;
    elems.resetDialog.appendChild(heading);

    let text = document.createElement('p');
    text.innerText = paragraph.text;
    elems.resetDialog.appendChild(text);
  })

  resetDialog.buttons.forEach(button => {
    let btn = document.createElement('button');
    btn.classList.add(button.style);
    btn.addEventListener('click', button.action);
    btn.innerText = button.text;
    elems.resetDialog.appendChild(btn);
  });
}

/*
 * Build Footer
 */
function buildFooter() {
  //Copyright Info
  let copyright = document.createElement('p');
  copyright.className = 'copyright';
  copyright.innerHTML = '&#169;  2020 Seanny Drakon Phoenix';
  elems.footer.appendChild(copyright);

  //GA Link
  let gaLink = document.createElement('a');
  gaLink.className = 'ga-link';
  gaLink.href = 'https://generalassemb.ly/';
  gaLink.target = '_blank';

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


function showBoard(board) {
  let gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');

  // Set up the number of columns
  let gridColumns = '';
  for (let i = 0; i < board.dimX; i++) {
    gridColumns += '1fr ';
  }
  gameBoard.setAttribute('style', `grid-template-columns: ${gridColumns};`);

  // Create and add squares
  let delay = Math.floor(300 / board.size);
  let queue = new DoQueue(delay / 2, delay);
  let shuffler = [];
  for (let i = 0; i < board.size; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.id = `sq${i}`;
    item = board.getItem(i);
    if (item) {
      let itemDiv = document.createElement('div');
      itemDiv.classList.add(item.getType());
      square.appendChild(itemDiv);
    }
    shuffler.push(i);
    gameBoard.appendChild(square);
  }
  elems.playingField.append(gameBoard);

  //Pop the squares into view in a random order.
  shuffler = shuffle(shuffler);
  shuffler.forEach(id => {
    queue.addToQueue(() => {
      let square = document.querySelector(`#sq${id}`);
      square.classList.add('pop-in');
      if (board.getItem(id)) {
        setTimeout(() => {
          square.firstChild.classList.add('pop-in');
        }, 800);
      }
    })
  });
}

function updateBoard(board) {
  let delay = Math.floor(300 / board.size);
  let queue = new DoQueue(delay, board.size);
  for (let i = 0; i < board.size; i++) {
    let square = document.querySelector(`#sq${i}`)
    let sundry = square.children;
    for (let i = sundry.length - 1; i >= 0; i--) {
      sundry[i].remove();
    }
    item = board.getItem(i);
    if (item) {
      let itemDiv = document.createElement('div');
      itemDiv.classList.add(item.getType(), 'pop-in');
      square.appendChild(itemDiv);
    }
  }
}

function removeBoard() {
  let squares = document.querySelectorAll('.square');
  let delay = Math.floor(300 / squares.length);
  let queue = new DoQueue(delay / 2, delay);
  Object.values(squares).forEach(square => {
    queue.addToQueue(() => {
      square.setAttribute('style', 'visibility: hidden;');
    })
  });
  let board = document.querySelector('.game-board');
  queue.addToQueue(() => {
    board.remove();
  })
}

function showMoves(newMove) {
  let queue = new DoQueue();
  if (currentMove.direction !== newMove.direction) {
    //remove old move blocks;
    for (let i = currentMove.spaces.length - 1; i >= 0; i--) {
      queue.addToQueue((index) => {
        let arrow = document.querySelector(`#arrow${index}`);
        arrow.classList.add('bye');
        setTimeout(() => {
          arrow.remove();
        }, 200);
      }, currentMove.spaces[i], 200);
    }
    currentMove.reset();
  }
  if (newMove.lastMove === currentMove.lastMove) {
    //We haven't advanced. Flash instead.
    flashLastMove();
  } else {
    //We have moved. Add arrow.
    currentMove.addMove(newMove.direction, newMove.lastMove());
    index = currentMove.lastMove();
    let arrow = document.createElement('i');
    arrow.classList.add(
      `fa`,
      `fa-arrow-circle-${currentMove.direction}`,
      `arrow`);
    arrow.id = `arrow${index}`;
    queue.addToQueue(() => {
      document.querySelector(`#sq${index}`).appendChild(arrow);
    }, null, 0);
  }
}

function clearMoves() {
  currentMove.reset();
}

function flashLastMove() {
  let arrow = document.querySelector(`#arrow${currentMove.lastMove()}`);
  arrow.classList.add('flash');
  setTimeout(() => {
    arrow.classList.remove('flash');
  }, 500);
}

function showPage(page) {
  let mainElements = document.querySelectorAll('aside');
  for (let i = 0; i < mainElements.length; i++) {
    if (page) {
      mainElements[i].classList.add('fade');
    } else {
      mainElements[i].classList.remove('fade');
    }
  }
  switch (page) {
    case 'options':
      elems.options.classList.add('show');
      elems.instructions.classList.remove('show');
      elems.resetDialog.classList.remove('show');
      break;
    case 'instructions':
      elems.options.classList.remove('show');
      elems.instructions.classList.add('show');
      elems.resetDialog.classList.remove('show');
      break;
    case 'resetDialog':
      elems.options.classList.remove('show');
      elems.instructions.classList.remove('show');
      elems.resetDialog.classList.add('show');
      break;
    default:
      elems.options.classList.remove('show');
      elems.instructions.classList.remove('show');
      elems.resetDialog.classList.remove('show');
  }
}

function activePlayer(player) {
  switch (player) {
    case 'Player 1':
      elems.player1Score.classList.add('active');
      elems.player2Score.classList.remove('active')
      break;
    case 'Player 2':
      elems.player2Score.classList.add('active');
      elems.player1Score.classList.remove('active')
      break;
  }
}

function updateScores(score1, score2) {
  elems.player1Score.querySelector('.score').innerText = `Score: ${score1}`;
  elems.player2Score.querySelector('.score').innerText = `Score: ${score2}`;
}

function addMunchie(munchie, player) {
  let newMunchie = document.createElement('div');
  newMunchie.classList.add('munchie');
  switch (player) {
    case 'Player 1':
      elems.player1Score.querySelector('.munchie-jar').appendChild(newMunchie);
      break;
    case 'Player 2':
      elems.player2Score.querySelector('.munchie-jar').appendChild(newMunchie);
      break;
  }
  newMunchie.classList.add('pop-in');
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
  setTimeout(function() {
    Object.values(lines).forEach(line => {
      line.remove();
    });
    elems.promptList.appendChild(line1);
    elems.promptList.appendChild(line2);
    elems.promptList.appendChild(line3);
  }.bind(lines), 700);
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
      lines[0].remove();
    }
    elems.promptList.appendChild(pause);
  }, 700);
}