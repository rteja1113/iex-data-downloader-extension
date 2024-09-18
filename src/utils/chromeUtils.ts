export const getCurrentTabUrl = async () => {
  const activeTabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const currentUrl = activeTabs[0].url;
  return currentUrl;
};
