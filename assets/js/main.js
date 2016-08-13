(function () {
	$(document).ready(function () {
		let bg = chrome.extension.getBackgroundPage();

		function openWindow(newURL) {
			newURL = "http://atelier801.com/" + newURL
			chrome.tabs.create({
				url: newURL
			});
		}

		function showUserPosts(userNewData) {
			if (userNewData["hasError"] == true) {
				$(".application").addClass("hiddenElement");
				$(".errorMessage").removeClass("hiddenElement")
			} else {
				$(".application").removeClass("hiddenElement");
				$(".errorMessage").addClass("hiddenElement")
				$(".newActivity").empty();
				var response = userNewData.forumActivity;
				for (index in response) {
					$(".newActivity").append("<li postUrl='" + response[index]["postUrl"] + "' lastPostUser='"+response[index]["lastPostUser"]+"'><span>" + response[index]["postTitle"] + " by " + response[index]["lastPostUser"] + "</span></li>")
				}
			}
		}

		chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
			showUserPosts(message.tfm_notify_data);
		});

		bg.getData(function (response) {
			if ($.isEmptyObject(response)) {
				bg.saveData(userData);
			} else {
				let elementNotFound = true;
				$("select option").each(function () {
					if (Number($(this).val()) == Number(response.tfm_notify_data.refreshTime)) {
						$(this).attr("selected", true);
						elementNotFound = false;
					}
				});
				if (elementNotFound) {
					$("select option:last").attr("selected", true)
				}
				showUserPosts(response.tfm_notify_data);
			};
		});

		$("#refreshTime").on("change", function () {
			let refreshTime = $("select option:selected").val();
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
		
		$(".settingsIcon").click(function(){
			$(".sideBar").addClass("sideBarShow");
		});
		
		$(".closeConfig").click(function(){
			$(".sideBar").removeClass("sideBarShow");
		})
		
		$(document).on("click", ".newActivity li", function () {
			bg.updateNotification(""+($(".newActivity li").length-1), false);
			let lastUser = $(this).attr("lastPostUser"),
				postUrl = $(this).attr("postUrl");
			bg.getData(function(response){
				let activityData = response.tfm_notify_data.forumActivity;
				for(let x=0, activityLength = activityData.length; x<activityLength;x++){
					if(activityData[x].postUrl==postUrl && activityData[x].lastPostUser == lastUser){
						activityData.splice(x,1);
						response.tfm_notify_data.forumActivity = activityData;
						bg.saveData(response)
					}
				}
			});
			$(this).remove();
			openWindow($(this).attr("postUrl"));
		})
	});
})();