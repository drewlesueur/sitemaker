(function() {
  var each, toggler,
    __slice = Array.prototype.slice;

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  each = _.each;

  toggler = function() {
    var list, togglerIndex;
    list = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    togglerIndex = 0;
    return function() {
      var ret;
      ret = list[togglerIndex];
      togglerIndex += 1;
      if (togglerIndex === list.length) togglerIndex = 0;
      return ret;
    };
  };

  window.SiteMaker = {
    create: function() {
      var addBox, background, border, borderRadius, boxJSON, boxShadow, boxes, boxesHtml, boxesJSON, button, changeImages, clearAll, color, createBox, decreaseFontAndImage, defaultFont, deleteBox, download, downloadUrl, escape, font, fontStyle, fontWeight, getHighlightedBox, getNextBorderRadius, getNextBoxShadow, getNextFont, getNextFontStyle, getNextFontWeight, getNextLetterSpacing, getNextLineHeight, getNextMoveTo, getNextPic, getNextTextAlign, getNextTextShadow, getPics, gotPics, h1, h2, h3, h4, height, highlightIndex, highlightNextBox, html, image, increaseFontAndImage, init, insert, leftAlign, letterSpacing, lineHeight, link, load, margin, moveTo, name, opacity, padding, preventRender, preventRendering, preview, randomPicIndex, randomPics, render, save, saveLocalStorage, selectBox, selectedBox, selectedBoxes, setDownloadLink, setHighlightIndex, setupIframeBinding, setupKeyBindings, siteMaker, textAlign, textShadow, toggleFont, topAlign, unPreventRender, width, zIndex;
      siteMaker = {};
      getNextFont = toggler("Helvetica", "Lobster", "Source Sans Pro", "Tangerine", "Courgette", "Boogaloo", "Fugaz One", "PT Serif", "Krona One");
      _.extend(siteMaker, Backbone.events);
      boxes = [];
      siteMaker.boxes = boxes;
      selectedBoxes = [];
      selectedBox = null;
      highlightIndex = 0;
      siteMaker.getHighlightIndex = function() {
        return highlightIndex;
      };
      setHighlightIndex = function(index) {
        highlightIndex = index;
        if (highlightIndex > boxes.length - 1) highlightIndex = 0;
        selectedBox = getHighlightedBox();
        return render();
      };
      selectBox = function() {
        var box;
        box = getHighlightedBox();
        return box.toggleSelect();
      };
      deleteBox = function() {
        if (selectedBoxes.length) {
          return _.each(selectedBoxes, function(selectedBox) {
            return selectedBox["delete"]();
          });
        } else {
          return getHighlightedBox()["delete"]();
        }
      };
      insert = function() {
        getHighlightedBox().editing = true;
        return render();
      };
      escape = function() {
        var newContent;
        if (selectedBox.editing === true) {
          newContent = selectedBox.el.find('textarea').val();
          selectedBox.content = newContent;
          selectedBox.editing = false;
        } else {
          selectedBox.editing = true;
        }
        return render();
      };
      h1 = function() {
        _.each(selectedBoxes, function(box) {
          box.preContent = "<h1>";
          return box.postContent = "</h1>";
        });
        return render();
      };
      h2 = function() {
        _.each(selectedBoxes, function(box) {
          box.preContent = "<h2>";
          return box.postContent = "</h2>";
        });
        return render();
      };
      h3 = function() {
        _.each(selectedBoxes, function(box) {
          box.preContent = "<h3>";
          return box.postContent = "</h3>";
        });
        return render();
      };
      h4 = function() {
        _.each(selectedBoxes, function(box) {
          box.preContent = "";
          return box.postContent = "";
        });
        return render();
      };
      link = function() {
        selectedBox.content = "<a href=\"#\">" + selectedBox.content + "</a>";
        selectedBox.editSelection = [9, 10];
        return render();
      };
      button = function() {
        selectedBox.content = "<div class='button'>" + selectedBox.content + "</div>";
        return render();
      };
      image = function() {
        var img;
        img = getNextPic();
        selectedBox.content = "<img src=\"" + img + "\" style=\"\n  width:{{imageWidth}}%;\n  top:{{imageTop}}px;\n  left:{{imageLeft}}px;\n  position:absolute;\n\"/>";
        selectedBox.editSelection = [10, 10 + img.length];
        return render();
      };
      increaseFontAndImage = function() {
        _.each(selectedBoxes, function(box) {
          box.css.fontSize += 1;
          return box.imageWidth += 10;
        });
        return render();
      };
      decreaseFontAndImage = function() {
        _.each(selectedBoxes, function(box) {
          box.css.fontSize -= 1;
          return box.imageWidth -= 10;
        });
        return render();
      };
      defaultFont = function() {
        _.each(selectedBoxes, function(box) {
          return box.css.fontSize = 16;
        });
        return render();
      };
      background = function() {
        var code;
        code = prompt("background?");
        selectedBox.css.background = code;
        return render();
      };
      getNextBorderRadius = toggler("5", "10", "15", "20", "0");
      siteMaker.getNextBorderRadius = getNextBorderRadius;
      borderRadius = function() {
        selectedBox.css.borderRadius = getNextBorderRadius();
        return render();
      };
      opacity = function() {
        var code;
        code = prompt("Opacity?");
        selectedBox.css.opacity = code;
        return render();
      };
      getNextLineHeight = toggler("60%", "70%", "80%", "90%", "100%", "110%", "120%", "130%", "140%");
      siteMaker.getNextLineHeight = getNextLineHeight;
      lineHeight = function() {
        selectedBox.css.lineHeight = getNextLineHeight();
        return render();
      };
      getNextLetterSpacing = toggler("", "-.02em", "-.04em", "-.06em", "-.08em", ".1em", ".12em", ".14em", ".16em");
      siteMaker.getNextLetterSpacing = getNextLetterSpacing;
      letterSpacing = function() {
        selectedBox.css.letterSpacing = getNextLetterSpacing();
        return render();
      };
      margin = function() {
        var code;
        code = prompt("Margin?");
        selectedBox.css.margin = code;
        return render();
      };
      padding = function() {
        var code;
        code = prompt("Padding?");
        selectedBox.css.padding = code;
        return render();
      };
      width = function() {
        var code;
        code = prompt("Width?");
        selectedBox.css.width = code;
        return render();
      };
      height = function() {
        var code;
        code = prompt("Height?");
        selectedBox.css.height = code;
        return render();
      };
      getNextBoxShadow = toggler("0 0 10px gray", "0 0 10px black", "0 0 20px gray", "0 0 20px black", "inset 0 0 10px black", "inset 0 0 10px gray", "");
      siteMaker.getNextBoxShadow = getNextBoxShadow;
      boxShadow = function() {
        selectedBox.css.boxShadow = getNextBoxShadow();
        return render();
      };
      getNextFontWeight = toggler("bold", "normal");
      siteMaker.getNextFontWeight = getNextFontWeight;
      fontWeight = function() {
        selectedBox.css.fontWeight = getNextFontWeight();
        return render();
      };
      getNextFontStyle = toggler("italic", "normal");
      siteMaker.getNextFontStyle = getNextFontStyle;
      fontStyle = function() {
        selectedBox.css.fontStyle = getNextFontStyle();
        return render();
      };
      getNextTextAlign = toggler("center", "right", "left");
      siteMaker.getNextTextAlign = getNextTextAlign;
      textAlign = function() {
        selectedBox.css.textAlign = getNextTextAlign();
        return render();
      };
      zIndex = function() {
        var code;
        code = prompt("?z-index?");
        selectedBox.css.zIndex = code;
        return render();
      };
      getNextMoveTo = toggler(function() {
        var maxZ;
        maxZ = _.max(_.map(boxes, (function(b) {
          return b.css.zIndex || 0;
        })));
        _.each(selectedBoxes, function(box) {
          return box.css.zIndex = maxZ + 1;
        });
        return render();
      }, function() {
        var minZ;
        minZ = _.min(_.map(boxes, (function(b) {
          return b.css.zIndex || 0;
        })));
        _.each(boxes, function(box) {
          return box.css.zIndex += 1;
        });
        _.each(selectedBoxes, function(box) {
          return box.css.zIndex = minZ;
        });
        return render();
      });
      moveTo = function() {
        return getNextMoveTo()();
      };
      getNextTextShadow = toggler("0 1px white", "0 -1px black", "");
      siteMaker.getNextTextShadow = getNextTextShadow;
      textShadow = function() {
        selectedBox.css.textShadow = getNextTextShadow();
        return render();
      };
      border = function() {
        var code;
        code = prompt("Border?");
        selectedBox.css.border = code;
        return render();
      };
      color = function() {
        var code;
        code = prompt("font color?");
        selectedBox.css.color = code;
        return render();
      };
      font = function() {
        var fontName;
        fontName = prompt("font?");
        selectedBox.css.fontFamily = fontName;
        return render();
      };
      toggleFont = function() {
        var fontName;
        fontName = getNextFont();
        selectedBox.css.fontFamily = fontName;
        return render();
      };
      changeImages = function() {
        return getPics(prompt("what type of pics? eg. kitten"));
      };
      name = "";
      save = function() {
        var data;
        data = {
          name: name || (name = prompt("name?")),
          code: html()
        };
        $.ajax({
          type: "POST",
          url: "http://drewl.us:8500/save",
          data: data,
          success: function() {},
          error: function() {
            return alert('error saving');
          }
        });
        console.log("test");
        return window.open("http://" + name + ".sites.drewl.us");
      };
      siteMaker.save = save;
      clearAll = function() {
        boxes = [];
        selectedBox = null;
        selectedBoxes = [];
        delete localStorage.boxes;
        return render();
      };
      load = function(exp) {
        var _boxes;
        _boxes = JSON.parse(exp);
        _.each(boxes, function(box) {
          return box["delete"]();
        });
        _.each(_boxes, function(box) {
          return addBox(box);
        });
        return render();
      };
      siteMaker.load = load;
      leftAlign = function() {
        var minLeft;
        console.log("left align");
        minLeft = _.min(_.map(selectedBoxes, function(box) {
          return box.left;
        }));
        console.log(minLeft);
        _.each(selectedBoxes, function(box) {
          return box.left = minLeft;
        });
        return render();
      };
      topAlign = function() {
        var minTop;
        console.log("top align");
        minTop = _.min(_.map(selectedBoxes, function(box) {
          return box.top;
        }));
        console.log(minTop);
        _.each(selectedBoxes, function(box) {
          return box.top = minTop;
        });
        return render();
      };
      setupKeyBindings = function() {
        var bindings, func, i, key, _len, _results, _step,
          _this = this;
        bindings = [
          "left", leftAlign, "up", topAlign, "shift+s", save, "i", image, "shift+i", changeImages, "l", link, "f", font, "shift+f", toggleFont, "=", increaseFontAndImage, "-", decreaseFontAndImage, "0", defaultFont, "1", h1, "2", h2, "3", h3, "4", h4, "a", function() {
            return addBox();
          }, "p", preview, "e", insert, "tab", highlightNextBox, "enter", selectBox, "d", deleteBox, "esc", escape, "shift+c", background, "c", color, "s", boxShadow, "r", borderRadius, "o", opacity, "+", lineHeight, "_", letterSpacing, "m", margin, "shift+m", padding, "t", textAlign, "z", moveTo, "x", textShadow, "shift+x", clearAll, "b", border, "shift+b", button, "w", width, "h", height, "q", fontWeight, "shift+q", fontStyle, "ctrl+shift+s", saveLocalStorage
        ];
        _results = [];
        for (i = 0, _len = bindings.length, _step = 2; i < _len; i += _step) {
          key = bindings[i];
          func = bindings[i + 1];
          _results.push(Mousetrap.bind(key, func));
        }
        return _results;
      };
      setupIframeBinding = function() {
        return $(".iframe-url").keyup(function(e) {
          var val;
          val = $(this).val();
          val = val.replace("http://", "");
          return $('iframe').attr("src", "http://" + $(this).val());
        });
      };
      getPics = function(tag) {
        if (tag == null) tag = "kitten";
        return $.get("http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3800913a1c5ace11cf355e763b130b2d&tags=" + tag + "&format=json&jsoncallback=siteMaker.gotPics");
      };
      siteMaker.getPics = getPics;
      randomPics = [];
      randomPicIndex = 0;
      getNextPic = function() {
        var pic;
        randomPicIndex += 1;
        if (randomPicIndex > randomPics.length - 1) randomPicIndex = 0;
        pic = randomPics[randomPicIndex];
        return "http://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
      };
      gotPics = function(pics) {
        randomPics = pics.photos.photo;
        randomPicIndex = 0;
        return console.log(randomPics);
      };
      siteMaker.getRandomPics = function() {
        return randomPics;
      };
      siteMaker.gotPics = gotPics;
      saveLocalStorage = function() {
        console.log("saving");
        return localStorage.boxes = boxesJSON();
      };
      init = function() {
        setupKeyBindings();
        setupIframeBinding();
        getPics();
        if (localStorage.boxes) return load(localStorage.boxes);
      };
      highlightNextBox = function(e) {
        e.preventDefault();
        return setHighlightIndex(highlightIndex + 1);
      };
      boxJSON = function(box) {
        var el, ret;
        el = box.el;
        delete box.el;
        ret = JSON.stringify(box);
        box.el = el;
        return ret;
      };
      boxesJSON = function() {
        var els, ret;
        els = [];
        _.each(boxes, function(box) {
          els.push(box.el);
          return delete box.el;
        });
        ret = JSON.stringify(boxes);
        _.each(boxes, function(box) {
          return box.el = els.shift();
        });
        return ret;
      };
      html = function(options) {
        var _html;
        if (options == null) options = {};
        return _html = "     <!doctype html>\n     <html> \n     <head>\n     <meta name=\"viewport\" content=\"initial-scale = 0.6155\" />\n     <link href='http://fonts.googleapis.com/css?family=Krona+One' rel='stylesheet' type='text/css'>\n     <link rel=\"stylesheet\" type=\"text/css\" href=\"http://fonts.googleapis.com/css?family=Lobster|Source Sans Pro:900|Tangerine|Courgette|Boogaloo|Fugaz One|PT Serif\">\n     <title></title> \n     <style type=\"text/css\"> \n\n     body {margin-top: 0px}\n     div.box {box-sizing: border-box; position: absolute; overflow: hidden;}\n     h1, h2, h3, h4 {margin: 0 0 0 0;}\n     #wrapper {width: 960px; height: 1800px;\n       margin-left: auto ;\n       margin-right: auto ;\n       position: relative;\n     }\n.button {\n display: inline-block;\n background: #0071ea;\n background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0099f1), color-stop(100%,#004be2));\n background: -moz-linear-gradient(center top, #0099f1 0%, #004be2 100%);\n -webkit-box-shadow: 0px 1px 0px 0px #1fa9f4 inset;\n -moz-box-shadow: 0px 1px 0px 0px #1fa9f4 inset;\n box-shadow: 0px 1px 0px 0px #1fa9f4 inset;\n -webkit-border-radius: 4px;\n -moz-border-radius: 4px;\n border-radius: 4px;\n text-shadow: 0px -1px 0px #000000;\n padding: 10px 10px;\n border-color: #126eaf;\n border-width: 1px;\n border-style: solid;\n text-align: center;\n color: #ffffff;\n font-weight: bold;\n\n}\n.button:hover {\n background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#35b6f7), color-stop(100%,#004be2));\n background: -moz-linear-gradient(center top, #35b6f7 0%, #004be2 100%);\n -webkit-box-shadow: 0px 1px 0px 0px #1fa9f4 inset;\n -moz-box-shadow: 0px 1px 0px 0px #1fa9f4 inset;\n box-shadow: 0px 1px 0px 0px #1fa9f4 inset;\n -webkit-transition: background-color .8s ease-in-out;\n -moz-transition: background-color .8s ease-in-out;\n -o-transition: background-color .8s ease-in-out;\n transition: background-color .8s ease-in-out;\n line-height: -1px;\n}\n.button:active {\n background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#004be2), color-stop(100%,#0099f1));\n background: -moz-linear-gradient(center top, #004be2 0%, #0099f1 100%);\n -webkit-box-shadow: 0px 0px 8px #474747 inset;\n -moz-box-shadow: 0px 0px 8px #474747 inset;\n box-shadow: 0px 0px 8px #474747 inset;\n text-shadow: 0px -1px 0px #093fab;\n line-height: -1px;\n}\n\n.button2 {\nbackground: -webkit-linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);\nbackground:    -moz-linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);\nbackground:     -ms-linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);\nbackground:      -o-linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);\nbackground:         linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);\n-webkit-border-radius: 20px;\n   -moz-border-radius: 20px;\n        border-radius: 20px;\npadding: 0px 18px 0px 18px;\ndisplay: inline-block;\nline-height: 40px;\ntext-align: center;\ncolor: rgba(255,255,255,1);\ntext-shadow: 0px -1px 0px rgba(0,0,0,0.75)\n}\n.button2:hover {\nbackground-color: rgba(173,132,132,1);\nbackground: -webkit-linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);\nbackground:    -moz-linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);\nbackground:     -ms-linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);\nbackground:      -o-linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);\nbackground:         linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);\n}\n.button2:active {\n}\n     </style>\n     <body>\n     <div id=\"wrapper\">\n       " + (boxesHtml()) + "\n     </div>\n     <script id=\"code\" type=\"json\">" + (boxesJSON()) + "</script>\n     <script>\n       document.onkeypress = function (e) { \n         // p s\n         if (e.keyCode == 112 || e.keyCode == 115) { \n           window.close() \n         } \n         // e\n         if (e.keyCode == 101) {\n           code = document.getElementById(\"code\").innerHTML\n           // window.open(\"http://sites.drewl.us?code=\" + encodeURIComponent(code)) \n           localStorage.boxes = code\n           window.open(\"http://sites.drewl.us\")\n\n         } \n       }\n     </script>\n     </body>\n     </html>";
      };
      downloadUrl = function() {
        var _html;
        _html = html();
        return "data:text/html;charset=utf-8," + (encodeURIComponent(_html));
      };
      preview = function() {
        return window.open(downloadUrl());
      };
      createBox = function(box) {
        if (selectedBox && !box) {
          box = JSON.parse(boxJSON(selectedBox));
          box.left += 5;
          box.top += 5;
        }
        box = box || {
          left: 0,
          top: 0,
          width: 100,
          height: 100,
          content: "hello world",
          preContent: "",
          postContent: "",
          imageWidth: 100,
          imageTop: 0,
          imageLeft: 0,
          css: {
            fontSize: 16,
            fontFamily: "",
            color: "",
            zIndex: 0
          }
        };
        box.isSelected = function() {
          return _.include(selectedBoxes, box);
        };
        box.isHighlighted = function() {
          return getHighlightedBox() === box;
        };
        box.index = function() {
          return _.indexOf(boxes, box);
        };
        box.toggleSelect = function() {
          if (box.isSelected()) {
            return box.unSelect();
          } else {
            return box.select();
          }
        };
        box.compileContent = function() {
          var el, ret;
          el = box.el;
          delete box.el;
          ret = _.template(box.content)(JSON.parse(JSON.stringify(box)));
          box.el = el;
          return ret;
        };
        box.select = function() {
          _.each(boxes, function(otherBox) {
            if (otherBox === box) return;
            return otherBox.editing = false;
          });
          if (!box.isSelected()) {
            selectedBoxes.push(box);
            return render();
          }
        };
        box.selectOnly = function() {
          _.each(boxes, function(otherBox) {
            if (otherBox === box) return;
            return otherBox.editing = false;
          });
          selectedBoxes = [box];
          return render();
        };
        box.highlight = function() {
          return setHighlightIndex(box.index());
        };
        box.unSelect = function() {
          var index;
          index = _.indexOf(selectedBoxes, box);
          selectedBoxes.splice(index, 1);
          return render();
        };
        box["delete"] = function() {
          var index;
          box.unSelect();
          index = _.indexOf(boxes, box);
          boxes.splice(index, 1);
          return render();
        };
        return box;
      };
      getHighlightedBox = function() {
        return boxes[highlightIndex];
      };
      addBox = function(box) {
        box = createBox(box);
        window.box = box;
        boxes.push(box);
        setHighlightIndex(boxes.length - 1);
        box.selectOnly();
        render();
        return box;
      };
      boxesHtml = function() {
        var _html;
        _html = "";
        each(boxes, function(box) {
          return _html += "\n<div class=\"box\" style=\"\n  font-size: " + box.css.fontSize + "px;\n  color: " + box.css.color + ";\n  background: " + box.css.background + ";\n  font-family: " + box.css.fontFamily + ";\n  box-shadow: " + box.css.boxShadow + ";\n  opacity: " + box.css.opacity + ";\n  line-height: " + box.css.lineHeight + ";\n  letter-spacing: " + box.css.letterSpacing + ";\n  margin: " + box.css.margin + ";\n  padding: " + box.css.padding + ";\n  font-weight: " + box.css.fontWeight + ";\n  font-style: " + box.css.fontStyle + ";\n  width: " + box.css.width + "px;\n  height: " + box.css.height + "px;\n  text-align: " + box.css.textAlign + ";\n  z-index: " + box.css.zIndex + ";\n  text-shadow: " + box.css.textShadow + ";\n  border: " + box.css.border + ";\n  border-radius: " + box.css.borderRadius + "px;\n  top: " + box.top + "px;\n  left: " + box.left + "px;\n \n\">\n  " + box.preContent + (box.compileContent()) + box.postContent + "\n</div>";
        });
        return _html;
      };
      setDownloadLink = function() {
        return $("#download").attr("href", downloadUrl());
      };
      download = function() {
        return $("#download").click();
      };
      preventRendering = 0;
      preventRender = function() {
        return preventRendering += 1;
      };
      unPreventRender = function() {
        return preventRendering -= 1;
      };
      render = function() {
        var wrapper;
        if (preventRendering !== 0) return;
        setDownloadLink();
        wrapper = $("#wrapper");
        wrapper.find(".box").remove();
        return each(boxes, function(box, boxIndex) {
          var newBox, startLeft, startTop, textarea, textareaHeight, textareaWidth;
          newBox = $(document.createElement('div'));
          newBox.addClass("box");
          newBox.css({
            width: box.css.width + "px",
            height: box.css.height + "px",
            top: box.top + "px",
            left: box.left + "px",
            position: "absolute",
            fontSize: box.css.fontSize + "px",
            borderRadius: box.css.borderRadius + "px",
            opacity: box.css.opacity,
            lineHeight: box.css.lineHeight,
            letterSpacing: box.css.letterSpacing,
            margin: box.css.margin,
            padding: box.css.padding,
            fontWeight: box.css.fontWeight,
            fontStyle: box.css.fontStyle,
            textAlign: box.css.textAlign,
            zIndex: box.css.zIndex,
            textShadow: box.css.textShadow,
            border: box.css.border,
            background: box.css.background,
            fontFamily: box.css.fontFamily,
            color: box.css.color,
            boxShadow: box.css.boxShadow
          });
          if (box.editing) {
            textarea = $("<textarea></textarea>");
            textarea.val(box.content);
            textarea.mousedown(function(e) {
              return e.stopPropagation();
            });
            textarea.mouseup(function(e) {
              return e.stopPropagation();
            });
            textarea.click(function(e) {
              return e.stopPropagation();
            });
            textarea.keydown(function(e) {
              if (e.keyCode === 27) return escape();
            });
            textareaWidth = box.css.width > 200 ? box.css.width : 200;
            textareaHeight = box.css.height > 200 ? box.css.height : 200;
            textarea.css({
              width: textareaWidth + "px",
              height: textareaHeight + "px",
              position: "absolute",
              top: 0,
              left: 0,
              padding: 0,
              border: "none",
              margin: 0
            });
            newBox.append(textarea);
          } else {
            newBox.html("" + box.preContent + (box.compileContent()) + box.postContent);
            newBox.find(".image, img").draggable({
              start: function() {
                return preventRender();
              },
              stop: function() {
                unPreventRender();
                box.imageTop = $(this).position().top;
                return box.imageLeft = $(this).position().left;
              }
            });
          }
          if (box.isSelected()) newBox.css("border", "1px solid red");
          box.el = newBox;
          wrapper.append(newBox);
          _.defer(function() {
            if (textarea != null) textarea[0].focus();
            if (box.editSelection) {
              return textarea != null ? textarea[0].setSelectionRange(box.editSelection[0], box.editSelection[1]) : void 0;
            } else {
              return textarea != null ? textarea[0].select() : void 0;
            }
          });
          startLeft = box.left;
          startTop = box.top;
          newBox.mousedown(function(e) {
            box.hasMoved = false;
            return true;
          });
          newBox.mouseup(function(e) {
            console.log("up");
            preventRender();
            if (box.hasMoved === false) {
              if (e.shiftKey) {
                box.toggleSelect();
                box.highlight();
              } else {
                box.selectOnly();
                box.highlight();
              }
            }
            unPreventRender();
            if (box.hasMoved === false) render();
            box.hasMoved = false;
            return true;
            return true;
          });
          newBox.draggable({
            containment: "parent",
            snap: true,
            drag: function(e, ui) {
              var that;
              that = this;
              box.hasMoved = true;
              if (box.isSelected()) {
                return _.each(selectedBoxes, function(selectedBox) {
                  if (selectedBox === box) return;
                  return $(selectedBox.el).css({
                    top: selectedBox.top + $(that).position().top - startTop,
                    left: selectedBox.left + $(that).position().left - startLeft
                  });
                });
              }
            },
            stop: function(e, ui) {
              box.top = $(this).position().top;
              box.left = $(this).position().left;
              if (box.isSelected()) {
                _.each(selectedBoxes, function(selectedBox) {
                  if (selectedBox === box) return;
                  selectedBox.top = selectedBox.top + box.top - startTop;
                  return selectedBox.left = selectedBox.left + box.left - startLeft;
                });
              } else {
                box.selectOnly();
                box.highlight();
              }
              return render();
            }
          });
          return newBox.resizable({
            maxWidth: 960,
            start: function() {
              return preventRender();
            },
            stop: function() {
              unPreventRender();
              box.css.width = $(this).width();
              box.css.height = $(this).height();
              return render();
            }
          });
        });
      };
      init();
      siteMaker.render = render;
      return siteMaker;
    }
  };

  $(window).load(function() {
    return window.s = window.siteMaker = SiteMaker.create();
  });

}).call(this);
