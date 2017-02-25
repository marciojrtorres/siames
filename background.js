browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf('https://sia.ifrs.edu.br') === 0) {
   browser.pageAction.show(tabId);
  }
});
