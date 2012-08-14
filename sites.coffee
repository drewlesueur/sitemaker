_.templateSettings =
    interpolate : /\{\{(.+?)\}\}/g

each = _.each
# cache should only be writable by one spot?
# data just sits there till you render?
#   or getters and setters?
# url, one way in

toggler = (list...) ->
  togglerIndex = 0
  ->
    ret = list[togglerIndex]
    togglerIndex += 1
    if togglerIndex == list.length
      togglerIndex = 0
    ret

window.SiteMaker =
  create: ->
    siteMaker = {}


    getNextFont =  toggler("Helvetica", "Lobster", "Source Sans Pro", "Tangerine", "Courgette", "Boogaloo", "Fugaz One",
    "PT Serif", "Krona One")


    _.extend siteMaker, Backbone.events 
    boxes =   []
    siteMaker.boxes = boxes
    selectedBoxes = []
    selectedBox = null # highlit box


    highlightIndex = 0
    siteMaker.getHighlightIndex = -> highlightIndex
    setHighlightIndex = (index) ->
      highlightIndex = index
      if (highlightIndex > boxes.length - 1)
        highlightIndex =  0
      selectedBox = getHighlightedBox()
      render()
    
    selectBox = ->
      box = getHighlightedBox()
      box.toggleSelect()

    
    deleteBox = ->
      if selectedBoxes.length
        _.each selectedBoxes, (selectedBox) ->
          selectedBox.delete()
      else
        getHighlightedBox().delete()

    insert = ->
      getHighlightedBox().editing = true
      render()
    
    escape = ->
      if selectedBox.editing is true
        newContent = selectedBox.el.find('textarea').val()
        selectedBox.content = newContent
        selectedBox.editing = false
      else
        selectedBox.editing = true
      render()

    h1 = ->
      _.each selectedBoxes, (box) ->
        box.preContent = "<h1>"
        box.postContent = "</h1>"
      render()

    h2 = ->
      _.each selectedBoxes, (box) ->
        box.preContent = "<h2>"
        box.postContent = "</h2>"
      render()

    h3 = ->
      _.each selectedBoxes, (box) ->
        box.preContent = "<h3>"
        box.postContent = "</h3>"
      render()

    h4 = ->
      _.each selectedBoxes, (box) ->
        box.preContent = ""
        box.postContent = ""
      render()

    link = ->
      selectedBox.content = """
        <a href="#">#{selectedBox.content}</a>
      """
      selectedBox.editSelection = [9,10]
      render()

    button = ->
      selectedBox.content = """
      <div class='button'>#{selectedBox.content}</div>"""
      render() 

    image = ->
      img = getNextPic()
      selectedBox.content = """
        <img src="#{img}" style="
          width:{{imageWidth}}%;
          top:{{imageTop}}px;
          left:{{imageLeft}}px;
          position:absolute;
        "/>
      """
      selectedBox.editSelection = [10,10 + img.length]
      render()

    increaseFontAndImage = ->
      _.each selectedBoxes, (box) ->
        box.css.fontSize += 1
        box.imageWidth += 10
      render()

    decreaseFontAndImage = ->
      _.each selectedBoxes, (box) ->
        box.css.fontSize -= 1
        box.imageWidth -= 10
      render()

    defaultFont = ->
      _.each selectedBoxes, (box) ->
        box.css.fontSize = 16
      render()

    background = ->
      code = prompt "background?"
      selectedBox.css.background = code
      render()
      

    getNextBorderRadius = toggler("5", "10", "15", "20", "0")
    siteMaker.getNextBorderRadius = getNextBorderRadius
            
    borderRadius = ->
      selectedBox.css.borderRadius = getNextBorderRadius()
      render()
      
    opacity = ->
      code = prompt "Opacity?"
      selectedBox.css.opacity = code
      render()
      
    getNextLineHeight = toggler("60%", "70%", "80%", "90%", "100%", "110%", "120%", "130%", "140%")
    siteMaker.getNextLineHeight = getNextLineHeight

    lineHeight = ->
      selectedBox.css.lineHeight = getNextLineHeight()
      render()

    getNextLetterSpacing = toggler("", "-.02em", "-.04em", "-.06em", "-.08em", ".1em", ".12em", ".14em", ".16em", )
    siteMaker.getNextLetterSpacing = getNextLetterSpacing
      
    letterSpacing = ->
      selectedBox.css.letterSpacing = getNextLetterSpacing()
      render()
      

    margin = ->
      code = prompt "Margin?"
      selectedBox.css.margin = code
      render()
 
    padding = ->
      code = prompt "Padding?"
      selectedBox.css.padding = code
      render()
    
      
    width = ->
      code = prompt "Width?"
      selectedBox.css.width = code
      render()
      
    height = ->
      code = prompt "Height?"
      selectedBox.css.height = code
      render()
  
    getNextBoxShadow = toggler("0 0 10px gray", "0 0 10px black", "0 0 20px gray", "0 0 20px black", "inset 0 0 10px black", "inset 0 0 10px gray", "")
    siteMaker.getNextBoxShadow = getNextBoxShadow
    
    boxShadow = ->
      selectedBox.css.boxShadow = getNextBoxShadow()
      render()
      
      
    getNextFontWeight = toggler("bold", "normal")
    siteMaker.getNextFontWeight = getNextFontWeight
    
    fontWeight = ->
      selectedBox.css.fontWeight = getNextFontWeight()
      render()
      
    getNextFontStyle = toggler("italic", "normal")
    siteMaker.getNextFontStyle = getNextFontStyle
    
    fontStyle = ->
      selectedBox.css.fontStyle = getNextFontStyle()
      render()

    getNextTextAlign = toggler("center", "right", "left")
    siteMaker.getNextTextAlign = getNextTextAlign
      
    textAlign = ->
      selectedBox.css.textAlign = getNextTextAlign()
      render()
      

    zIndex = ->
      code = prompt "?z-index?"
      selectedBox.css.zIndex = code
      render()


    getNextMoveTo = toggler ->
      maxZ = _.max( _.map(boxes,((b)->b.css.zIndex or 0)))    
      _.each selectedBoxes, (box) ->
        box.css.zIndex = maxZ + 1
      render()
    , ->
      minZ = _.min( _.map(boxes,((b)->b.css.zIndex or 0)))    
      _.each boxes, (box) ->
        box.css.zIndex += 1

      _.each selectedBoxes, (box) ->
        box.css.zIndex = minZ
      
      render()


    moveTo = -> getNextMoveTo()()


    getNextTextShadow = toggler("0 1px white", "0 -1px black", "")
    siteMaker.getNextTextShadow = getNextTextShadow


    textShadow = ->
      selectedBox.css.textShadow = getNextTextShadow()
      render()
      

    border = ->
      code = prompt "Border?"
      selectedBox.css.border = code
      render()

    color = ->
      code = prompt "font color?"
      selectedBox.css.color = code
      render()

    font = ->
      fontName = prompt "font?"
      selectedBox.css.fontFamily = fontName
      render()
      
    toggleFont = -> 
      fontName = getNextFont()
      selectedBox.css.fontFamily = fontName
      render()
      
    changeImages = ->
      getPics(prompt("what type of pics? eg. kitten"))

    name = ""
    save = ->
      data = 
        name: name || (name = prompt("name?"))
        code: html()
      $.ajax
        type: "POST" 
        url: "http://drewl.us:8500/save"
        data: data
        success: -> # window.open "http://sites.drewl.us/#{name}"
        error: -> alert 'error saving'
      console.log "test"
      # window.open "http://sites.drewl.us/#{name}"
      window.open "http://#{name}.sites.drewl.us"
    siteMaker.save = save


    clearAll = ->
      boxes = []
      selectedBox = null
      selectedBoxes = []
      delete localStorage.boxes
      render()

    load = (exp) ->
      _boxes = JSON.parse exp
      _.each boxes, (box) ->
        box.delete()
      _.each _boxes, (box) ->
        addBox box
      render()
      
    siteMaker.load = load

    leftAlign = ->
      console.log "left align"
      minLeft = _.min _.map selectedBoxes, (box) -> box.left
      console.log minLeft
      _.each selectedBoxes, (box) -> box.left = minLeft
      render()
      
    topAlign = ->
      console.log "top align"
      minTop = _.min _.map selectedBoxes, (box) -> box.top
      console.log minTop
      _.each selectedBoxes, (box) -> box.top = minTop
      render()


    setupKeyBindings = ->
      bindings = [
        "left", leftAlign
        "up", topAlign
        "shift+s", save
        "i", image
        "shift+i", changeImages
        "l", link
        "f", font
        "shift+f", toggleFont
        "=", increaseFontAndImage
        "-", decreaseFontAndImage
        "0", defaultFont
        "1", h1
        "2", h2 
        "3", h3 
        "4", h4 
        "a", => addBox()
        "p", preview
        "e", insert
        "tab", highlightNextBox
        "enter", selectBox
        "d", deleteBox
        "esc", escape
        "shift+c", background
        "c", color
        "s", boxShadow
        "r", borderRadius
        "o", opacity
        "+", lineHeight
        "_", letterSpacing
        "m", margin
        "shift+m", padding
        "t", textAlign
        "z", moveTo
        "x", textShadow
        "shift+x", clearAll
        "b", border
        "shift+b", button
        "w", width
        "h", height
        "q", fontWeight
        "shift+q", fontStyle
        "ctrl+shift+s", saveLocalStorage
                
      ]
      for key, i in bindings by 2
        func = bindings[i + 1]
        Mousetrap.bind key, func

    setupIframeBinding = ->
      $(".iframe-url").keyup (e) ->
        val = $(this).val()
        val = val.replace("http://", "")
        $('iframe').attr "src", "http://" + $(this).val()

    getPics = (tag="kitten")->
      $.get "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3800913a1c5ace11cf355e763b130b2d&tags=#{tag}&format=json&jsoncallback=siteMaker.gotPics"
    siteMaker.getPics = getPics 
    
    randomPics = []
    randomPicIndex = 0
    getNextPic = ->
      randomPicIndex += 1
      if randomPicIndex > randomPics.length - 1
        randomPicIndex = 0
      pic = randomPics[randomPicIndex]
      return """
        http://farm#{pic.farm}.staticflickr.com/#{pic.server}/#{pic.id}_#{pic.secret}.jpg
      """
    gotPics = (pics) ->
      randomPics = pics.photos.photo
      randomPicIndex = 0
      console.log randomPics

    siteMaker.getRandomPics = -> randomPics
    siteMaker.gotPics = gotPics

    saveLocalStorage = ->
      console.log "saving"
      localStorage.boxes = boxesJSON()

    init = () ->
      setupKeyBindings()
      setupIframeBinding()
      getPics()
      if localStorage.boxes
        load(localStorage.boxes)

    
    highlightNextBox = (e) ->
      e.preventDefault()
      setHighlightIndex highlightIndex + 1

    boxJSON = (box) ->
      el = box.el
      delete box.el
      ret = JSON.stringify box
      box.el = el
      ret

    boxesJSON = () ->
      els = [] 
      _.each boxes, (box) ->
        els.push box.el
        delete box.el
      ret = JSON.stringify boxes
      _.each boxes, (box) ->
        box.el = els.shift()
      ret

    html = (options={}) ->
      
      _html = """
        <!doctype html>
        <html> 
        <head>
        <meta name="viewport" content="initial-scale = 0.6155" />
        <link href='http://fonts.googleapis.com/css?family=Krona+One' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Lobster|Source Sans Pro:900|Tangerine|Courgette|Boogaloo|Fugaz One|PT Serif">
        <title></title> 
        <style type="text/css"> 

        body {margin-top: 0px}
        div.box {box-sizing: border-box; position: absolute; overflow: hidden;}
        h1, h2, h3, h4 {margin: 0 0 0 0;}
        #wrapper {width: 960px; height: 1800px;
          margin-left: auto ;
          margin-right: auto ;
          position: relative;
        }
.button {
    display: inline-block;
    background: #0071ea;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0099f1), color-stop(100%,#004be2));
    background: -moz-linear-gradient(center top, #0099f1 0%, #004be2 100%);
    -webkit-box-shadow: 0px 1px 0px 0px #1fa9f4 inset;
    -moz-box-shadow: 0px 1px 0px 0px #1fa9f4 inset;
    box-shadow: 0px 1px 0px 0px #1fa9f4 inset;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-shadow: 0px -1px 0px #000000;
    padding: 10px 10px;
    border-color: #126eaf;
    border-width: 1px;
    border-style: solid;
    text-align: center;
    color: #ffffff;
    font-weight: bold;

}
.button:hover {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#35b6f7), color-stop(100%,#004be2));
    background: -moz-linear-gradient(center top, #35b6f7 0%, #004be2 100%);
    -webkit-box-shadow: 0px 1px 0px 0px #1fa9f4 inset;
    -moz-box-shadow: 0px 1px 0px 0px #1fa9f4 inset;
    box-shadow: 0px 1px 0px 0px #1fa9f4 inset;
    -webkit-transition: background-color .8s ease-in-out;
    -moz-transition: background-color .8s ease-in-out;
    -o-transition: background-color .8s ease-in-out;
    transition: background-color .8s ease-in-out;
    line-height: -1px;
}
.button:active {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#004be2), color-stop(100%,#0099f1));
    background: -moz-linear-gradient(center top, #004be2 0%, #0099f1 100%);
    -webkit-box-shadow: 0px 0px 8px #474747 inset;
    -moz-box-shadow: 0px 0px 8px #474747 inset;
    box-shadow: 0px 0px 8px #474747 inset;
    text-shadow: 0px -1px 0px #093fab;
    line-height: -1px;
}

.button2 {
   background: -webkit-linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);
   background:    -moz-linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);
   background:     -ms-linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);
   background:      -o-linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);
   background:         linear-gradient(top, rgba(110,140,12,1) 0%,rgba(67,97,21,1) 100%);
   -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
           border-radius: 20px;
   padding: 0px 18px 0px 18px;
   display: inline-block;
   line-height: 40px;
   text-align: center;
   color: rgba(255,255,255,1);
   text-shadow: 0px -1px 0px rgba(0,0,0,0.75)
}
.button2:hover {
   background-color: rgba(173,132,132,1);
   background: -webkit-linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);
   background:    -moz-linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);
   background:     -ms-linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);
   background:      -o-linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);
   background:         linear-gradient(top, rgba(136,167,35,1) 0%,rgba(76,112,23,1) 100%);
}
.button2:active {
}
        </style>
        <body>
        <div id="wrapper">
          #{boxesHtml()}
        </div>
        <script id="code" type="json">#{boxesJSON()}</script>
        <script>
          document.onkeypress = function (e) { 
            // p s
            if (e.keyCode == 112 || e.keyCode == 115) { 
              window.close() 
            } 
            // e
            if (e.keyCode == 101) {
              code = document.getElementById("code").innerHTML
              // window.open("http://sites.drewl.us?code=" + encodeURIComponent(code)) 
              localStorage.boxes = code
              window.open("http://sites.drewl.us")

            } 
          }
        </script>
        </body>
        </html>
      """
    downloadUrl = ->
      _html = html()
      "data:text/html;charset=utf-8,#{encodeURIComponent _html}"

    preview = ->
      window.open downloadUrl()
     
     
    createBox = (box) ->
      if selectedBox and !box
        box = JSON.parse boxJSON selectedBox
        box.left += 5
        box.top += 5
      box = box or {
        left: 0
        top: 0
        width: 100
        height: 100
        content: "hello world"
        preContent: ""
        postContent: ""
        imageWidth: 100
        imageTop: 0
        imageLeft: 0
        css:
          fontSize: 16
          fontFamily: ""
          color: ""
          zIndex: 0
      } 
      box.isSelected = ->
        _.include selectedBoxes, box 

      box.isHighlighted = ->
        getHighlightedBox() == box

      box.index = ->
        _.indexOf boxes, box 

      box.toggleSelect = ->
        if box.isSelected()
          box.unSelect()
        else
          box.select()

      box.compileContent = ->
        el = box.el
        delete box.el
        ret = _.template(box.content) JSON.parse JSON.stringify box
        box.el = el
        ret


      box.select = ->
        _.each boxes, (otherBox) ->
          return if otherBox is box 
          otherBox.editing = false
        if !box.isSelected()
          selectedBoxes.push box
          render()


      box.selectOnly = ->
        #TODO: only handle the loop when setting selected boxes
        _.each boxes, (otherBox) ->
          return if otherBox is box 
          otherBox.editing = false
        selectedBoxes = [box]
        render()


      box.highlight = ->
        setHighlightIndex box.index()

      box.unSelect = ->
        index = _.indexOf selectedBoxes, box
        selectedBoxes.splice index, 1 
        render()

      box.delete = ->
        box.unSelect()

        index = _.indexOf boxes, box
        boxes.splice index, 1 
        render()

      box
    
    getHighlightedBox = ->
      boxes[highlightIndex]

    addBox = (box) ->
      box = createBox box
      window.box = box
      boxes.push box
      setHighlightIndex boxes.length - 1
      box.selectOnly()
      render()
      box
    
    boxesHtml = ->
      _html = ""
      each boxes, (box) -> _html += """

        <div class="box" style="
          font-size: #{box.css.fontSize}px;
          color: #{box.css.color};
          background: #{box.css.background};
          font-family: #{box.css.fontFamily};
          box-shadow: #{box.css.boxShadow};
          opacity: #{box.css.opacity};
          line-height: #{box.css.lineHeight};
          letter-spacing: #{box.css.letterSpacing};
          margin: #{box.css.margin};
          padding: #{box.css.padding};
          font-weight: #{box.css.fontWeight};
          font-style: #{box.css.fontStyle};
          width: #{box.css.width}px;
          height: #{box.css.height}px;
          text-align: #{box.css.textAlign};
          z-index: #{box.css.zIndex};
          text-shadow: #{box.css.textShadow};
          border: #{box.css.border};
          border-radius: #{box.css.borderRadius}px;
          top: #{box.top}px;
          left: #{box.left}px;
         
        ">
          #{box.preContent}#{box.compileContent()}#{box.postContent}
        </div>
      """
      _html
    
    setDownloadLink = ->
      $("#download").attr "href", downloadUrl()

    download = ->
      $("#download").click()
   
    preventRendering = 0
    preventRender = -> preventRendering += 1
    unPreventRender = -> preventRendering -= 1


    render = ->
      return if preventRendering != 0
      setDownloadLink() 
      wrapper = $ "#wrapper"
      wrapper.find(".box").remove()
      each boxes, (box, boxIndex) ->
        newBox = $ document.createElement('div')
        newBox.addClass "box"
        newBox.css
          width: box.css.width + "px"
          height: box.css.height + "px"
          top: box.top + "px"
          left: box.left + "px"
          position: "absolute"
          fontSize: box.css.fontSize + "px"
          borderRadius: box.css.borderRadius + "px"
          opacity: box.css.opacity
          lineHeight: box.css.lineHeight
          letterSpacing: box.css.letterSpacing
          margin: box.css.margin
          padding: box.css.padding
          fontWeight: box.css.fontWeight
          fontStyle: box.css.fontStyle
          textAlign: box.css.textAlign
          zIndex: box.css.zIndex
          textShadow: box.css.textShadow
          border: box.css.border
          background: box.css.background
          fontFamily: box.css.fontFamily
          color: box.css.color
          boxShadow: box.css.boxShadow
          

        #if box.isHighlighted()
        #  newBox.css "opacity", ".8"

        if box.editing
          textarea = $ "<textarea></textarea>"
          textarea.val box.content
          textarea.mousedown (e) -> e.stopPropagation()
          textarea.mouseup (e) -> e.stopPropagation()
          textarea.click (e) -> e.stopPropagation()
          textarea.keydown (e) -> if e.keyCode == 27 then escape()

          textareaWidth = if box.css.width > 200 then box.css.width else 200
          textareaHeight = if box.css.height > 200 then box.css.height else 200
          textarea.css
            width: textareaWidth + "px"
            height: textareaHeight + "px"
            position: "absolute"
            top: 0
            left: 0
            padding: 0
            border: "none"
            margin: 0
          newBox.append textarea
          
        else
          newBox.html """
            #{box.preContent}#{box.compileContent()}#{box.postContent}
          """

          newBox.find(".image, img").draggable
            start: -> preventRender()
            stop: ->
              unPreventRender()
              box.imageTop = $(this).position().top
              box.imageLeft = $(this).position().left

        if box.isSelected()
          newBox.css "border", "1px solid red"

        box.el = newBox
        wrapper.append newBox
        _.defer ->
          textarea?[0].focus()

          if box.editSelection
            textarea?[0].setSelectionRange box.editSelection[0], box.editSelection[1]
          else
            textarea?[0].select()

        startLeft = box.left
        startTop = box.top
        


        newBox.mousedown (e) ->
          
          box.hasMoved = false 
          return true

        newBox.mouseup (e) ->
          console.log "up"

          preventRender()
          if box.hasMoved == false
            if e.shiftKey
              box.toggleSelect()
              box.highlight()
            else
              box.selectOnly()
              box.highlight()
          unPreventRender()

          if box.hasMoved == false then render()
          box.hasMoved = false
          return true
          true
          

        newBox.draggable
          containment: "parent"
          snap: true
          drag: (e, ui) ->
            that = this
            box.hasMoved = true
            if box.isSelected() then _.each selectedBoxes, (selectedBox) ->
              if selectedBox == box then return
              $(selectedBox.el).css
                top: selectedBox.top + $(that).position().top - startTop
                left: selectedBox.left + $(that).position().left - startLeft
            
          stop: (e, ui) ->
            box.top = $(this).position().top
            box.left = $(this).position().left

            if box.isSelected() then _.each selectedBoxes, (selectedBox) ->
              if selectedBox == box then return
              selectedBox.top = selectedBox.top + box.top - startTop
              selectedBox.left = selectedBox.left + box.left - startLeft
            else
              box.selectOnly()
              box.highlight()

            render()

        newBox.resizable
          maxWidth: 960
          start: -> preventRender()
          stop: () ->
            unPreventRender()
            box.css.width = $(this).width()
            box.css.height = $(this).height()
            render()

    init()
    siteMaker.render = render
    siteMaker


$(window).load -> window.s = window.siteMaker = SiteMaker.create() 

