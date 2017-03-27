(function () {
	var tfmForum = function () {
		this.textAreaCursorPosition = {
			start: 0,
			end: 0
		};

		this.emojis = {
			tfmEmojis: {
				emojiList: ["http://i.imgur.com/UWRr0GJ.png", "http://i.imgur.com/8vcM6SC.png", "http://i.imgur.com/1W100Wq.png", "http://i.imgur.com/p6AInvY.png", "http://i.imgur.com/aTwU9Kt.png", "http://i.imgur.com/cQh0ouT.png", "http://i.imgur.com/bFuyN6p.png", "http://i.imgur.com/xnVu4sa.png"],
				tabName: "Default"
			},
			sabushaEmojis: {
				emojiList: ["http://i.imgur.com/zasOI.png", "http://i.imgur.com/H0WtZ.png", "http://i.imgur.com/hKZYR.png", "http://i.imgur.com/phTBJ.png", "http://i.imgur.com/f4jHb.png", "http://i.imgur.com/9iPlg.png", "http://i.imgur.com/Pp6uv.png", "http://i.imgur.com/CEZEQ.png", "http://i.imgur.com/aWiDs.png", "http://i.imgur.com/PoXpX.png", "http://i.imgur.com/Wb3Qx.png", "http://i.imgur.com/U6dt6.png"],
				tabName: "Sabusha"
			}
		}
		this.getExtensionFile = function (file) {
			return chrome.extension.getURL(file);
		}

		this.generateEmojisBodyContent = function (emojisList) {
			var tableContent = "";
			for (var x in emojisList) {
				if (x == 0) tableContent += "<tr>"
				if (x != 0 && x % 3 == 0) tableContent += "</tr><tr>"
				tableContent += "<td class='cellule-dropdown'><li><img src='" + emojisList[x] + "' alt='' /></li></td>"
			}
			tableContent = tableContent + "<td></td>".repeat(3 - (emojisList.length % 3)) + "</tr>";
			return tableContent
		}

		this.generateEmojisTable = function (emojisList) {
			return "<table><tbody>" + this.generateEmojisBodyContent(emojisList) + "</tbody></table>";
		}

		this.generateTab = function (tabHash, tabTitle) {
			return "<li><a data-toggle='tab' href='#" + tabHash + "'>" + tabTitle + "</a></li>"
		}
		
		this.generateTabBody =  function(tabId, emojiList){
			return "<div id='" + tabId + "' class='tab-pane fade'>" + this.generateEmojisTable(emojiList) + "</div>"
		}

		this.generateDropdown = function () {
			var dropDownBody = "<ul class='dropdown-menu pull-right label-message emojisDropdown'>";
			var tabs = "";
			var tabsBody = ""
			for (var x in this.emojis) {
				if (this.emojis.hasOwnProperty(x)) {
					tabs += this.generateTab(x, this.emojis[x].tabName);
					tabsBody += this.generateTabBody(x, this.emojis[x].emojiList);
				}
			}
			tabs = "<ul class='nav nav-tabs'>" + tabs + "</ul>";
			tabsBody = "<div class='tab-content'>" + tabsBody + "</div>";
			dropDownBody += tabs+tabsBody + "<div class='emojiFooter'>Provided by Frankusky</div></ul></div>";
			return dropDownBody;
		}

		this.insertBtn = function () {
			var emojiIconUrl = this.getExtensionFile("assets/img/webInterfaceIcons/emojiIcon.png");
			var btnDom = "<div class='btn-group groupe-boutons-barre-outils'> <button class='btn dropdown-toggle btn-reduit emojiBtn'><img src='" + emojiIconUrl + "'> <span class='caret'></span> </button>" + this.generateDropdown();
			$("#outils_message_reponse").append(btnDom);
			return this;
		}

		this.textareaCursorPositionListener = function () {
			var that = this;
			$("#message_reponse").focusout(function () {
				that.textAreaCursorPosition.start = this.selectionStart;
				that.textAreaCursorPosition.end = this.selectionEnd;
			});
			return that
		}

		this.toggleDropDown = function () {
			$('.emojiBtn').on('click', function (event) {
				event.stopPropagation();
				$(this).parent().toggleClass('open');
			});
			return this
		}

		this.dropDownCloserListener = function () {
			$("body").click(function (ev) {
				if (!$(".emojiBtn").parent().is(ev.target) && $(".emojiBtn").has(ev.target).length === 0 && $(".open").has(ev.target).length === 0) {
					$(".emojiBtn").parent().removeClass("open");
				}
			});
			return this
		}

		this.emojiBtnImageClickListener = function () {
			var that = this;
			$("#emojiDefault img").click(function (ev) {
				var bbCode = "[img]" + this.src + "[/img]";
				var actualText = $("#message_reponse").val();
				var finalMessage = actualText.substring(0, that.textAreaCursorPosition.start) + bbCode + actualText.substring(that.textAreaCursorPosition.end, actualText.length);
				$("#message_reponse").val(finalMessage);
				that.textAreaCursorPosition.start = that.textAreaCursorPosition.start + bbCode.length;
				that.textAreaCursorPosition.end = that.textAreaCursorPosition.start;
			});
			return that
		}

		this.setActiveClasses = function () {
			$(".emojisDropdown .nav-tabs li:first-child").addClass("active");
			$(".emojisDropdown .tab-content .tab-pane:first-child").addClass("in active");
			return this
		}
	};


	function hasResponseBar() {
		return $("#outils_message_reponse").length > 0
	}
	if (hasResponseBar()) {
		var newSession = new tfmForum;
		newSession.insertBtn().setActiveClasses().toggleDropDown().emojiBtnImageClickListener().textareaCursorPositionListener().dropDownCloserListener();
	}
})()
