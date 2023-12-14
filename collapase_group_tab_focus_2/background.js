chrome.commands.onCommand.addListener(function (command) {
  if (command.match(/^toggle-tab-group*/)) {
    chrome.tabGroups.query({}, function (tabGroups) {
      switch (command) {
        case "toggle-tab-group":
          chrome.tabs.query(
            { active: true, lastFocusedWindow: true },
            function (tabs) {
              chrome.tabGroups.update(tabs[0].groupId, { collapsed: true });
            }
          );
          break;
        case "toggle-tab-group-all":
          chrome.tabs.query(
            { active: true, lastFocusedWindow: true },
            function (tabs) {
              tabGroups.forEach((tabGroup) => {
                if (tabGroup.id === tabs[0].groupId) {
                  return;
                }
                chrome.tabGroups.update(tabGroup.id, { collapsed: true });
              });
            }
          );
          break;
      }
      const toggleGroupNo = parseInt(
        command.match(/^toggle-tab-group-(\d)/)?.[1]
      );
      if (!toggleGroupNo || !tabGroups?.[toggleGroupNo - 1]) {
        return;
      }

      let tabGroupCount = 0;
      let tabGroupIdCurrent;
      let currentWindowId;
      chrome.windows.getCurrent((currentWindow) => {
        currentWindowId = currentWindow.id;
      });

      chrome.tabs.query({}, function (tabs) {
        for (let tab of tabs) {
          if (tab.windowId != currentWindowId) {
            continue;
          }
          if (tabGroupIdCurrent != tab.groupId) {
            tabGroupIdCurrent = tab.groupId;
            tabGroupCount++;
          }
          if (tabGroupCount == toggleGroupNo) {
            chrome.tabGroups.update(
              tab.groupId,
              {
                collapsed: false,
              },
              () => {}
            );
            chrome.tabs.update(tab.id, { active: true }, () => {});
            return;
          }
        }
      });
    });
  }
});
