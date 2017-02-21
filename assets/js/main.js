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
			$(".errorMessage").addClass("hiddenElement")
//			$(".newActivity").empty();
			var response = userNewData.forumActivity;
//			for (var index in response) {
//				$(".newActivity").append("<li postUrl='" + response[index]["postUrl"] + "' lastPostUser='" + response[index]["lastPostUser"] + "'><span>" + response[index]["postTitle"] + " by " + response[index]["lastPostUser"] + "</span></li>")
//			}
			renderView(response);
		}
	}

	/*Event listener*/
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		showUserPosts(message.tfm_notify_data);
	});

	/*Gets configuration data*/
	bg.getData(function (response) {
		var userData = {};
		if ($.isEmptyObject(response)) {
			userData = bg.userData.tfm_notify_data;
			bg.saveData(bg.userData);
		} else {
			var elementNotFound = true;
			$("select option").each(function () {
				if (Number($(this).val()) == Number(response.tfm_notify_data.refreshTime)) {
					$(this).attr("selected", true);
					elementNotFound = false;
				}
			});
			if (elementNotFound) {
				$("select option:last").attr("selected", true)
			}
			userData = response.tfm_notify_data;
		};
		showUserPosts(userData);
	});

	/*Updates refresh time*/
	$("#refreshTime").on("change", function () {
		var refreshTime = $("select option:selected").val();
		bg.userData.tfm_notify_data.refreshTime = refreshTime;
		bg.saveData(bg.userData);
	});

	/*************UX THINGS HERE******************/
	$(".alreadySaw").click(function () {
		chrome.browserAction.setBadgeText({
			text: ""
		});
		window.close();
	});

	$(".goToForum").click(function () {
		openWindow("");
	});

	$(".refresh").click(function () {
		bg.checkFavorites();
	});

	$(".settingsIcon").click(function () {
		$(".configSection").addClass("configSectionShow");
	});

	$(".closeConfig").click(function () {
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
	
	function renderView(data){
		var template = $("#template").html();
		var mustacheData = {threadData : data}
		var render = Mustache.render(template, mustacheData)
		$("#tfmNotifierArea").html(render);
	}
});