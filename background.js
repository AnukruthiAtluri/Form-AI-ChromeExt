chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "autofill") {
      console.log("Auto-fill initiated");
      // Perform auto-fill logic here
      sendResponse({status: "success"});
    }
  });
  