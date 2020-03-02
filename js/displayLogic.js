/*
 * Sets the title and header content
 */
function setTitle(gameTitle) {
  document.querySelector('title').innerText = gameTitle;
  let header = document.querySelector('header');
  let title = document.createElement('h1');
  title.innerText = gameTitle;
  header.appendChild(title);
  let sub = document.createElement('h4');
  sub.innerText = 'a game by Seanny Drakon Phoenix';
  header.appendChild(sub);
}

function setMenu(menu) {

  menu.addItem({
    title: 'Options',
    type: 'click',
    icon: 'fa-cog',
    action: null,
  });

  console.log(menu);

  let menuNav = document.querySelector('nav');
  menu.getAllItems().forEach((menuItem, i) => {
    switch (menuItem.type) {
      case 'heading':
        let header = document.createElement('div');
        header.className = 'menu-level-1';
        let icon = document.createElement('i');
        icon.classList.add('fas', menuItem.icon);
        let text = document.createElement('p');
        text.innerText = menuItem.title;
        header.appendChild(icon);
        header.appendChild(text);
        menuNav.appendChild(header);
    }
  });
}

function setFooter() {
  let footer = document.querySelector('footer');

  //Copyright Info
  let copyright = document.createElement('p');
  copyright.className = 'copyright';
  copyright.innerHTML = '&#169;	2020 Seanny Drakon Phoenix';
  footer.appendChild(copyright);

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

  footer.appendChild(gaLink);
}

function activateIcon(icon) {
  icon.classList.add('show');
}

function deactivateIcon(icon) {
  icon.classList.remove('show');
}