var atelierForumPaypalBtn = function () {
	this.getExtensionFile = function (file) {
		return chrome.extension.getURL(file);
	}
	this.paypalPanda = function () {
		var pandaImg = document.createElement("img");
		pandaImg.src = this.getExtensionFile("assets/img/webInterfaceIcons/pandasalute.gif");
		pandaImg.setAttribute("data-toggle", "modal");
		pandaImg.setAttribute("data-target", "#paypalModal");
		pandaImg.setAttribute("class", "pandaSalute");
		document.getElementById("corps").parentNode.insertBefore(pandaImg, document.getElementById("corps").nextSibling);
		return this
	}
	this.modalDom = function () {
		var userName = document.querySelectorAll(".nav.pull-right.ltr .dropdown-toggle")[0].innerText;
		var modalHTML = document.createElement("div");
		modalHTML.innerHTML = '<div class="modal fade" id="paypalModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"><div class="paypalModalTitle">Hi ' + userName + '!<div><img src="' + this.getExtensionFile("assets/img/webInterfaceIcons/cutey-raccoon-emoticon.gif") + '" alt="" class="racoonImg"/></div></div><div>I\'m Frankusky, the developer of TFM notifier extension for chrome. I just want to say thank you for using my extension, I hope you like it so much as I like it develop it! Its has been a looong way through, with many headaches, frustations and time spent on it, but after all, a lot of fun and learning!<br><br>May I ask you a favor?<br><br>If you can, please consider making me a donation, doesn\'t matter the amount, every cent is welcome, if you can\'t, don\'t worry, you can also help me recommending my extension to your friends, sending suggestions or cheering me. <br><br>Thanks for using my extension and let me know your opinion about it :)</div><br><div>PS: dont worry, the extension will still free :P</div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default closePaypalModal" data-dismiss="modal">Close</button><div id="paypalDonateBtn" ></div></div></div>';
		return modalHTML
	}
	this.insertPaypalModal = function () {
		document.getElementsByTagName("body")[0].appendChild(this.modalDom());
		return this;
	}
	this.racoonListeners = function () {
		var that = this;
		$("#paypalDonateBtn").mouseenter(function () {
			$(".racoonImg").attr("src", that.getExtensionFile("assets/img/webInterfaceIcons/cute-cry-raccoon-emoticon.gif"));
		}).mouseleave(function () {
			$(".racoonImg").attr("src", that.getExtensionFile("assets/img/webInterfaceIcons/cutey-raccoon-emoticon.gif"));
		});
		$(".closePaypalModal").mouseenter(function () {
			$(".racoonImg").attr("src", that.getExtensionFile("assets/img/webInterfaceIcons/no-raccoon-emoticon.gif"));
		}).mouseleave(function () {
			$(".racoonImg").attr("src", that.getExtensionFile("assets/img/webInterfaceIcons/cutey-raccoon-emoticon.gif"));
		});

		return this
	}
	this.insertPaypalBtn = function () {
		var paypalForm = document.createElement("form");
		paypalForm.action = "https://www.paypal.com/cgi-bin/webscr";
		paypalForm.method = "post";
		paypalForm.target = "_blank";
		var inputCMD = document.createElement("input");
		inputCMD.type = "hidden";
		inputCMD.name = "cmd";
		inputCMD.value = "_s-xclick";
		var inputHostedBtnId = document.createElement("input");
		inputHostedBtnId.type = "hidden";
		inputHostedBtnId.value = "8R7YZCA74HXXW";
		inputHostedBtnId.name = "hosted_button_id";
		var inputImg = document.createElement("input");
		inputImg.type = "image";
		inputImg.src = "https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif";
		inputImg.border = "0";
		inputImg.name = "submit";
		inputImg.alt = "PayPal - The safer, easier way to pay online!";
		var paypalImg = document.createElement("img");
		paypalImg.alt = "";
		paypalImg.border = "0";
		paypalImg.src = "https://www.paypalobjects.com/en_US/i/scr/pixel.gif";
		paypalImg.width = "1";
		paypalImg.height = "1";
		paypalForm.appendChild(inputCMD);
		paypalForm.appendChild(inputHostedBtnId);
		paypalForm.appendChild(inputImg);
		paypalForm.appendChild(paypalImg);
		document.getElementById("paypalDonateBtn").appendChild(paypalForm);
		return this
	}
};

function hasResponseBar() {
	return $(".input-message").length > 0
}
if (hasResponseBar()) {
	var paypalBtn = new atelierForumPaypalBtn();
	paypalBtn
		.paypalPanda()
		.insertPaypalModal()
		.insertPaypalBtn()
		.racoonListeners();
}
