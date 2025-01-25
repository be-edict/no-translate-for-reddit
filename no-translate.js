browser.webRequest.onBeforeRequest.addListener(
	(details) => {
	  let url = new URL(details.url);
	  if (url.searchParams.has('tl')) {
		url.searchParams.delete('tl');
		return { redirectUrl: url.toString() };
	  }
	},
	{
	  urls: ["*://*.reddit.com/*"],
	  types: ["main_frame"]
	},
	["blocking"]
  );