var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var fs = require('fs')
require('superagent-proxy')(superagent)

var showUrl = require('./data/showUrl.json')
var demoList = require('./data/demoList.json')
var dataList = require('./data/dataList.json')

var tests = []
var jsq = 0
var num = 2263
var proxy = 'http://218.201.98.196:3128'

var getData = function (url, callback) {
  superagent.get(url)
    .proxy(proxy)
    .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
    .end((err, bres) => {
      if (err) {
        console.log('获取单页出错')
      }

      let $ = cheerio.load(bres.text)

      jsq++
      var delay = parseInt(Math.random() * 30000000 % 1000, 10)
      console.log('已抓取' + num + '个，当前并发数：' + jsq + '，正在爬取：' + url + '，耗时：' + delay)
      num++

      let pageurl = $('.thumbile').find('.btn-success').attr('href')
      let id = $('.thumbile').find('.btn-success').attr('href').match(/\d{5}|\d{4}/g).toString()
      let title = $('.project-header h1').text()
      let summary = $('.cjms').text()
      let image = $('.thumbile').first().attr('src')
      let type = $('.project-header>p').text()
      let ie = $('.project-content img').eq(1).attr('alt')
      let all = $('.project-content img').eq(1).attr('src')

      superagent.get(pageurl)
        .proxy(proxy)
        .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
        .end((err, cres) => {
          let $ = cheerio.load(cres.text)
          let demo = $('#iframe').attr('src')
          let time = $('#iframe').attr('src').match(/\d{12}|\d{9}|\d{8}/g).toString()

          let detail = {
            id: id,
            title: title,
            summary: summary,
            type: type,
            url: url,
            demo: demo,
            image: image,
            compatible: {
              ie: ie,
              all: all
            },
            time: time
          }

          demoList.push(demo)
          fs.writeFile('./data/demoList.json', JSON.stringify(demoList))
          dataList.push(detail)
          fs.writeFile('./data/dataList.json', JSON.stringify(dataList))
        })
      setTimeout(function () {
        jsq--
        callback(null, url + 'Callback content')
      }, delay)
    })
}

async.mapLimit(showUrl, 1, function (url, callback) {
  getData(url, callback)
}, function (err, result) {
  console.log(err)
})


