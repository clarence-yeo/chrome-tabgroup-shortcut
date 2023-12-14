chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.action)
    if (request.action === "toggleTabGroup") {
      // This is a placeholder - Chrome does not expose tab group UI elements to content scripts.
       // You would need to find a way to target the tab group collapse/expand UI, which might not be feasible.
      
      const tabGroupElement = document.querySelector('.chrome-tab-group-selector'); // Placeholder selector
      console.log(tabGroupElement)
      if (tabGroupElement) {
        tabGroupElement.click();
      }
    }
  });
  