(function () {
	var tfmForum = (function () {
		function getExtensionFile(file) {
			return chrome.extension.getURL(file);
		}

//		function generateEmojisTable(emojiList) {
//			var 
//			return 
//		}

		function insertBtn() {
			var emojiIconUrl = getExtensionFile("assets/img/webInterfaceIcons/emojiIcon.png");
//			var btnDom = "<div class='btn-group groupe-boutons-barre-outils'> <button class='btn dropdown-toggle btn-reduit' data-toggle='dropdown'><img src=" + emojiIconUrl + "> <span class='caret'></span> </button> <ul class='dropdown-menu pull-right label-message emojisDropdown'> <table> <tbody><tr> <td class='cellule-dropdown'><li><img src='http://i.imgur.com/UWRr0GJ.png' alt=''/></li></td> </tr> </tbody></table><div class='emojiFooter'><a href='http://atelier801.com/topic?f=5&t=835586&p=1'>Provided by Frankusky</a></div> </ul> </div>";
			var btnDom = "<div class='btn-group groupe-boutons-barre-outils'> <button class='btn dropdown-toggle btn-reduit emojiBtn'><img src=" + emojiIconUrl + "> <span class='caret'></span> </button> <ul class='dropdown-menu pull-right label-message emojisDropdown'> <ul class='nav nav-tabs'><li class='active'><a data-toggle='tab' href='#home'>Home</a></li><li><a data-toggle='tab' href='#menu1'>Menu 1</a></li><li><a data-toggle='tab' href='#menu2'>Menu 2</a></li></ul><div class='tab-content'><div id='home' class='tab-pane fade in active'><h3>HOME</h3><p>Some content.</p></div><div id='menu1' class='tab-pane fade'><h3>Menu 1</h3><p>Some content in menu 1.</p></div><div id='menu2' class='tab-pane fade'><h3>Menu 2</h3><p>Some content in menu 2.</p></div></div> </ul> </div>";
			$("#outils_message_reponse").append(btnDom);
			$('.emojiBtn').on('click', function (event) {
				$(this).parent().toggleClass('open');
			});
//			$('body').on('click', function (e) {
//				if (!$('.emojiBtn').is(e.target) && $('.emojiBtn').has(e.target).length === 0 ) {
//					$('.emojiBtn').parent().removeClass('open');
//				}
//			});
		}
		return {
			emojiBtn: function () {
				return insertBtn()
			}
		}
	})();
	function hasResponseBar() {
		return $("#outils_message_reponse").length > 0
	}
	if (hasResponseBar()) {
		tfmForum.emojiBtn();
	}
})()
