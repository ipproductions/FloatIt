# FloatIt - Chrome Extension

**FloatIt** is a simple Chrome extension that lets you float any element you right-click on — text blocks, images, videos, or links — into a draggable, fixed container in the top-left corner of the screen.

Great for referencing content while scrolling or multitasking!

---

## 📦 Features

- ✅ Right-click any element (text, image, link, video)  
- ✅ Choose **“Float this Element”** from the context menu  
- ✅ The element becomes a fixed floating box on the screen  
- ✅ Includes a **✕ Close** button to restore the element to its original position  
- ✅ Auto-preserves styling and layout

---

## 🔧 Installation (for Developers)

1. Clone or download this repository.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer Mode** (top right toggle).
4. Click **"Load unpacked"** and select the folder with this extension.

---

## 📁 File Overview

- `manifest.json` — Declares extension permissions and entry points.
- `background.js` — Creates the context menu and handles click events.
- `content.js` — Handles floating behavior and restores the element on close.

---

## ⚙️ How It Works

1. On right-click, the element is saved temporarily.
2. When the menu item is clicked, the extension:
   - Inserts a placeholder in its original location.
   - Moves the element to a fixed position.
   - Adds a styled ✕ Close button.
3. On close:
   - The element returns to its original position.
   - Styles are restored.
   - Placeholder and close button are removed.

---

## 🛡️ Permissions Used

- `activeTab` — Needed to inject scripts into the current page.
- `contextMenus` — Used to create the right-click menu.
- `scripting` — Required for Chrome Manifest V3 to interact with content scripts.

---

## ❓ Use Cases

- Floating a video player while reading comments.
- Keeping an image visible while comparing content.
- Floating useful code snippets, paragraphs, or links.

---

## 🧠 Notes

- This extension works on most sites, but highly dynamic or secured content (like embedded video players) may block script manipulations.
- The float box is fixed at the top-left corner and scroll-independent.

---

## 📃 License

MIT – free to use, modify, and share.

---

## 💡 Future Ideas

- Drag to reposition the floating element.
- Multiple float boxes at once.
- Dark mode styles.
