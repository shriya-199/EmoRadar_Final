let unblockTimerId = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'UPDATE_MOOD') {
    const mood = msg.payload;
    console.log('Received mood in background:', mood);

    const blockLists = {
      angry: ['twitter.com', 'facebook.com', 'reddit.com'],
      sad: ['news.com', 'twitter.com', 'instagram.com'],
      anxious: ['news.com', 'twitter.com', 'reddit.com', 'facebook.com'],
      focused: ['twitter.com', 'facebook.com', 'instagram.com', 'youtube.com'],
      happy: []
    };

    const domains = blockLists[mood] || [];
    const newRules = domains.map((d, i) => ({
      id: 1000 + i,
      priority: 1,
      action: { type: 'block' },
      condition: { hostSuffix: d, resourceTypes: ['main_frame'] }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: newRules.map(r => r.id),
      addRules: newRules
    });

    if (unblockTimerId) clearTimeout(unblockTimerId);
    if (domains.length > 0) {
      unblockTimerId = setTimeout(() => {
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: newRules.map(r => r.id)
        });
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: 'EmoRadar: Unblocked!',
          message: 'Your 25-minute focus session has ended. Sites are unblocked.',
          priority: 2
        });
      }, 25 * 60 * 1000);
    }

    sendResponse({ success: true });
  }
});
