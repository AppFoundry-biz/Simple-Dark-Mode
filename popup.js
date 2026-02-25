const toggle = document.getElementById('darkModeToggle');
const siteInfo = document.getElementById('siteInfo');
const status = document.getElementById('status');

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];

  if (!tab || !tab.url) {
    siteInfo.textContent = 'Cannot access this page';
    toggle.disabled = true;
    return;
  }

  if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('edge://')) {
    siteInfo.textContent = 'Cannot modify browser pages';
    toggle.disabled = true;
    status.textContent = 'Dark mode unavailable on this page';
    status.className = 'status off';
    return;
  }

  try {
    siteInfo.textContent = `Current site: ${new URL(tab.url).hostname}`;
  } catch (e) {
    siteInfo.textContent = 'Current site';
  }

  chrome.tabs.sendMessage(tab.id, { action: 'getState' }, (response) => {
    if (chrome.runtime.lastError || !response) {
      const hostname = new URL(tab.url).hostname;
      chrome.storage.local.get(['dark_' + hostname], (result) => {
        toggle.checked = result['dark_' + hostname] || false;
        updateStatus(toggle.checked);
      });
      return;
    }
    toggle.checked = response.enabled;
    updateStatus(response.enabled);
  });
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const hostname = new URL(tab.url).hostname;

    chrome.tabs.sendMessage(tab.id, { action: 'setState', enabled }, (response) => {
      if (chrome.runtime.lastError) {
        // Content script not loaded — inject it, then set state
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        }).then(() => {
          chrome.tabs.sendMessage(tab.id, { action: 'setState', enabled });
        });
      }
    });

    chrome.storage.local.set({ ['dark_' + hostname]: enabled });
    updateStatus(enabled);
  });
});

function updateStatus(enabled) {
  if (enabled) {
    status.textContent = '🌙 Dark mode is ON';
    status.className = 'status on';
  } else {
    status.textContent = '☀️ Dark mode is OFF';
    status.className = 'status off';
  }
}
