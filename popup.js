document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("autofill").addEventListener("click", () => {
      chrome.runtime.sendMessage({action: "autofill"}, (response) => {
        if (response.status === "success") {
          console.log("Auto-fill successful");
        }
      });
    });
  });
  