const DARK_CSS = 'html{filter:invert(1) hue-rotate(180deg)!important}img,video,canvas,picture,iframe,embed,object,[style*="background-image"]{filter:invert(1) hue-rotate(180deg)!important}';

function setDarkMode(on) {
  let el = document.getElementById('__dark_mode_style');
  if (on && !el) {
    el = document.createElement('style');
    el.id = '__dark_mode_style';
    el.textContent = DARK_CSS;
    (document.head || document.documentElement).appendChild(el);
  } else if (!on && el) {
    el.remove();
  }
  try { localStorage.setItem('__dm', on ? '1' : '0'); } catch (e) {}
}

// Instant re-activation from localStorage
try {
  if (localStorage.getItem('__dm') === '1') setDarkMode(true);
} catch (e) {}

// Sync with chrome.storage (authoritative)
chrome.storage.local.get(['dark_' + location.hostname], (result) => {
  const saved = result['dark_' + location.hostname];
  if (saved !== undefined) {
    const isOn = !!document.getElementById('__dark_mode_style');
    if (saved !== isOn) setDarkMode(saved);
  }
});

// Messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'getState') {
    sendResponse({ enabled: !!document.getElementById('__dark_mode_style') });
  } else if (msg.action === 'setState') {
    setDarkMode(msg.enabled);
    chrome.storage.local.set({ ['dark_' + location.hostname]: msg.enabled });
    sendResponse({ enabled: msg.enabled });
  }
  return true;
});
