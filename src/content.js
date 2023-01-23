const development = false;
const log = (message) => {
  if (development) {
    console.log(message);
  }
}

var tablistObserver;
const bodyCallback = () => {
  log('call bodyCallback');

  const tablist = document.querySelector('div[role="tablist"]');
  if (!tablist) {
    return;
  }

  log(tablist);
  const followingTab = [...tablist.children].find(c => c.textContent === 'フォロー中' || c.textContent === 'Following');
  const aTag = followingTab.getElementsByTagName('a')[0];
  aTag.click();
  tablistObserver.disconnect();
  tablistObserver = undefined;
};

const observeBody = () => {
  log('call observeBody');
  if (!tablistObserver) {
    log('start observe');
    observing = true;
    tablistObserver = new MutationObserver(bodyCallback);
    const body = document.querySelector('body')
    const config = { childList: true, subtree: true };
    tablistObserver.observe(body, config);
  }
}

/// Detecting when a user navigates to the home screen from a different page
var firstHome = true;
const headCallback = () => {
  log('call headCallback');
  log(`firstHome ${firstHome}`);
  log(location.pathname);
  const isHome = location.pathname == '/home';
  if (firstHome && isHome) {
    observeBody();
    firstHome = false;
  }
}

const head = document.querySelector('head');
const observer = new MutationObserver(headCallback);
const config = { subtree: true, characterData: true, childList: true };
observer.observe(head, config);
