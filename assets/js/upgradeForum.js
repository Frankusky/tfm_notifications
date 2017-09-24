(function () {
	var tfmForum = function () {
		//██████╗ ███████╗███████╗ █████╗ ██╗   ██╗██╗  ████████╗    ██████╗  █████╗ ████████╗ █████╗ 
		//██╔══██╗██╔════╝██╔════╝██╔══██╗██║   ██║██║  ╚══██╔══╝    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
		//██║  ██║█████╗  █████╗  ███████║██║   ██║██║     ██║       ██║  ██║███████║   ██║   ███████║
		//██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║   ██║██║     ██║       ██║  ██║██╔══██║   ██║   ██╔══██║
		//██████╔╝███████╗██║     ██║  ██║╚██████╔╝███████╗██║       ██████╔╝██║  ██║   ██║   ██║  ██║
		//╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝       ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

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
		/*JQUERY DOM elements where I should set the emojiBtn*/
		this.placeHolders = [];
		// ██████╗██╗  ██╗██████╗  ██████╗ ███╗   ███╗███████╗    ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
		//██╔════╝██║  ██║██╔══██╗██╔═══██╗████╗ ████║██╔════╝    ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
		//██║     ███████║██████╔╝██║   ██║██╔████╔██║█████╗      ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
		//██║     ██╔══██║██╔══██╗██║   ██║██║╚██╔╝██║██╔══╝      ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
		//╚██████╗██║  ██║██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
		// ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
		/*Returns the url for certain file relative to the extension
		 * @type String file The url path of the file
		 * @return chrome extension file absolute path
		 */
		this.getExtensionFile = function (file) {
			return chrome.extension.getURL(file);
		}
		/*Sends message to chrome extension (both browser and background)
		 * @type Object data Object 
		 */
		this.sendMessageToExtension = function (data, callback) {
			chrome.runtime.sendMessage(data, callback);
		}
		// ██████╗ ███████╗███╗   ██╗███████╗██████╗ ██╗ ██████╗    ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
		//██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██║██╔════╝    ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
		//██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝██║██║         ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
		//██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██║██║         ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
		//╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║╚██████╗    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
		// ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝ ╚═════╝    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
		/*Generates the DOM for the emoji button*/
		this.generateButtonDom = function () {
			var emojiIconUrl = this.getExtensionFile("assets/img/webInterfaceIcons/emojiIcon.png");
			return '<div class="btn-group groupe-boutons-barre-outils"><button class="btn dropdown-toggle btn-reduit emojiBtn tfmExtension"><img src="' + emojiIconUrl + '"><span class="caret"></span> </button>'
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
		/* Generates the tabs container
		 * @type String tabId the id of the tab that will be showed
		 * @type Array emojiList list of the emojis
		 * @return the tab body
		 */
		this.generateTabBody = function (tabId, emojiList) {
			var className = tabId.replace(/\d/g, "");
			return "<div id='" + tabId + "' class='" + className + " tab-pane fade'>" + this.generateEmojisDiv(emojiList) + "</div>"
		}
		/* Generates the tabs for each emoji list
		 * @type String tabHash the id of the tab that will be refered on click
		 * @type String tabTitle the title name of the tab
		 * @return the li element for the tab
		 */
		this.generateTab = function (tabHash, tabTitle) {
			return "<li><a data-toggle='tab' href='#" + tabHash + "'>" + tabTitle + "</a></li>"
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
		/*Removes duplicated urls
		 *@type Array arrayOfImageUrls Array of urls that the user has provided in the input
		 *@return Array New array without duplicated values
		 */
		this.removeDuplicatedUrls = function (arrayOfImageUrls) {
			var that = this;
			arrayOfImageUrls = arrayOfImageUrls.reduce(function (pre, cur, pos) {
				if (pre.indexOf(cur) === -1 && that.emojis.customEmojis.emojiList.indexOf(cur) === -1) pre.push(cur)
				return pre
			}, []);
			return arrayOfImageUrls
		}
		/*Inserts custom emojis
		 * @type String inputValue The value of the nearest input
		 */
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
			$(document).on("keypress", ".customEmojiInput", function (ev) {
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
			$(document).on("click", ".saveCustomEmoji", function () {
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
			$(document).on("click", ".exportCustomsEmoji", function () {
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
		this.customEmojisTab = function () {
			var customEmojisInputAndButtons = '<div class="customEmojisFunctionalities"><input type="text" class="customEmojiInput" placeholder="Insert image url"><button title="Save Emojis" type="button" class="btn btn-reduit saveCustomEmoji"><span class="extensionBtnImage glyphicon glyphicon-floppy-save"></span></button><button title="Export Emojis" type="button" class="btn btn-reduit exportCustomsEmoji"><span class="extensionBtnImage glyphicon glyphicon-export"></span></button></div>';
			var customEmojisDiv = this.generateEmojisDiv(this.emojis.customEmojis.emojiList, true);
			$(".customEmojis").html(customEmojisInputAndButtons + customEmojisDiv);
			this.insertCustomEmojisEventListener();
		}
		/*Creates an ajax call to the giphy server with the specified tags
		 * @type String searchTags The tags that the user introduced
		 * @type DOM giphyEmojiContainer DOM element where will be inserted the results
		 */
		this.getGifsFromGiphy = function (searchTags, giphyEmojiContainer) {
			$.ajax({
				url: "http://api.giphy.com/v1/gifs/search?q=" + searchTags + "&api_key=dc6zaTOxFJmzC&limit=100",
				success: function (response) {
					giphyEmojiContainer.html("");
					var imagesArray = response.data.reduce(function (previous, current) {
						previous.push(current.images.fixed_height.url);
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
		/*Sets the inital loading message
		 *@type DOM domElement Recieves a dom element which will be overwritted his content to set a loading message
		 */
		this.insertLoadingMessageInGiphyTab = function (domElement) {
			domElement.html('<div class="loadingContainer"><div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div><div class="loadingText">Loading, please wait...</div></div>');
		}
		// ██████╗██╗  ██╗ █████╗ ██╗███╗   ██╗ █████╗ ██████╗ ██╗     ███████╗    ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
		//██╔════╝██║  ██║██╔══██╗██║████╗  ██║██╔══██╗██╔══██╗██║     ██╔════╝    ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
		//██║     ███████║███████║██║██╔██╗ ██║███████║██████╔╝██║     █████╗      ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
		//██║     ██╔══██║██╔══██║██║██║╚██╗██║██╔══██║██╔══██╗██║     ██╔══╝      ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
		//╚██████╗██║  ██║██║  ██║██║██║ ╚████║██║  ██║██████╔╝███████╗███████╗    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
		// ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
		/*Loads bootstrap gliphiicons font*/
		this.insertGlyphiIconFont = function () {
			var fa = document.createElement('style');
			fa.type = 'text/css';
			fa.textContent = '@font-face { font-family: Glyphicons Halflings; src: url("' +
				chrome.extension.getURL('assets/libs/fonts/glyphicons-halflings-regular.woff2') +
				'"); }';
			document.head.appendChild(fa);
			return this
		}

		//███████╗███╗   ███╗ ██████╗      ██╗██╗    ███████╗███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
		//██╔════╝████╗ ████║██╔═══██╗     ██║██║    ██╔════╝██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
		//█████╗  ██╔████╔██║██║   ██║     ██║██║    ███████╗█████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
		//██╔══╝  ██║╚██╔╝██║██║   ██║██   ██║██║    ╚════██║██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
		//███████╗██║ ╚═╝ ██║╚██████╔╝╚█████╔╝██║    ███████║███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
		//╚══════╝╚═╝     ╚═╝ ╚═════╝  ╚════╝ ╚═╝    ╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
		/* Searchs in the dom all the edit messages tools and stores it on placeHolders global variable*/
		this.getAllPlaceHolders = function () {
			this.placeHolders = $(".input-message:not(:has(.tfmExtension))").prev();
			return this;
		}
		/*Inserts the emoji button*/
		this.insertEmojiBtn = function () {
			var that = this;
			this.placeHolders.each(function () {
				var textAreaID = this.id.replace(/[\D]/g, "");
				var btnDom = that.generateButtonDom();
				var dropDownDom = that.generateDropdown(textAreaID);
				this.innerHTML = this.innerHTML + btnDom + dropDownDom;
			});
			return this;
		}
		/*Sends request to background page to retrieve user emojis*/
		this.getUserEmojis = function () {
			var that = this;
			this.sendMessageToExtension({
				method: "getEmojiData"
			}, function (data) {
				that.emojis.customEmojis.emojiList = data;
				that.customEmojisTab();
			})
			return this
		}
		/* Adds a click event listener on emoji button*/
		this.toggleDropDown = function () {
			this.placeHolders.find('.tfmExtension').on('click', function (event) {
				$(".open").removeClass("open");
				event.stopPropagation();
				event.stopImmediatePropagation();
				event.preventDefault();
				$(this).parent().toggleClass('open');
			});
			return this
		}
		/* Set classes to the first tab*/
		this.setActiveClasses = function () {
			this.placeHolders.find(".emojisDropdown .nav-tabs li:first-child").addClass("active");
			this.placeHolders.find(".emojisDropdown .tab-content .tab-pane:first-child").addClass("in active");
			return this
		}
		/* Adds a click event on document to close emoji button*/
		this.dropDownCloserListener = function () {
			$(document).on("click", function (ev) {
				if (!$(".emojiBtn").parent().is(ev.target) && $(".emojiBtn").has(ev.target).length === 0 && $(".open").has(ev.target).length === 0) {
					$(".emojiBtn").parent().removeClass("open");
				}
				if (!$(".gradientBtn").parent().is(ev.target) && $(".gradientBtn").has(ev.target).length === 0 && $(".open").has(ev.target).length === 0) {
					$(".gradientBtn").parent().removeClass("open");
				}
			});
			return this
		}
		/* Event click listener for the images inside the dropdown*/
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
		/*Inserts keypress listener for all giphy inputs*/
		this.insertSearchInputGiphyEventListener = function () {
			var that = this;
			$(document).on("keypress", ".giphyFunctionalities .giphyInput", function (ev) {
				var inputValue = this.value;
				if (ev.keyCode === 13 && inputValue.length > 0) {
					ev.stopPropagation();
					ev.stopImmediatePropagation();
					ev.preventDefault();
					var giphyEmojisContainer = $(this).parents(".giphy").find(".emojisDropdownContainer");
					$(this).parents(".giphy").find(".seeMoreGiphyGifs").addClass("hideSeeMoreText");
					giphyEmojisContainer.find("img").each(function () {
						this.src = "";
					})
					that.insertLoadingMessageInGiphyTab(giphyEmojisContainer);
					that.getGifsFromGiphy(inputValue, giphyEmojisContainer);
					this.value = "";
				};
			});
			return this
		}
		/*Inserts the basic DOM structre for the giphy tab*/
		this.insertGiphyTabContent = function () {
			var giphyLogo = this.getExtensionFile("assets/img/webInterfaceIcons/poweredByGiphy.png");
			this.placeHolders.find(".giphy").prepend('<div class="giphyFunctionalities"><input placeholder="Type some tags" type="text" class="giphyInput"/><button title="Search Gifs in Giphy" type="button" class="btn btn-reduit giphySearchGifBtn"><span class="glyphicon glyphicon-search extensionBtnImage"></span></button></div>');
			this.placeHolders.find(".giphy").append('<div class="seeMoreGiphyGifs hideSeeMoreText">See more</div><div class="poweredByGiphy"><img src="' + giphyLogo + '"/></div>');
			this.insertSearchInputGiphyEventListener()
				.insertSearchBtnGiphyEventListener()
				.seeMoreEventListener()
				.addToCustomsEmojis()
			return this
		}
		/*Inserts event listener on the see more text*/
		this.seeMoreEventListener = function () {
			$(document).on("click", ".seeMoreGiphyGifs", function () {
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
				thisEmojiDropdownContainer.animate({
					scrollTop: thisEmojiDropdownContainer[0].scrollHeight - 100
				}, 2000);
			});
			return this
		}
		/*Inserts event listener on the plus icon to add the gif to the custom list*/
		this.addToCustomsEmojis = function () {
			var that = this;
			$(document).on("click", ".giphy .addEmojiToCustom", function () {
				var imgUrl = $(this).siblings("img").attr("src");
				that.insertCustomEmojis(imgUrl);
			})
			return this
		}
		/*Inserts event listener on the search button that is located on the giphy tab*/
		this.insertSearchBtnGiphyEventListener = function () {
			var that = this;
			$(document).on("click", ".giphySearchGifBtn", function () {
				var inputValue = $(this).siblings(".giphyInput").val()
				var giphyEmojisContainer = $(this).parents(".giphy").find(".emojisDropdownContainer");
				$(this).parents(".giphy").find(".seeMoreGiphyGifs").addClass("hideSeeMoreText");
				that.insertLoadingMessageInGiphyTab(giphyEmojisContainer);
				that.getGifsFromGiphy(inputValue, giphyEmojisContainer);
			});
			return this
		}

		// ██████╗ ██████╗  █████╗ ██████╗ ██╗███████╗███╗   ██╗████████╗    ███████╗███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
		//██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝████╗  ██║╚══██╔══╝    ██╔════╝██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
		//██║  ███╗██████╔╝███████║██║  ██║██║█████╗  ██╔██╗ ██║   ██║       ███████╗█████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
		//██║   ██║██╔══██╗██╔══██║██║  ██║██║██╔══╝  ██║╚██╗██║   ██║       ╚════██║██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
		//╚██████╔╝██║  ██║██║  ██║██████╔╝██║███████╗██║ ╚████║   ██║       ███████║███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
		//╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

		/*Inserts the gradient button next to the emoji button*/
		this.insertGradientButton = function () {
			var gradientIconUrl = this.getExtensionFile("assets/img/webInterfaceIcons/gradientIcon.png");
			this.placeHolders.each(function () {
				this.innerHTML += `
					<div class="btn-group groupe-boutons-barre-outils">
						<button class="btn dropdown-toggle btn-reduit gradientBtn tfmExtension"><img src="${gradientIconUrl}"><span class="caret"></span> </button>
							<ul class="dropdown-menu pull-right label-message gradientDropdown"> 
								<input type="text" class="gradientText" placeholder="Put your text here" value="This is a demo">
								<button type="button" class="btn btn-reduit insertGradientText">
									<span class="glyphicon glyphicon-ok extensionBtnImage"></span>
								</button>
							<div id="colorInput">
								<label for="startColor">Start color:</label>
								<input type="color" class="startColor" value="#FF0000"/>
								<input type="text" class="startColorHex" maxlength="7" placeholder="Hex Color" value="#FF0000"/>
								<br>
								<label for="endColor">End color:</label>
								<input type="color" class="endColor" value="#FFFFFF"/>
								<input type="text" class="endColorHex" maxlength="7" placeholder="Hex Color" value="#FFFFFF"/>
								<div>Preview:<div>
								<div class="gradientPreview"></div>
							</div>
						</ul>
					</div>
				`
			})
			return this
		}
		
		this.hexToR = function(h) {
			return parseInt(h.substring(0, 2), 16)
		}

		this.hexToG = function(h) {
			return parseInt(h.substring(2, 4), 16)
		}

		this.hexToB = function(h) {
			return parseInt(h.substring(4, 6), 16)
		}

		this.rgbToHex = function(R, G, B) {
			return this.toHex(R) + this.toHex(G) + this.toHex(B)
		}

		this.toHex = function(n) {
			n = parseInt(n, 10);
			if (isNaN(n)) return "00";
			n = Math.max(0, Math.min(n, 255));
			return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
				"0123456789ABCDEF".charAt(n % 16);
		}
		
		this.textcolorizer_handle = function(text, startColor, endColor, type) {
			var str_html = "",
				str_bbcode = "",
				str_style = "";

			startColor = startColor.replace(/\#/g,"")
			endColor = endColor.replace(/\#/g,"")

			var a, r, g, b, rinc, ginc, binc, ccol;
			r=this.hexToR(startColor)
			g=this.hexToG(startColor)
			b=this.hexToB(startColor)
			rinc=(this.hexToR(endColor)-r)/text.length
			ginc=(this.hexToG(endColor)-g)/text.length
			binc=(this.hexToB(endColor)-b)/text.length
			for (a=0; a<text.length; a++) {
				ccol=this.rgbToHex(r,g,b);
				if (text.charAt(a)==" ") {
					str_html+=" ";
					str_bbcode+=" ";
				} else {
					str_html+="<span style='color:#"+ccol+";'>"+text.charAt(a)+"</span>";
					str_bbcode+='[color=#'+ccol+']'+text.charAt(a)+"[/color]";
				}
				r+=rinc;
				g+=ginc;
				b+=binc;
			}
			if(type==="bbcode"){
				return str_bbcode
			}else if(type==="html"){
				return str_html
			}
		}
		
		this.insertGradientListeners = function(){
			var that = this;
			$(document).on("keyup",".gradientText", function () {
				var gradientText = this.value,
					gradientStartColor = $(this).parent().find(".startColor").val(),
					gradientEndColor = $(this).parent().find(".endColor").val(),
					gradientResult = that.textcolorizer_handle(gradientText, gradientStartColor, gradientEndColor, "html");
				$(this).parent().find(".gradientPreview").html(gradientResult)
			})
			$(document).on("change", ".startColor, .endColor",function(){
				$("."+this.className.match(/(start|end)color/gi)[0]+"Hex").val(this.value);
				var gradientText = $(this).parents(".gradientDropdown").find(".gradientText").val(),
					gradientStartColor = $(this).parent().find(".startColor").val(),
					gradientEndColor = $(this).parent().find(".endColor").val(),
					gradientResult = that.textcolorizer_handle(gradientText, gradientStartColor, gradientEndColor, "html");
				$(this).parent().find(".gradientPreview").html(gradientResult)
			})
			$(document).on("keydown", ".startColorHex, .endColorHex",function(ev){
				if(!ev.ctrlKey && !ev.shiftKey&& "0123456789ABCDEF".indexOf(ev.key.toUpperCase())===-1 && ev.key.match(/backspace|arrow|delete|control|alt|shift|end|home/gi)===null){
					return false
				}
			}).on("paste", ".startColorHex, .endColorHex",function(ev){
				var pasteValue = ev.originalEvent.clipboardData.getData('Text').replace(/\#/gi,"");
				if(pasteValue.match(/[^#\da-f]+/gi)!==null){ 
					return false
				}
			}).on("keyup", ".startColorHex, .endColorHex",function(){
				var value = this.value.replace(/\#/g,"");
				if(value.length===6){
					var colorInputClassName = "."+this.className.match(/(start|end)ColorHex/gi)[0].replace("Hex","");
					$(this).parent().find(colorInputClassName).val(this.value);
					var gradientText = $(this).parents(".gradientDropdown").find(".gradientText").val(),
						gradientStartColor = $(this).parent().find(".startColor").val(),
						gradientEndColor = $(this).parent().find(".endColor").val(),
						gradientResult = that.textcolorizer_handle(gradientText, gradientStartColor, gradientEndColor, "html");
					$(this).parent().find(".gradientPreview").html(gradientResult)
				}
			})
			
			$(".gradientText").each(function(){
				var gradientText = this.value,
					gradientStartColor = $(this).parent().find(".startColor").val(),
					gradientEndColor = $(this).parent().find(".endColor").val(),
					gradientResult = that.textcolorizer_handle(gradientText, gradientStartColor, gradientEndColor,"html");
				$(this).parent().find(".gradientPreview").html(gradientResult)
			})
			
			$(document).on("click", ".insertGradientText", function(){
				var gradientText = $(this).parent().find(".gradientText").val(),
					gradientStartColor = $(this).parent().find(".startColor").val(),
					gradientEndColor = $(this).parent().find(".endColor").val(),
					gradientResult = that.textcolorizer_handle(gradientText, gradientStartColor, gradientEndColor, "bbcode"),
					actualTextArea = $(this).parents(".controls.ltr").children("textarea")[0],
					actualText = actualTextArea.value,
					finalMessage = actualText.substring(0, actualTextArea.selectionStart) + gradientResult + actualText.substring(actualTextArea.selectionEnd, actualText.length),
					newCursorPostion = actualTextArea.selectionStart + gradientResult.length;
					actualTextArea.value = finalMessage;
					actualTextArea.setSelectionRange(newCursorPostion, newCursorPostion);
					$(".open").removeClass("open");
					$(actualTextArea).focus()
			})
			return this
		}

	}

	function hasResponseBar() {
		return $(".input-message").length > 0
	}

	if (hasResponseBar()) {
		var newSession = new tfmForum;
		newSession
			.getUserEmojis()
			.insertGlyphiIconFont()
			.getAllPlaceHolders()
			.insertEmojiBtn()
			.insertGradientButton()
			.insertGiphyTabContent()
			.emojiBtnImageClickListener()
			.toggleDropDown()
			.setActiveClasses()
			.dropDownCloserListener()
			.insertGradientListeners()
	}
})()
