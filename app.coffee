express = require "express"

app = express()

async = require("async")


callbacker = (func) ->
  (args...) ->
    (callback) ->
      func args..., (err) ->
        callback err

exec = callbacker require('child_process').exec
write = callbacker require("fs").writeFile

save = (req, res) ->
  console.log req.body
  async.series [
    exec("mkdir -p ../#{req.body.name}.sites.drewl.us")
    write("../#{req.body.name}.sites.drewl.us/index.html", req.body.code)
  ], (err) ->
    console.log err
    res.send "ok"


enableCORS = (req, res, next) ->
  res.setHeader "Access-Control-Allow-Origin", "*"
  res.setHeader "Access-Control-Allow-Headers", "Content-Type, X-Requested-With"
  next()

app.configure () ->
  app.use enableCORS
  app.use express.bodyParser()
  
app.post "/save", save
app.get "/save", save
app.listen 8500 
