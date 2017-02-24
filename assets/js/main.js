$(document).ready(function () {
	/*Get background functions*/
	var bg = chrome.extension.getBackgroundPage();

	/*Opens forum posts into a new tab*/
	function openWindow(newURL) {
		newURL = "http://atelier801.com/" + newURL
		chrome.tabs.create({
			url: newURL
		});
	}

	/*Displays the new posts*/
	function showUserPosts(userNewData) {
		if (userNewData["hasError"] == true) {
			$(".application, .configSection").addClass("hiddenElement");
			$(".errorMessage").removeClass("hiddenElement")
		} else {
			$(".application, .configSection").removeClass("hiddenElement");
			$(".errorMessage").addClass("hiddenElement");
			var response = userNewData.forumActivity;
			renderView(response);
		}
	}
	function updateSelectsValue(){
		$("#refreshTime option").each(function () {
			if (Number($(this).val()) == Number(bg.userData.tfm_notify_data.refreshTime)) {
				$(this).attr("selected", true);
			}
		});
		$("#language option").each(function () {
			if ($(this).val().toLowerCase() === bg.userData.tfm_notify_data.language.toLowerCase()) {
				$(this).attr("selected", true);
			}
		});
	}
	/*Event listener*/
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		showUserPosts(message.tfm_notify_data);
	});

	/*Gets configuration data for the first time*/
	bg.getData(function (response) {
		var userData = {};
		if ($.isEmptyObject(response)) {
			userData = bg.userData.tfm_notify_data;
		} else {
			//Setting new value, since at the start it doesnt exists
			if(typeof(response.language)==="undefined"){response.tfm_notify_data.language = "en"}
			userData = response.tfm_notify_data;
		};
		bg.saveData(userData);
		showUserPosts(userData);
		updateSelectsValue();
	});

	/*Updates refresh time*/
	$(document).on("change", "#refreshTime", function () {
		var refreshTime = $("#refreshTime option:selected").val();
		bg.userData.tfm_notify_data.refreshTime = refreshTime;
		bg.saveData(bg.userData);
	});

	/*Updates language*/
	$(document).on("change", "#language", function () {
		var language = $("#language option:selected").val();
		bg.userData.tfm_notify_data.language = language;
		bg.saveData(bg.userData);
		renderView(bg.userData.tfm_notify_data.forumActivity)
	});
	/*************UX THINGS HERE******************/
	$(document).on("click", ".alreadySaw", function () {
		chrome.browserAction.setBadgeText({
			text: ""
		});
		window.close();
	});

	$(document).on("click", ".goToForum", function () {
		openWindow("");
	});

	$(document).on("click", ".refresh", function () {
		bg.checkFavorites();
	});

	$(document).on("click", ".settingsIcon", function () {
		$(".configSection").addClass("configSectionShow");
	});

	$(document).on("click", ".closeConfig", function () {
		$(".configSection").removeClass("configSectionShow");
	})

	/*Event listener for clicking new activity*/
	$(document).on("click", ".newActivity .newActivityItem", function () {
		var lastUser = $(this).attr("lastPostUser"),
			postUrl = $(this).attr("postUrl");
		bg.getData(function (getDataResponse) {
			var activityData = getDataResponse.tfm_notify_data.forumActivity;
			for (var x = 0, activityLength = activityData.length; x < activityLength; x++) {
				if (activityData[x].postUrl == postUrl && activityData[x].lastPostUser == lastUser) {
					activityData.splice(x, 1);
					getDataResponse.tfm_notify_data.forumActivity = activityData;
					bg.saveData(getDataResponse)
				}
			}
		});
		$(this).remove();
		bg.updateNotification("" + ($(".newActivity .newActivityItem").length), false);
		openWindow(postUrl);
	})

	function renderView(data) {
		var template = $("#template").html();
		var mustacheData = {
			threadData: data
		}
		var render = Mustache.render(template, mustacheData)
		$("#tfmNotifierArea").html(render);
		updateSelectsValue();
	}
});