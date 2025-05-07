// This script runs in the context of the active tab

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "floatElement") {
    // The background script sent a message to float an element.
    // We need to know *which* element was right-clicked.
    // Unfortunately, the context menu click doesn't directly give us the element.
    // A common workaround is to store the last right-clicked element.

    // Check if we have a stored last right-clicked element
    if (window.lastRightClickedElement) {
      floatElement(window.lastRightClickedElement);
      // Clear the stored element after use
      window.lastRightClickedElement = null;
    } else {
      console.warn("No element stored from last right-click.");
      // Optionally show a message to the user
      // showMessage("Please right-click the element you want to float.");
    }
  }
});

// Add a listener to store the element that was last right-clicked
document.addEventListener('contextmenu', (e) => {
    // Store the element that was right-clicked
    window.lastRightClickedElement = e.target;
    console.log("Stored last right-clicked element:", e.target);
});


// --- The core floating logic from the bookmarklet, adapted ---

// Function to create and display a simple message box (optional in extension)
// You could use this for user feedback if needed, but console logs might suffice.
/*
function showMessage(message) {
  const existingMessageBox = document.getElementById('extension-message-box');
  if (existingMessageBox) {
    existingMessageBox.remove();
  }

  const messageBox = document.createElement('div');
  messageBox.id = 'extension-message-box';
  messageBox.textContent = message;
  messageBox.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10001;
    padding: 10px 15px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    font-family: sans-serif;
    font-size: 14px;
    max-width: 250px;
    text-align: center;
    cursor: pointer;
  `;

  messageBox.onclick = function() {
    messageBox.remove();
  };

  document.body.appendChild(messageBox);
}
*/

function floatElement(el) {
  console.log('floatElement function called for element:', el);
  // Save original parent and sibling (using placeholder method)
  const originalParent = el.parentNode;
  if (!originalParent) {
      console.error('Element has no parentNode, cannot float.');
      return;
  }
  const rect = el.getBoundingClientRect();
  console.log('Element bounding rect:', rect);

  // Save the original inline style attribute value
  const originalStyle = el.getAttribute('style');
  console.log('Original style saved:', originalStyle);

  const placeholder = document.createElement('div');
  // Set placeholder dimensions to match the original element's size
  placeholder.style.width = rect.width + 'px';
  placeholder.style.height = rect.height + 'px';
  placeholder.setAttribute('data-extension-placeholder', 'true'); // Use a different marker
  console.log('Placeholder created:', placeholder);

  // Insert the placeholder before the element
  try {
    originalParent.insertBefore(placeholder, el);
    console.log('Placeholder inserted before element.');
  } catch (e) {
    console.error('Error inserting placeholder:', e);
    placeholder.remove();
    return;
  }

  // Apply floating styles
  el.style.position = 'fixed';
  el.style.top = '10px';
  el.style.left = '10px';
  el.style.zIndex = '9999';
  el.style.width = '300px';
  el.style.maxHeight = '30%';
  el.style.overflow = 'auto';
  el.style.background = '#fff';
  el.style.color = '#333';
  el.style.padding = '10px';
  el.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  el.style.border = '2px solid #ccc';
  el.style.borderRadius = '8px';
  console.log('Applied floating styles to element.');

  // Create ✕ close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕ Close';
  closeBtn.style.position = 'fixed';
  closeBtn.style.top = 'calc(10px + 30% + 15px)';
  closeBtn.style.left = '10px';
  closeBtn.style.zIndex = '10000';
  closeBtn.style.padding = '8px 15px';
  closeBtn.style.background = '#ff4d4d';
  closeBtn.style.color = 'white';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '4px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  console.log('Close button created.');

  closeBtn.onclick = function(){
    console.log('Close button clicked. Restoring element.');
    // Restore DOM position by inserting the element before the placeholder
    // Find the placeholder using the data attribute
    const currentPlaceholder = document.querySelector('[data-extension-placeholder="true"]');

    if (currentPlaceholder && currentPlaceholder.parentNode) {
       try {
          currentPlaceholder.parentNode.insertBefore(el, currentPlaceholder);
          console.log('Element restored before placeholder.');
       } catch (e) {
          console.error('Error restoring element position:', e);
          // Fallback if insertBefore fails
          document.body.appendChild(el);
          console.log('Element appended to body as fallback.');
       }
       currentPlaceholder.remove(); // Remove placeholder after use
       console.log('Placeholder removed.');
    } else {
       console.warn('Placeholder element not found or has no parent. Cannot restore element position precisely.');
       // If placeholder is gone, just append to body
       document.body.appendChild(el);
       console.log('Element appended to body as fallback.');
    }


    // Restore the original inline style
    if (originalStyle !== null) {
      el.setAttribute('style', originalStyle);
      console.log('Original style restored.');
    } else {
      el.removeAttribute('style');
      console.log('Style attribute removed (originally none).');
    }

    closeBtn.remove();
    console.log('Close button removed.');

    // Also remove any message box if it's still there (if you implement showMessage)
    // const msgBox = document.getElementById('extension-message-box');
    // if (msgBox) {
    //   msgBox.remove();
    //   console.log('Message box removed on close.');
    // }
    console.log('Element restoration complete.');
  };

  document.body.appendChild(closeBtn);
  console.log('Close button appended to body.');
}

// Initial message or setup is not needed like in a bookmarklet
// The functionality is triggered by the context menu click via the message listener.
