//$(document).ready(function(){
let baseEl = document.createElement("base");
baseEl.setAttribute("href", "http://atelier801.com");
document.getElementsByTagName("head")[0].appendChild(baseEl);


function updateNotification(numberOfNews, requestData) {
	console.log(requestData);
	if (requestData.hasError) {
		chrome.browserAction.setBadgeBackgroundColor({
			color: [255,223,15,230]
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
	chrome.runtime.sendMessage({
		data: requestData
	});
}

function checkFavorites() {
	let result = document.createElement("div"),
		requestData = {
			hasError: false,
			favoritesData: []
		};
	$(result).load("http://atelier801.com/favorite-topics", function () {
		if ($("#auth_login_1").length == 0) {
			$(result).find(".nombre-messages").each(function () {
				if (!($(this).hasClass("nombre-messages-lu"))) {
					let parentDom = $(this).parents(".table-cadre"),
						name = parentDom.find(".table-cadre-cellule-principale:first a:last").text().trim(),
						lastUser = parentDom.find(".element-sujet a .cadre-type-auteur-joueur").text().trim(),
						url = $(this).attr("href");
					requestData["favoritesData"].push({
						postTitle: name,
						postUrl: url,
						lastPostUser: lastUser
					});
				}
			});
		} else {
			requestData.hasError = true;
		}
		updateNotification("" + requestData["favoritesData"].length, requestData);
	})
}

function refreshUpdate(time) {
	let updateInterval = 0;
	clearInterval(updateInterval);
	updateInterval = setInterval(function () {
		checkFavorites();
	}, time);
}

checkFavorites();
refreshUpdate(180000);
//});