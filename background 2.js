chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "https://dev.dk5o9ng78c4g4.amplifyapp.com/" });
  }
});
