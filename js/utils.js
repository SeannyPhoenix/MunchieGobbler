class DoQueue {
  constructor(interval = 100, defaultDelay = 10) {
    this.busy = false;
    this.queue = [];
    this.timer = null;
    this.inerval = interval;
    this.delay = defaultDelay;
    this.actionCount = 0;
  }

  executor() {
    if (!this.busy) {
      let command = this.queue.shift();
      let self = this;
      this.busy = true;
      setTimeout(() => {
        if (Array.isArray(command.arguments)) {
          command.command(...command.arguments);
        } else {
          command.command(command.arguments);
        }
        self.busy = false;
      }, command.delay);
    }
  }

  activate() {
    if (!this.timer) {
      let self = this;
      this.timer = setInterval(() => {
        if (!this.isIdle()) {
          self.executor();
        } else {
          self.deactivate();
        }
      }, this.interval);
    }
  }

  deactivate() {
    clearInterval(this.timer);
    this.timer = null;
  }

  addToQueue(command, args, delay = this.delay) {
    this.actionCount++;
    this.queue.push({
      command: command,
      arguments: args,
      delay: delay,
      id: this.actionCount,
    });
    this.activate();
    return this.actionCount;
    console.log(command);
  }

  removeFromQueue(actionID) {
    this.queue.forEach((action, index) => {
      if (action.id === actionID) {
        this.queue.splice(index, 1);
      }
    });

  }

  clearQueue() {
    this.queue = [];
  }

  isIdle() {
    return this.queue.length === 0;
  }
}

class Typewriter {

  constructor(container, childType = 'p') {
    super.constructor;
    this.typeQueue = new DoQueue();
    this.container = container;
    this.childType = 'p';
    this.delay = 10;
  }

  type(message, delay = this.delay) {
    if (typeof message === 'string') {
      //We can type this string out

      //If we are given a 'p' element, clear it and retype it
      let newLine;
      self = this;
      if (this.container.tagName === 'P') {
        newLine = container;
        newLine.innerHTML = '';
        message.split('').forEach((character, idx) => {
          this.typeQueue.addToQueue(self.appendCharacter, {
            element: newLine,
            character: character,
            index: idx,
          }, delay);
        });
      } else {
        newLine = document.createElement(this.childType);
        newLine.classList.add('typed-text');
        this.container.appendChild(newLine);
        message.split('').forEach(character => {
          this.typeQueue.addToQueue(self.appendCharacter, {
            element: newLine,
            character: character
          }, delay);
        });
      }
    } else {
      //We need to separate the messages and send them through
      let firstLine = message.shift();
      this.type(firstLine, container);
      if (message.length > 0) {
        this.type(message, container);
      }
    }
  }

  typeOver(message, selector, delay = this.delay) {

    let line = this.container.querySelector(selector);
    self = this;
    message.split('').forEach((character, index) => {
      this.typeQueue.addToQueue(self.replaceCharacter, {
        element: line,
        character: character,
        index: index,
      }, delay);
    });
    let endLine = message.length;
    let overage = line.innerHTML.length;
    for (let idx = message.length; idx < overage; idx++) {
      this.typeQueue.addToQueue(self.removeCharacter, {
        element: line,
        index: endLine,
      }, delay);
    }
  }

  appendCharacter(info) {
    info.element.innerHTML += info.character;
  }

  replaceCharacter(info) {
    let oldText = info.element.innerHTML;
    info.element.innerHTML = (
      oldText.slice(0, info.index) +
      info.character +
      oldText.slice(info.index + 1)
    );
  }

  removeCharacter(info) {
    let oldText = info.element.innerHTML;
    info.element.innerHTML = (
      oldText.slice(0, info.index) +
      oldText.slice(info.index + 1)
    );
  }
}

function randomizeInt(range) {
  let base = range.upper - range.lower + 1;
  let rand = Math.floor((Math.random() * base) + range.lower);
  return rand;
}

/*
 * Fisher–Yates Shuffle
 * implimented by Mike Bostock
 * https://bost.ocks.org/mike/shuffle/
 */

function shuffle(array) {
  var m = array.length,
    t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}