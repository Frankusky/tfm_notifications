/*Default structure of the stored data*/
var userData = {
	tfm_notify_data: {
		refreshTime: 1800000,
		hasError: false,
		forumActivity : [],
		language: "en"
	}
};
/*Creates a base element in order to read atelier forum favorites section*/
var baseEl = document.createElement("base");
baseEl.setAttribute("href", "http://atelier801.com");
document.getElementsByTagName("head")[0].appendChild(baseEl);
/*Gets the local storage data*/
function getData(callback) {
	chrome.storage.local.get("tfm_notify_data", callback);
}
/*Saves the data in the local storage*/
function saveData(data) {
	chrome.storage.local.set(data);
}
/*Updates the notification icon*/
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
/*Checks if user has new activity*/
function hasUpdates(newActivity, lastActivity) {
	var xi = 0,
		newActivityLength = newActivity.length,
		lastActivityLength = lastActivity ? lastActivity.length : 0;
	for (var i = 0; i < newActivityLength; i++) {
		for (var x = 0; x < lastActivityLength; x++) {
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
/*Loads favorite topics section and checks for activity*/
function checkFavorites() {
	var result = document.createElement("div"),
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
					var parentDom = $(this).parents(".table-cadre"),
						name = parentDom.find(".table-cadre-cellule-principale:first a:last").text().trim(),
						lastUser = parentDom.find(".lien-blanc > span")[0].innerText,
						url = $(this).attr("href");
					tempData.push({
						postTitle: name,
						postUrl: url,
						lastPostUser: lastUser
					});
				}
			});
			var userUpdateStatus = hasUpdates(tempData, userData.tfm_notify_data.forumActivity);
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

/*setInterval variable*/
var updateInterval = 0;
/*Updates the time that will be refreshed*/
function refreshUpdate(time) {
	clearInterval(updateInterval);
	updateInterval = setInterval(function () {
		checkFavorites();
	}, time);
}
/*Add event listener that listens if the storage data has changed*/
chrome.storage.onChanged.addListener(function (variableChange, storageArea) {
	getData(function (response) {
		refreshUpdate(response.tfm_notify_data.refreshTime);
		chrome.runtime.sendMessage(response);
	});
});

/*Loads user data*/
getData(function (response) {
	if ($.isEmptyObject(response)) {
		saveData(userData);
	} else {
		userData = response;
	}
	refreshUpdate(response.tfm_notify_data.refreshTime);
});
/*First time execution*/
checkFavorites();