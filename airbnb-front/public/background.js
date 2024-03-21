/* eslint-disable no-undef */
// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "dataExtracted") {
    console.log("Data extracted:", message.propertiesData);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      } else {
        console.log("No active tab found.");
      }
    });
  }
});
