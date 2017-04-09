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
	function showUserPosts() {
		renderView();
		if (bg.userData.tfm_notify_data["hasError"] == true) {
			$(".application, .configSection").addClass("hiddenElement");
			$(".errorMessage").removeClass("hiddenElement")
		} else {
			$(".application, .configSection").removeClass("hiddenElement");
			$(".errorMessage").addClass("hiddenElement");
		}
	}

	function updateSelectsValue() {
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
		if(message.method==="checkFavorites"){
			showUserPosts();
		}
	});

	/*Gets configuration data for the first time*/
	showUserPosts();
	updateSelectsValue();

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
		renderView()
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
	
	$(document).on("click", ".goToFavorites", function () {
		openWindow("favorite-topics");
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
		var lastUser = $(this).attr("lastpostuser"),
			postUrl = $(this).attr("posturl");
		var activityData = bg.userData.tfm_notify_data.forumActivity;
		for (var x = 0, activityLength = activityData.length; x < activityLength; x++) {
			if (activityData[x].postUrl == postUrl && activityData[x].lastPostUser == lastUser) {
				activityData.splice(x, 1);
				bg.userData.tfm_notify_data.forumActivity = activityData;
				bg.saveData(bg.userData);
				break;
			}
		}
		$(this).remove();
		var newsAmmount = $(".newActivity .newActivityItem").length + Number(bg.userData.privateMsgsNumber);
		bg.updateNotification(newsAmmount, false);
		openWindow(postUrl);
	})

	$(document).on("click", ".privateMsgs", function(){
		bg.userData.privateMsgsNumber = "0";
		var newsAmmount = $(".newActivity .newActivityItem").length;
		bg.updateNotification(newsAmmount, false);
		bg.saveData(bg.userData);
		openWindow("conversations");
	});
	function renderView() {
		var template = $("#template").html();
		var mustacheData = bg.userData.languageData;
		mustacheData["threadData"] = bg.userData.tfm_notify_data.forumActivity;
		mustacheData["privateMsgsNumber"] = bg.userData.privateMsgsNumber;
		var render = Mustache.render(template, mustacheData)
		$("#tfmNotifierArea").html(render);
		updateSelectsValue();
	}
	
	/*Just for fun*/
	/*Hover over my name :D*/
	$(document).on("mouseenter", ".subtitle", function(){
		$("body").css("background-image", "url('assets/img/tumblr_m5mt77UO9E1qecngho1_500.gif')")
		$(".thankYouMsg").css("display", "block")
	}).on("mouseleave", ".subtitle", function(){
		$("body").css("background-image", "none")
		$(".thankYouMsg").css("display", "none")
	})
	/*Clicking heart icon*/
	$(document).on("click", ".specialThanksIcon", function(){
		$(".specialThanks").fadeIn();
		setTimeout(function(){
			$(".specialThanks").fadeOut();
		},5000)
	})
});