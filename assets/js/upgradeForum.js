(function () {
	var tfmForum = function () {
		this.emojis = {
			tfmEmojis: {
				emojiList: ["http://img.atelier801.com/37a4f143.png","http://img.atelier801.com/3724f143.png","http://img.atelier801.com/36a4f143.png","http://img.atelier801.com/3624f143.png","http://img.atelier801.com/35a4f143.png","http://img.atelier801.com/3524f143.png","http://img.atelier801.com/34a4f143.png","http://img.atelier801.com/3424f143.png","http://img.atelier801.com/cba4f143.png","http://img.atelier801.com/cb24f143.png"],
				tabName: "Default"
			},
			sabushaEmojis: {
				emojiList: ["http://i.imgur.com/zasOI.png", "http://i.imgur.com/H0WtZ.png", "http://i.imgur.com/hKZYR.png", "http://i.imgur.com/phTBJ.png", "http://i.imgur.com/f4jHb.png", "http://i.imgur.com/9iPlg.png", "http://i.imgur.com/Pp6uv.png", "http://i.imgur.com/CEZEQ.png", "http://i.imgur.com/aWiDs.png", "http://i.imgur.com/PoXpX.png", "http://i.imgur.com/Wb3Qx.png", "http://i.imgur.com/U6dt6.png"],
				tabName: "Sabusha"
			},
			fxieEmojis:{
				emojiList: ["http://i.imgur.com/Pp8ML.png","http://i.imgur.com/QsLNX.png","http://i.imgur.com/HNQ3Y.png","http://i.imgur.com/qJIDs.png","http://i.imgur.com/Mn8jf.png","http://i.imgur.com/GEW50.png","http://i.imgur.com/MGVC4.png","http://i.imgur.com/oxVfm.png","http://i.imgur.com/Opgj5.png","http://i.imgur.com/SJY1r.png","http://i.imgur.com/DLTl5.png","http://i.imgur.com/mjxvy.png","http://i.imgur.com/obJdw.png","http://i.imgur.com/hHOal.png","http://i.imgur.com/lXve6.png","http://i.imgur.com/5meym.png","http://i.imgur.com/0dXU1.png","http://i.imgur.com/gqvWp.png","http://i.imgur.com/fRe8E.png","http://i.imgur.com/JDqoG.png","http://i.imgur.com/t91LB.png","http://i.imgur.com/WXz5q.png","http://i.imgur.com/uCfkP.png","http://i.imgur.com/61uC7.png"],
				tabName : "Fxie"
			},
			customEmojis:{
				emojiList:[],
				tabName: "Custom"
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
				tableContent += "<div class='emojisDropdownItems'><img src='" + emojisList[x] + "' alt='' /></div>"
			}
			return tableContent
		}

		this.generateEmojisTable = function (emojisList) {
			return "<div class='emojisDropdownContainer'>" + this.generateEmojisBodyContent(emojisList) + "</div>";
		}

		this.generateTab = function (tabHash, tabTitle) {
			return "<li><a data-toggle='tab' href='#" + tabHash + "'>" + tabTitle + "</a></li>"
		}
		
		this.generateTabBody =  function(tabId, emojiList){
			return "<div id='" + tabId + "' class='tab-pane fade'>" + this.generateEmojisTable(emojiList) + "</div>"
		}
		this.customEmojis = function(textAreaID){
			$("#customEmojis"+textAreaID).html("<img src='"+this.getExtensionFile("assets/img/webInterfaceIcons/inprogress.png")+"' style='height: auto;width: 100px;text-align: center;display: block;margin: 0 auto;'><div style='text-align:center;color:#6FD6FC'>In progress</div>")
			return this
		}
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
			dropDownBody += tabs+tabsBody + "<div class='emojiFooter'>Provided by Frankusky</div></ul></div>";
			return dropDownBody;
		}

		this.insertBtn = function () {
			var that = this;
			var emojiIconUrl = that.getExtensionFile("assets/img/webInterfaceIcons/emojiIcon.png");
			$(".input-message").prev().each(function(){
				var textAreaID = this.id.replace(/[\D]/g,"");
				var btnDom = "<div class='btn-group groupe-boutons-barre-outils'> <button class='btn dropdown-toggle btn-reduit emojiBtn'><img src='" + emojiIconUrl + "'> <span class='caret'></span> </button>" + that.generateDropdown(textAreaID);
				this.innerHTML = this.innerHTML+btnDom;
				that.customEmojis(textAreaID);
			});
			return that;
		}
		this.toggleDropDown = function () {
			$('.emojiBtn').on('click', function (event) {
				event.stopPropagation();
				event.stopImmediatePropagation();
				event.preventDefault();
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
			$(".emojisDropdownItems img").click(function (ev) {
				var bbCode = "[img]" + this.src + "[/img]";
				var actualTextArea = $(this).parents(".controls.ltr").children("textarea")[0];
				var actualText = actualTextArea.value;
				var finalMessage = actualText.substring(0, actualTextArea.selectionStart) + bbCode + actualText.substring(actualTextArea.selectionEnd, actualText.length);
				var newCursorPostion = actualTextArea.selectionStart + bbCode.length;
				actualTextArea.value = finalMessage;
				actualTextArea.setSelectionRange(newCursorPostion,newCursorPostion);
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
		return $(".input-message").length > 0
	}
	if (hasResponseBar()) {
		var newSession = new tfmForum;
		newSession.insertBtn().setActiveClasses().toggleDropDown().emojiBtnImageClickListener().dropDownCloserListener();
	}
})()