document.addEventListener("click", (e) => {
  if (e.target.textContent === 'Preencher planejamento') {
    browser.tabs.executeScript(null, {
      file: "/content_scripts/siames.js"
    });
    let text = document.querySelector('textarea').value;
    let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {text: text});
    });
  }
});
