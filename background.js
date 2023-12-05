chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "https://dev.dk5o9ng78c4g4.amplifyapp.com/" });
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { action: "autofill" },
    function (response) {
      console.log(response.status); // Should log "success"
    }
  );
});
