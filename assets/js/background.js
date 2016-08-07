var userData = {
	tfm_notify_data: {
		refreshTime: 1800000,
		hasError: false,
		forumActivity : []
	}
};

let baseEl = document.createElement("base");
baseEl.setAttribute("href", "http://atelier801.com");
document.getElementsByTagName("head")[0].appendChild(baseEl);

function getData(callback) {
	chrome.storage.local.get("tfm_notify_data", callback);
}

function saveData(data) {
	chrome.storage.local.set(data);
}

function updateNotification(numberOfNews, hasError) {
	if (hasError) {
		chrome.browserAction.setBadgeBackgroundColor({
			color: [255, 223, 15, 230]
		});
		chrome.browserAction.setBadgeText({
			text: "!"
		});
	} else if (Number(numberOfNews) == 0) {
		chrome.browserAction.setBadgeText({
			text: ""
		});
	} else {
		chrome.browserAction.setBadgeBackgroundColor({
			color: [244, 11, 19, 230]
		});
		chrome.browserAction.setBadgeText({
			text: numberOfNews
		});
	}
}

function hasUpdates(newActivity, lastActivity) {
	let xi = 0,
		newActivityLength = newActivity.length,
		lastActivityLength = lastActivity ? lastActivity.length : 0;
	for (let i = 0; i < newActivityLength; i++) {
		for (let x = 0; x < lastActivityLength; x++) {
			if ((newActivity[i].lastPostUser == lastActivity[x].lastPostUser) && (newActivity[i].postUrl == lastActivity[x].postUrl)) {
				xi++;
			}
		}
	}
	if(newActivityLength==0){
		return "none"
	}else if(xi == newActivity.length) {
		return false
	}
	return true
}

function checkFavorites() {
	let result = document.createElement("div"),
		tempData = [];

	$(result).load("http://atelier801.com/favorite-topics", function (response, status, xhr) {
		if ((status != "success") || ($(result).find("#identification").length > 0)) {
			userData.tfm_notify_data.hasError = true;
			userData.tfm_notify_data.forumActivity = [];
			updateNotification("", userData.tfm_notify_data.hasError);
		} else {
			userData.tfm_notify_data.hasError = false;
			$(result).find(".nombre-messages").each(function () {
				if (!($(this).hasClass("nombre-messages-lu"))) {
					let parentDom = $(this).parents(".table-cadre"),
						name = parentDom.find(".table-cadre-cellule-principale:first a:last").text().trim(),
						lastUser = parentDom.find(".element-sujet a .cadre-type-auteur-joueur").text().trim(),
						url = $(this).attr("href");
					tempData.push({
						postTitle: name,
						postUrl: url,
						lastPostUser: lastUser
					});
				}
			});
			let userUpdateStatus = hasUpdates(tempData, userData.tfm_notify_data.forumActivity);
			if (userUpdateStatus===true) {
				userData.tfm_notify_data.forumActivity = tempData;
				updateNotification("" + userData.tfm_notify_data["forumActivity"].length, userData.tfm_notify_data.hasError);
			}else if(userUpdateStatus==="none"){
				userData.tfm_notify_data.forumActivity = [];
				updateNotification("", false);
			}
		}
		saveData(userData);
	})
}


var updateInterval = 0;

function refreshUpdate(time) {
	clearInterval(updateInterval);
	updateInterval = setInterval(function () {
		checkFavorites();
	}, time);
}

chrome.storage.onChanged.addListener(function (variableChange, storageArea) {
	getData(function (response) {
		refreshUpdate(response.tfm_notify_data.refreshTime);
		chrome.runtime.sendMessage(response);
	});
});



getData(function (response) {
	if ($.isEmptyObject(response)) {
		saveData(userData);
	} else {
		userData = response;
	}
	refreshUpdate(response.tfm_notify_data.refreshTime);
});

checkFavorites();