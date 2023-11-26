document.addEventListener("DOMContentLoaded", () => {
  const autofillBtn = document.getElementById("autofill");
  const signInBtn = document.getElementById("signin");
  const signOutBtn = document.getElementById("signout");
  const settingsBtn = document.getElementById("settings");
  const usernameDisplay = document.getElementById("username");

  function updateUIForSignedInUser(username) {
    usernameDisplay.textContent = `Hi, ${username}`;
    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'block';
    settingsBtn.style.display = 'block'; // Show settings for signed-in users
    autofillBtn.style.display = 'block'; // Show autofill for signed-in users
  }

  function updateUIForSignedOutUser() {
    usernameDisplay.textContent = '';
    signInBtn.style.display = 'block';
    signOutBtn.style.display = 'none';
    settingsBtn.style.display = 'none'; // Hide settings for signed-out users
    autofillBtn.style.display = 'none'; // Hide autofill for signed-out users
  }

  // Initial UI update based on signed-in state
  chrome.storage.sync.get(["username"], (result) => {
    if (result.username) {
      updateUIForSignedInUser(result.username);
    } else {
      updateUIForSignedOutUser();
    }
  });

  signInBtn.addEventListener("click", () => {
    const authUrl = "https://dev.dk5o9ng78c4g4.amplifyapp.com";
    chrome.identity.launchWebAuthFlow(
      { url: authUrl, interactive: true },
      (redirectUrl) => {
        console.log("Redirect URL:", redirectUrl);
        // Extract username or token logic
        const username = "User123"; // Replace with actual logic
        chrome.storage.sync.set({ username: username }, () => {
          updateUIForSignedInUser(username);
        });
      }
    );
  });

  signOutBtn.addEventListener("click", () => {
    chrome.storage.sync.remove(["username"], () => {
      updateUIForSignedOutUser();
    });
  });

  autofillBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({action: "autofill"}, (response) => {
      if (response.status === "success") {
        console.log("Auto-fill successful");
      }
    });
  });
});
