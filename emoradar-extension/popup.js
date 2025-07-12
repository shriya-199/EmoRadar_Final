function showPopup() {
  document.getElementById("focusAlert").classList.add("show");
}

function hidePopup() {
  document.getElementById("focusAlert").classList.remove("show");
  window.close(); // optional: auto-close popup
}

// Listen to background message
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "FOCUS_TIMER_DONE") {
    showPopup();
  }
});
