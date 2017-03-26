(function () {
	var tfmForum = function () {
		this.textAreaCursorPosition = {
			start: 0,
			end: 0
		};
		
		this.tfmEmojis = ["http://i.imgur.com/UWRr0GJ.png", "http://i.imgur.com/8vcM6SC.png", "http://i.imgur.com/1W100Wq.png", "http://i.imgur.com/p6AInvY.png", "http://i.imgur.com/aTwU9Kt.png", "http://i.imgur.com/cQh0ouT.png", "http://i.imgur.com/bFuyN6p.png", "http://i.imgur.com/xnVu4sa.png"];

		this.sabushaEmojis = ["http://i.imgur.com/zasOI.png","http://i.imgur.com/H0WtZ.png","http://i.imgur.com/hKZYR.png","http://i.imgur.com/phTBJ.png","http://i.imgur.com/f4jHb.png","http://i.imgur.com/9iPlg.png","http://i.imgur.com/Pp6uv.png","http://i.imgur.com/CEZEQ.png","http://i.imgur.com/aWiDs.png","http://i.imgur.com/PoXpX.png","http://i.imgur.com/Wb3Qx.png","http://i.imgur.com/U6dt6.png"];

		this.getExtensionFile = function (file) {
			return chrome.extension.getURL(file);
		}

		this.generateEmojisBodyContent = function(emojisList){
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
			var tableContent = this.generateEmojisBodyContent(this.tfmEmojis);
			tableContent = tableContent + this.generateEmojisBodyContent(this.sabushaEmojis);
			return "<table><tbody>" + tableContent + "</tbody></table>";
		}

		this.generateDropdown = function(){
			
		}

		this.insertBtn = function () {
			var emojiIconUrl = this.getExtensionFile("assets/img/webInterfaceIcons/emojiIcon.png");
//			var btnDom = "<div class='btn-group groupe-boutons-barre-outils'> <button class='btn dropdown-toggle btn-reduit emojiBtn'><img src='" + emojiIconUrl + "'> <span class='caret'></span> </button><ul class='dropdown-menu pull-right label-message emojisDropdown'><ul class='nav nav-tabs'><li class='active'><a data-toggle='tab' href='#emojiDefault'>Default</a></li></ul><div class='tab-content'><div id='emojiDefault' class='tab-pane fade in active'>" + this.generateEmojisTable() + "</div></div><div class='emojiFooter'>Provided by Frankusky</div></ul></div>";
			var btnDom = "<div class='btn-group groupe-boutons-barre-outils'> <button class='btn dropdown-toggle btn-reduit emojiBtn'><img src='" + emojiIconUrl + "'> <span class='caret'></span> </button><ul class='dropdown-menu pull-right label-message emojisDropdown'><ul class='nav nav-tabs'><li class='active'><a data-toggle='tab' href='#emojiDefault'>Default</a></li></ul><div class='tab-content'><div id='emojiDefault' class='tab-pane fade in active'>" + this.generateEmojisTable() + "</div></div><div class='emojiFooter'>Provided by Frankusky</div></ul></div>";
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
	};


	function hasResponseBar() {
		return $("#outils_message_reponse").length > 0
	}
	if (hasResponseBar()) {
		var newSession = new tfmForum;
		newSession.insertBtn().toggleDropDown().emojiBtnImageClickListener().textareaCursorPositionListener().dropDownCloserListener();
	}
})()