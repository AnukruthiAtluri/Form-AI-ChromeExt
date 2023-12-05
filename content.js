// content.js
const mockData = {
  firstName: "Anu",
  lastName: "Atluri",
  email: "aatluri2@umbc.edu",
  // Add other fields as necessary
};

// Trigger the autfill popup when the page loads with a form
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  if (forms.length > 0) {
    // Notify the extension that a form is present
    chrome.runtime.sendMessage({ action: "showAutofillPopup" });
  }
});

// Populate the sidebar with content
sidebar.innerHTML = `<h1>FormAI Sidebar</h1>`;

function autofillForm(data) {
  for (const key in data) {
    const inputField =
      document.querySelector(`input[name=${key}]`) ||
      document.getElementById(key);
    if (inputField) {
      inputField.value = data[key];
    }
  }
}

// Listen for messages from the background or popup script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "autofill") {
    autofillForm(mockData);
    sendResponse({ status: "success" });
  }
});
