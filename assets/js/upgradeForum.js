(function () {
	var tfmForum = function () {
		/*JSON with the default emoticons
		 * @type Array emojiList array with the list of url images
		 * @type String tabName the name of the tab
		 */
		this.emojis = {
			tfmEmojis: {
				emojiList: ["http://img.atelier801.com/37a4f143.png", "http://img.atelier801.com/3724f143.png", "http://img.atelier801.com/36a4f143.png", "http://img.atelier801.com/3624f143.png", "http://img.atelier801.com/35a4f143.png", "http://img.atelier801.com/3524f143.png", "http://img.atelier801.com/34a4f143.png", "http://img.atelier801.com/3424f143.png", "http://img.atelier801.com/cba4f143.png", "http://img.atelier801.com/cb24f143.png"],
				tabName: "Default"
			},
			sabushaEmojis: {
				emojiList: ["http://i.imgur.com/zasOI.png", "http://i.imgur.com/H0WtZ.png", "http://i.imgur.com/hKZYR.png", "http://i.imgur.com/phTBJ.png", "http://i.imgur.com/f4jHb.png", "http://i.imgur.com/9iPlg.png", "http://i.imgur.com/Pp6uv.png", "http://i.imgur.com/CEZEQ.png", "http://i.imgur.com/aWiDs.png", "http://i.imgur.com/PoXpX.png", "http://i.imgur.com/Wb3Qx.png", "http://i.imgur.com/U6dt6.png"],
				tabName: "Sabusha"
			},
			fxieEmojis: {
				emojiList: ["http://i.imgur.com/Pp8ML.png", "http://i.imgur.com/QsLNX.png", "http://i.imgur.com/HNQ3Y.png", "http://i.imgur.com/qJIDs.png", "http://i.imgur.com/Mn8jf.png", "http://i.imgur.com/GEW50.png", "http://i.imgur.com/MGVC4.png", "http://i.imgur.com/oxVfm.png", "http://i.imgur.com/Opgj5.png", "http://i.imgur.com/SJY1r.png", "http://i.imgur.com/DLTl5.png", "http://i.imgur.com/mjxvy.png", "http://i.imgur.com/obJdw.png", "http://i.imgur.com/hHOal.png", "http://i.imgur.com/lXve6.png", "http://i.imgur.com/5meym.png", "http://i.imgur.com/0dXU1.png", "http://i.imgur.com/gqvWp.png", "http://i.imgur.com/fRe8E.png", "http://i.imgur.com/JDqoG.png", "http://i.imgur.com/t91LB.png", "http://i.imgur.com/WXz5q.png", "http://i.imgur.com/uCfkP.png", "http://i.imgur.com/61uC7.png"],
				tabName: "Fxie"
			},
			customEmojis: {
				emojiList: [],
				tabName: "Custom"
			}
		}
		/*Returns the url for certain file relative to the extension
		 * @type String file The url path of the file
		 * @return chrome extension file absolute path
		 */
		this.getExtensionFile = function (file) {
			return chrome.extension.getURL(file);
		}
		/*Generates the tab content
		 * @type Array emojisList List of emojis urls
		 * @return divs with images
		 */
		this.generateEmojisBodyContent = function (emojisList) {
			var bodyContent = "";
			for (var x in emojisList) {
				bodyContent += "<div class='emojisDropdownItems'><img src='" + emojisList[x] + "' alt='' /></div>"
			}
			return bodyContent
		}
		/*Creates a div that will contain the emojis
		 * @type Array emojisList List of emojis urls that will be sent to generateEmojisBodyContent to generate the body
		 * @return the div of the emoji body container
		 */
		this.generateEmojisTable = function (emojisList) {
			return "<div class='emojisDropdownContainer'>" + this.generateEmojisBodyContent(emojisList) + "</div>";
		}
		/* Generates the tabs for each emoji list
		 * @type String tabHash the id of the tab that will be refered on click
		 * @type String tabTitle the title name of the tab
		 * @return the li element for the tab
		 */
		this.generateTab = function (tabHash, tabTitle) {
			return "<li><a data-toggle='tab' href='#" + tabHash + "'>" + tabTitle + "</a></li>"
		}
		/* Generates the tabs container
		 * @type String tabId the id of the tab that will be showed
		 * @type Array emojiList list of the emojis
		 * @return the tab body
		 */
		this.generateTabBody = function (tabId, emojiList) {
			return "<div id='" + tabId + "' class='tab-pane fade'>" + this.generateEmojisTable(emojiList) + "</div>"
		}
		/* Generates the custom tab
		 * @type String textAreaId the id of the textarea that is referred to
		 */
		this.customEmojis = function (textAreaID) {
			$("#customEmojis" + textAreaID).html('<div class="loadingContainer"><div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div><div class="loadingText">Loading, please wait...</div></div>');
			return this
		}
		/* Generate dropdown (both body and tabs)
		 * @type String textAreaID the id of the textarea that is referred to
		 * @return String of the dropdown dom element
		 */
		this.generateDropdown = function (textAreaID) {
			var dropDownBody = "<ul class='dropdown-menu pull-right label-message emojisDropdown'>";
			var tabs = "";
			var tabsBody = ""
			for (var x in this.emojis) {
				if (this.emojis.hasOwnProperty(x)) {
					var idHash = x + textAreaID;
					tabs += this.generateTab(idHash, this.emojis[x].tabName);
					tabsBody += this.generateTabBody(idHash, this.emojis[x].emojiList);
				}
			}
			tabs = "<ul class='nav nav-tabs'>" + tabs + "</ul>";
			tabsBody = "<div class='tab-content'>" + tabsBody + "</div>";
			dropDownBody += tabs + tabsBody + "<div class='emojiFooter'>Provided by Frankusky</div></ul></div>";
			return dropDownBody;
		}
		/* Inserts emoji button in the input-message class
		 */
		this.insertBtn = function () {
			var that = this;
			var emojiIconUrl = that.getExtensionFile("assets/img/webInterfaceIcons/emojiIcon.png");
			$(".input-message").prev().each(function () {
				var textAreaID = this.id.replace(/[\D]/g, "");
				var btnDom = "<div class='btn-group groupe-boutons-barre-outils'> <button class='btn dropdown-toggle btn-reduit emojiBtn'><img src='" + emojiIconUrl + "'> <span class='caret'></span> </button>" + that.generateDropdown(textAreaID);
				this.innerHTML = this.innerHTML + btnDom;
				that.customEmojis(textAreaID);
			});
			return that;
		}
		/* Adds a click event listener on emoji button
		 */
		this.toggleDropDown = function () {
			$('.emojiBtn').on('click', function (event) {
				event.stopPropagation();
				event.stopImmediatePropagation();
				event.preventDefault();
				$(this).parent().toggleClass('open');
			});
			return this
		}
		/* Adds a click event on document to close emoji button
		 */
		this.dropDownCloserListener = function () {
			$("body").click(function (ev) {
				if (!$(".emojiBtn").parent().is(ev.target) && $(".emojiBtn").has(ev.target).length === 0 && $(".open").has(ev.target).length === 0) {
					$(".emojiBtn").parent().removeClass("open");
				}
			});
			return this
		}

		/* Event click listener for the images inside the dropdown
		 */
		this.emojiBtnImageClickListener = function () {
			var that = this;
			$(".emojisDropdownItems img").click(function (ev) {
				var bbCode = "[img]" + this.src + "[/img]";
				var actualTextArea = $(this).parents(".controls.ltr").children("textarea")[0];
				var actualText = actualTextArea.value;
				var finalMessage = actualText.substring(0, actualTextArea.selectionStart) + bbCode + actualText.substring(actualTextArea.selectionEnd, actualText.length);
				var newCursorPostion = actualTextArea.selectionStart + bbCode.length;
				actualTextArea.value = finalMessage;
				actualTextArea.setSelectionRange(newCursorPostion, newCursorPostion);
			});
			return that
		}

		/* Set classes to the first tab
		*/
		this.setActiveClasses = function () {
			$(".emojisDropdown .nav-tabs li:first-child").addClass("active");
			$(".emojisDropdown .tab-content .tab-pane:first-child").addClass("in active");
			return this
		}
		/********************************Paypal****************************/
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
			modalHTML.innerHTML = '<div class="modal fade" id="paypalModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"><div class="paypalModalTitle">Hi ' + userName + '!<div><img src="' + this.getExtensionFile("assets/img/webInterfaceIcons/cutey-raccoon-emoticon.gif") + '" alt="" class="racoonImg"/></div></div><div>I\'m Frankusky, the developer of TFM notifier extension for chrome. I just want to say thank you for using my extension, I hope you like it so much as I like it develop it! Its has been a looong way through, with many headaches, frustations and time spent on it, but after all, a lot of fun and learning!<br/><br/>May I ask you a favor?<br/><br/>If you can, please consider making me a donation, doesn\'t matter the amount, every cent is welcome, if you can\'t, don\'t worry, you can also help me recommending my extension to your friends, sending suggestions or cheering me. <br/><br/>Thanks for using my extension and let me know your opinion about it :)</div><br/><div>PS: dont worry, the extension will still free :P</div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default closePaypalModal" data-dismiss="modal">Close</button><div id="paypalDonateBtn" ></div></div></div>';
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
			paypalImg.width = "1"
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
		var newSession = new tfmForum;
		newSession
			.insertBtn()
			.setActiveClasses()
			.toggleDropDown()
			.emojiBtnImageClickListener()
			.dropDownCloserListener()
			.paypalPanda()
			.insertPaypalModal()
			.insertPaypalBtn()
			.racoonListeners();
	}
})()
