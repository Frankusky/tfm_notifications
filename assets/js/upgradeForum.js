(function () {
	/*ADDING JQUERY SPECIAL EVENTS*/
	(function($){
		$.event.special.destroyed = {
			remove: function(o) {
				if (o.handler) {
					o.handler()
				}
			}
		}
	})(jQuery)
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
			},
			giphy: { /*Shouldn't set this here, but im lazzy to generate the tab manually*/
				emojiList: [],
				tabName: "Giphy"
			}
		}
		/*Flag to know when userData from background has been loaded*/
		this.userDataIsLoaded = false;
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
		this.generateEmojisBodyContent = function (emojisList, isCustomEmojis) {
			var bodyContent = "";
			for (var x in emojisList) {
				var removeBtn = ""
				if (isCustomEmojis && emojisList.length > 0) {
					removeBtn = '<div class="removeEmoji glyphicon glyphicon-remove"></div>'
				};
				bodyContent += "<div class='emojisDropdownItems'><img src='" + emojisList[x] + "' alt='' />" + removeBtn + "</div>"
			}
			return bodyContent
		}
		/*Creates a div that will contain the emojis
		 * @type Array emojisList List of emojis urls that will be sent to generateEmojisBodyContent to generate the body
		 * @return the div of the emoji body container
		 */
		this.generateEmojisDiv = function (emojisList, isCustomEmojis) {
			return "<div class='emojisDropdownContainer'>" + this.generateEmojisBodyContent(emojisList, isCustomEmojis) + "</div>";
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
			var className = tabId.replace(/\d/g, "");
			return "<div id='" + tabId + "' class='" + className + " tab-pane fade'>" + this.generateEmojisDiv(emojiList) + "</div>"
		}
		/*Sets the inital loading message*/
		this.insertLoadingMessageInGiphyTab = function (domElement) {
			domElement.html('<div class="loadingContainer"><div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div><div class="loadingText">Loading, please wait...</div></div>');
		}
		/*Sends message to chrome extension (both browser and background)
		 * @type Object data Object 
		 */
		this.sendMessageToExtension = function (data, callback) {
			chrome.runtime.sendMessage(data, callback);
		}
		/*Sends request to background page to retrieve user emojis*/
		this.getUserEmojis = function () {
			var that = this;
			this.sendMessageToExtension({
				method: "getEmojiData"
			}, function (data) {
				that.emojis.customEmojis.emojiList = data;
			})
			return this
		}
		/*Kinda promise that checks if emoji data is available*/
		this.userDataExtensionPromise = function (textAreaId) {
			var that = this;
			var userDataIntervalCheck = 0;
			userDataIntervalCheck = setInterval(function () {
				if (that.userData !== false) {
					that.loadCustomEmojis(textAreaId);
					clearInterval(userDataIntervalCheck);
				}
			}, 100);
		}
		/*Loads glyphiicon font*/
		this.insertGlyphiIconFont = function () {
			var fa = document.createElement('style');
			fa.type = 'text/css';
			fa.textContent = '@font-face { font-family: Glyphicons Halflings; src: url("' +
				chrome.extension.getURL('assets/libs/fonts/glyphicons-halflings-regular.woff2') +
				'"); }';
			document.head.appendChild(fa);
			return this
		}
		/*Images url validation
		 * @type String urls Only one url or a bunch of urls delimited by comma
		 * @type return array with only the images that has past the regex validation
		 */
		this.validImages = function (urls) {
			var arrayOfImages = urls.split(",");
			return arrayOfImages.filter(function (item) {
				return /(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/.test(item) && !/\[|\]/g.test(item) && item.length > 0;
			});
		}
		/*Removes duplicated urls*/
		this.removeDuplicatedUrls = function (arrayOfImageUrls) {
			var that = this;
			arrayOfImageUrls = arrayOfImageUrls.reduce(function (pre, cur, pos) {
				if (pre.indexOf(cur) === -1 && that.emojis.customEmojis.emojiList.indexOf(cur) === -1) pre.push(cur)
				return pre
			}, []);
			return arrayOfImageUrls
		}
		/*Inserts custom emojis*/
		this.insertCustomEmojis = function (inputValue) {
			var imagesArray = this.validImages(inputValue.replace(/ /g, ""));
			imagesArray = this.removeDuplicatedUrls(imagesArray);
			this.emojis.customEmojis.emojiList = this.emojis.customEmojis.emojiList.concat(imagesArray);
			this.sendMessageToExtension({
				method: "saveEmojiData",
				emojisData: this.emojis.customEmojis.emojiList
			}, function (data) {})
			var customEmojisBodyDiv = this.generateEmojisBodyContent(this.emojis.customEmojis.emojiList, true);
			$(".customEmojis .emojisDropdownContainer").html(customEmojisBodyDiv);
		}
		/*Event listener for the input at custom tab*/
		this.customEmojiInputEventListener = function () {
			var that = this;
			$(".customEmojiInput").keypress(function (ev) {
				if (ev.keyCode === 13) {
					ev.stopPropagation();
					ev.stopImmediatePropagation();
					ev.preventDefault();
					that.insertCustomEmojis(this.value);
					this.value = "";
				};
			});
		}
		/*Event listener for the save button at custom tab*/
		this.customEmojiSaveBtnEventListener = function () {
			var that = this;
			$(".saveCustomEmoji").click(function () {
				var customEmojisInput = $(this).siblings(".customEmojiInput")[0];
				that.insertCustomEmojis(customEmojisInput.value);
				customEmojisInput.value = "";
			});
		}
		/*Event listener for the remove emoji btn at custom tab*/
		this.customEmojiRemoveBtnEventListener = function () {
			var that = this;
			$(document).on("click", ".removeEmoji", function () {
				var emojiContainer = $(this).parent();
				var imageSrc = emojiContainer.children("img").attr("src");
				var index = that.emojis.customEmojis.emojiList.indexOf(imageSrc);
				if (index !== -1) {
					that.emojis.customEmojis.emojiList.slice(index, 1);
					that.sendMessageToExtension({
						method: "saveEmojiData",
						emojisData: that.emojis.customEmojis.emojiList
					}, function (data) {})
				};
				$(".customEmojis [src='" + imageSrc + "']").parent().remove();
			})
		}
		/*Event listener for the import btn at custom tab*/
		this.customEmojiExportBtnEventListener = function () {
			var that = this;
			$(".exportCustomsEmoji").click(function () {
				var thisInput = $(this).siblings(".customEmojiInput")[0];
				thisInput.value = that.emojis.customEmojis.emojiList.join(",");
				thisInput.select();
				document.execCommand("copy");
				window.getSelection().empty();
			});
		}
		/*Inserts event listeners for input and buttons at custom tab*/
		this.insertCustomEmojisEventListener = function () {
			this.customEmojiInputEventListener();
			this.customEmojiSaveBtnEventListener();
			this.customEmojiRemoveBtnEventListener();
			this.customEmojiExportBtnEventListener();
		}
		/*Inserts input and buttons in custom tab*/
		this.loadCustomEmojis = function (textAreaId) {
			var customEmojisInputAndButtons = '<div class="customEmojisFunctionalities"><input type="text" class="customEmojiInput" placeholder="Insert image url"><button title="Save Emojis" type="button" class="btn btn-reduit saveCustomEmoji"><span class="extensionBtnImage glyphicon glyphicon-floppy-save"></span></button><button title="Export Emojis" type="button" class="btn btn-reduit exportCustomsEmoji"><span class="extensionBtnImage glyphicon glyphicon-export"></span></button></div>';
			var customEmojisDiv = this.generateEmojisDiv(this.emojis.customEmojis.emojiList, true);
			$("#customEmojis" + textAreaId).html(customEmojisInputAndButtons + customEmojisDiv);
			this.insertCustomEmojisEventListener();
		}
		/* Generates the custom tab
		 * @type String textAreaId the id of the textarea that is referred to
		 */
		this.customEmojisTab = function (textAreaID) {
			this.userDataExtensionPromise(textAreaID);
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
				that.customEmojisTab(textAreaID);
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
			$(document).on("click", ".emojisDropdownItems", function (ev) {
				var thisTargetClasses = ev.target.className.split(" ")
				if (thisTargetClasses.indexOf("removeEmoji") === -1 && thisTargetClasses.indexOf("addEmojiToCustom") === -1) {
					var imageUrl = this.src ? this.src : $(this).find("img").attr("src");
					var bbCode = "[img]" + imageUrl + "[/img]";
					var actualTextArea = $(this).parents(".controls.ltr").children("textarea")[0];
					var actualText = actualTextArea.value;
					var finalMessage = actualText.substring(0, actualTextArea.selectionStart) + bbCode + actualText.substring(actualTextArea.selectionEnd, actualText.length);
					var newCursorPostion = actualTextArea.selectionStart + bbCode.length;
					actualTextArea.value = finalMessage;
					actualTextArea.setSelectionRange(newCursorPostion, newCursorPostion);
				}
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

		this.getGifsFromGiphy = function (searchTags, giphyEmojiContainer) {
			$.ajax({
				url: "http://api.giphy.com/v1/gifs/search?q=" + searchTags + "&api_key=dc6zaTOxFJmzC&limit=100",
				success: function (response) {
					giphyEmojiContainer.html("");
					var imagesArray = response.data.reduce(function (previous, current) {
						previous.push(current.images.original.url);
						return previous
					}, [])
					for (var i = 0, imagesLength = imagesArray.length; i < imagesLength; i++) {
						if (i < 15) {
							giphyEmojiContainer.append('<div class="emojisDropdownItems"><div class="addEmojiToCustom glyphicon glyphicon-plus"></div><img src="' + imagesArray[i] + '" alt=""/></div>')
						} else {
							giphyEmojiContainer.append('<div class="emojisDropdownItems hiddenEmoji"><div class="addEmojiToCustom glyphicon glyphicon-plus"></div><img imgurl="' + imagesArray[i] + '" alt=""/></div>')
						}
					}
					if (imagesArray.length > 15) {
						giphyEmojiContainer.siblings(".seeMoreGiphyGifs").removeClass("hideSeeMoreText")
					} else {
						giphyEmojiContainer.siblings(".seeMoreGiphyGifs").addClass("hideSeeMoreText")
					}
				}
			});
		}

		this.insertSearchInputGiphyEventListener = function () {
			var that = this;
			$(".giphyFunctionalities .giphyInput").keypress(function (ev) {
				var inputValue = this.value;
				if (ev.keyCode === 13 && inputValue.length > 0) {
					ev.stopPropagation();
					ev.stopImmediatePropagation();
					ev.preventDefault();
					var giphyEmojisContainer = $(this).parents(".giphy").find(".emojisDropdownContainer");
					$(this).parents(".giphy").find(".seeMoreGiphyGifs").addClass("hideSeeMoreText");
					giphyEmojisContainer.find("img").each(function(){
						this.src = "";
					})
					that.insertLoadingMessageInGiphyTab(giphyEmojisContainer);
					that.getGifsFromGiphy(inputValue, giphyEmojisContainer);
					this.value = "";
				};
			});
			return this
		}

		this.seeMoreEventListener = function () {
			$(".seeMoreGiphyGifs").click(function () {
				var thisEmojiDropdownContainer = $(this).siblings(".emojisDropdownContainer");
				thisEmojiDropdownContainer.find(".emojisDropdownItems.hiddenEmoji:lt(10)").each(function () {
					var actualEmojiItem = $(this);
					actualEmojiItem.removeClass("hiddenEmoji");
					var imgElement = actualEmojiItem.find("img");
					var imageUrlValue = imgElement.attr("imgurl");
					imgElement.attr("src", imageUrlValue);
				})
				var numberOfHiddenEmojis = $(this).siblings(".emojisDropdownContainer").find(".emojisDropdownItems.hiddenEmoji:lt(10)").length;
				if (numberOfHiddenEmojis === 0) $(this).addClass("hideSeeMoreText");
				console.log(thisEmojiDropdownContainer[0].scrollHeight);
				thisEmojiDropdownContainer.animate({
					scrollTop: thisEmojiDropdownContainer[0].scrollHeight - 100
				}, 2000);
			});
			return this
		}

		this.addToCustomsEmojis = function () {
			var that = this;
			$(document).on("click", ".giphy .addEmojiToCustom", function () {
				var imgUrl = $(this).siblings("img").attr("src");
				that.insertCustomEmojis(imgUrl);
			})
			return this
		}

		this.insertSearchBtnGiphyEventListener = function(){
			var that = this;
			$(".giphySearchGifBtn").click(function(){
				var inputValue = $(this).siblings(".giphyInput").val()
				var giphyEmojisContainer = $(this).parents(".giphy").find(".emojisDropdownContainer");
				$(this).parents(".giphy").find(".seeMoreGiphyGifs").addClass("hideSeeMoreText");
				that.insertLoadingMessageInGiphyTab(giphyEmojisContainer);
				that.getGifsFromGiphy(inputValue, giphyEmojisContainer);
			});
			return this
		}
		
		this.insertGiphyTabContent = function () {
			$(".giphy").prepend('<div class="giphyFunctionalities"><input placeholder="Type some tags" type="text" class="giphyInput"/><button title="Search Gifs in Giphy" type="button" class="btn btn-reduit giphySearchGifBtn"><span class="glyphicon glyphicon-search extensionBtnImage"></span></button></div>');
			$(".giphy").append('<div class="seeMoreGiphyGifs hideSeeMoreText">See more</div><div class="poweredByGiphy"><img src="' + this.getExtensionFile("assets/img/webInterfaceIcons/poweredByGiphy.png") + '"/></div>');
			this.insertSearchInputGiphyEventListener()
				.insertSearchBtnGiphyEventListener()
				.seeMoreEventListener()
				.addToCustomsEmojis()
			return this
		}
	}

	function hasResponseBar() {
		return $(".input-message").length > 0
	}
	if (hasResponseBar()) {
		var newSession = new tfmForum;
		newSession
			.insertGlyphiIconFont()
			.getUserEmojis()
			.insertBtn()
			.insertGiphyTabContent()
			.setActiveClasses()
			.toggleDropDown()
			.emojiBtnImageClickListener()
			.dropDownCloserListener()
	}
	
	
})()
