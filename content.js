const development = false;
const log = (message) => {
  if (development) {
    console.log(message);
  }
}

var observing = false;
const bodyCallback = (_, observer) => {
  log('call bodyCallback');

  const tablist = document.querySelector('div[role="tablist"]');
  if (!tablist) {
    return;
  }

  log(tablist);
  const followingTab = [...tablist.children].find(c => c.textContent == 'フォロー中');
  const aTag = followingTab.getElementsByTagName('a')[0];
  aTag.click();
  observer.disconnect();
  observing = false;
};

const observeBody = () => {
  log('call observeBody');
  if (!observing) {
    log('start observe');
    observing = true;
    const observer = new MutationObserver(bodyCallback);
    const body = document.querySelector('body')
    const config = { childList: true };
    observer.observe(body, config);
  }
}

/// Detecting when a user navigates to the home screen from a different page
var current = false;
const headCallback = () => {
  log('call headCallback');
  log(`current ${current}`);
  log(location.pathname);
  const isHome = location.pathname == '/home';
  if (isHome) {
    observeBody();
  }
  current = isHome;
}

const head = document.querySelector('head');
const observer = new MutationObserver(headCallback);
const config = { subtree: true, characterData: true, childList: true };
observer.observe(head, config);
