function listener(details) {
	let url = new URL(details.url);
	if (url.searchParams.has('tl')) {
		url.searchParams.delete('tl');
		return { redirectUrl: url.toString() };
	}
}

//Nach der Installation/Update Plugin auf an schalten.
browser.runtime.onInstalled.addListener(() => {
	browser.storage.local.get("extensionEnabled").then((result) => {
		if (typeof result.extensionEnabled === "undefined") {
			browser.storage.local.set({extensionEnabled: true});
		}
	});
});

function registerListener() {
	browser.webRequest.onBeforeRequest.addListener(
		listener,
		{
			urls: ["*://*.reddit.com/*"],
			types: ["main_frame"]
		},
		["blocking"]
	);
}

function unregisterListener() {
	try {
		if (browser.webRequest.onBeforeRequest.hasListener(listener)) {
			browser.webRequest.onBeforeRequest.removeListener(listener);
		}
	} catch(error) {
		console.error("Failed to unregister listener: ", error);
	}
}

//Initialize
browser.storage.local.get("extensionEnabled").then((result) => {
	if (result.extensionEnabled) {
		registerListener();
	}
});

browser.storage.local.onChanged.addListener((change) => {
	if (change.extensionEnabled) {
		if (change.extensionEnabled.newValue) {
			registerListener();
		} else {
			unregisterListener();
		}
	}
});