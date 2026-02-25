# Simple Dark Mode - Chrome Extension

A lightweight Chrome extension that turns any white/light website into dark mode.

## Features

- 🌙 One-click toggle for dark mode
- 💾 Remembers your preference for each website
- 🖼️ Automatically preserves images and videos
- 🎨 Clean, modern popup interface
- ⚡ Lightweight and fast

## Installation

### Method 1: Load Unpacked (Developer Mode)

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `dark-mode-extension` folder
5. The extension should now appear in your toolbar!

### Method 2: From ZIP file

1. Unzip the `dark-mode-extension.zip` file
2. Follow Method 1 above using the unzipped folder

## Usage

1. Click the moon icon in your Chrome toolbar
2. Toggle the switch to enable/disable dark mode
3. Your preference is saved automatically for each website

## How It Works

The extension uses CSS `filter: invert(1) hue-rotate(180deg)` to invert all colors on the page. Images, videos, and other media are inverted back so they appear normal.

## Permissions

- **activeTab**: To apply dark mode to the current tab
- **storage**: To save your dark mode preferences

## Troubleshooting

- **Extension doesn't work on some pages**: Chrome extensions cannot modify browser pages (chrome://), the Chrome Web Store, or other extension pages.
- **Some elements look weird**: Some websites use complex styling that may not invert perfectly. This is a limitation of the CSS inversion approach.

## License

MIT License - Feel free to modify and share!
