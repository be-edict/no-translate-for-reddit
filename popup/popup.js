const statusLabel = document.getElementById("status-label");
const toggleButton = document.getElementById("toggle-button");
const statusImage = document.getElementById("status-image");

function toggleStatus(enabled) {
	statusLabel.textContent = enabled ? "Extension is ON" : "Extension is OFF";
	statusImage.src = enabled ? "../icons/active.png" : "../icons/inactive.png";
}

//Initialize
browser.storage.local.get("extensionEnabled").then((result) => {
	let isEnabled;
	if (typeof result.extensionEnabled == "undefined") {
		isEnabled = true;
	} else {
		isEnabled = result.extensionEnabled || false;
	}
	toggleStatus(isEnabled);
});

toggleButton.addEventListener("click",
	() => {
		browser.storage.local.get("extensionEnabled").then(
			(result) => {
				const isEnabled = result.extensionEnabled || false;
				browser.storage.local.set({ extensionEnabled: !isEnabled}).then(
					() => {
						toggleStatus(!isEnabled);
					}
				);
			}
		);
	}
);