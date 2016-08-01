(function () {
	$(document).ready(function () {
		let bg = chrome.extension.getBackgroundPage(),
			userConfig = {
				refreshTime: 900000
			};

		chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
			if (message.data["hasError"]==true) {
				$(".application").addClass("hiddenElement");
				$(".errorMessage").removeClass("hiddenElement")
			} else {
				$(".application").removeClass("hiddenElement");
				$(".errorMessage").addClass("hiddenElement")
				$(".newActivity").empty();
				var response = message.data.favoritesData;
				for (index in response) {
					$(".newActivity").append("<li postUrl='" + response[index]["postUrl"] + "'><span>" + response[index]["postTitle"] + " by " + response[index]["lastPostUser"] + "</span></li>")
				}
			}
		});

		function saveConfig() {
			localStorage["tfm_notifier"] = JSON.stringify(userConfig);
		}

		function openWindow(newURL) {
			newURL = "http://atelier801.com/" + newURL
			chrome.tabs.create({
				url: newURL
			});
		}
		bg.checkFavorites();
		bg.refreshUpdate(1800000);

		if (localStorage["tfm_notifier"]) {
			userConfig = JSON.parse(localStorage["tfm_notifier"]);
			bg.refreshUpdate(userConfig.refreshTime);
			$("select option").each(function () {
				if (Number($(this).val()) == Number(userConfig.refreshTime)) {
					$(this).attr("selected", true)
				}
			});
		}
		$(".alreadySaw").click(function () {
				chrome.browserAction.setBadgeText({
					text: ""
				});
				window.close();
			})
			//		$("#desktopAlerts").click(function(){
			//			// Let's check if the browser supports notifications
			//			if (!("Notification" in window)) {
			//				alert("This browser does not support desktop notification");
			//			}
			//
			//			// Let's check if the user is okay to get some notification
			//			else if (Notification.permission === "granted") {
			//				// If it's okay let's create a notification
			//				var notification = new Notification("Hi there!");
			//			}
			//
			//			// Otherwise, we need to ask the user for permission
			//			// Note, Chrome does not implement the permission static property
			//			// So we have to check for NOT 'denied' instead of 'default'
			//			else if (Notification.permission !== 'denied') {
			//				Notification.requestPermission(function (permission) {
			//
			//					// Whatever the user answers, we make sure we store the information
			//					if(!('permission' in Notification)) {
			//						Notification.permission = permission;
			//					}
			//
			//					// If the user is okay, let's create a notification
			//					if (permission === "granted") {
			//						var notification = new Notification("Hi there!");
			//					}
			//				});
			//			}
			//
			//			// At last, if the user already denied any notification, and you 
			//			// want to be respectful there is no need to bother him any more.
			//		});
			//		
		$("#refreshTime").on("change", function () {
			let refreshTime = $("select option:selected").val();
			userConfig.refreshTime = refreshTime;
			saveConfig();
			bg.refreshUpdate(refreshTime);
		});
		$(document).on("click", ".newActivity li", function () {
			bg.updateNotification($(".newActivity li").length-1, false);
			openWindow($(this).attr("postUrl"));
		})
	});
})();