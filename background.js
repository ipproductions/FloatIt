// Create a context menu item that only shows up when right-clicking on an element.
chrome.contextMenus.create({
    id: "floatElement",
    title: "Float this Element",
    // Added "video" to the contexts array
    contexts: ["page", "selection", "image", "link", "video"],
    targetUrlPatterns: ["<all_urls>"] // Show on all URLs
  });
  
  // Listen for clicks on the context menu item
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "floatElement") {
      // Send a message to the content script in the active tab
      chrome.tabs.sendMessage(tab.id, { action: "floatElement" });
    }
  });
  