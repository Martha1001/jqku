var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var eventproxy = require('eventproxy')
var fs = require('fs')
var ep = eventproxy()
require('superagent-proxy')(superagent)

// var demoList = require('./static/demoList.json')
var writeDatas = require('./data/writeData.json')
var testUrls = require('./data/test.json')

var proxy = 'http://120.236.142.103:8888'
var pathArr = []

superagent.get('http://www.jq22.com/demo/jQueryHoverFx201709120935/img/css.css')
  .proxy(proxy)
  .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
  .buffer(true)
  .end(function (err, ares) {
    if (err) {
      console.log('err')
    }
    var $ = cheerio.load(ares.text)
    // console.log($.text())

    let bgUrl = $.text()
    pathArr.push(bgUrl.substring(bgUrl.indexOf('url(../') + 7, bgUrl.indexOf(')')))
    console.log(pathArr)

    pathArr.forEach(function (path) {
      superagent.get('http://www.jq22.com/demo/jQueryHoverFx201709120935/' + path)
        .proxy(proxy)
        .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
        .buffer(true)
        .end(function (err, bres) {
          if (err) {
            console.log('err')
          }
          fs.writeFile(__dirname + '/static/',
            bres.body,
            function (err) {
              if (err) {
                console.log(err)
              }
            })


        })
    })

  })

