// ✅ Confirm script is injected
console.log("✅ content.js loaded");

// ✅ Listen for mood events dispatched by React frontend
window.addEventListener("EMO_MOOD_CHANGE", (event) => {
  const mood = event.detail;
  console.log("📥 Mood received in content.js:", mood);

  // ✅ Send mood to background service worker
  if (chrome?.runtime?.sendMessage) {
    chrome.runtime.sendMessage(
      {
        type: "UPDATE_MOOD",
        payload: mood,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("❌ Failed to send to background:", chrome.runtime.lastError.message);
        } else {
          console.log("📤 Mood sent to background:", response);
        }
      }
    );
  } else {
    console.error("❌ chrome.runtime.sendMessage not available in content.js");
  }
});
