//chrome.tabs.onUpdated.addListener(function(tabId, statusData, somethingelse){
//	if(statusData.status === "complete"){
//		console.log("id: ",tabId)
//		console.log("data: ", statusData);
//		console.log("data2: ", somethingelse)
//	}
//})

chrome.webNavigation.onCompleted.addListener(function (details) {
	if (details.url.indexOf("atelier801")>=0) {
		var tabId = details.tabId;
		chrome.tabs.executeScript(tabId, {},function(){});
	}
})