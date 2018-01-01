var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var fs = require('fs')
var ep = eventproxy()
require('superagent-proxy')(superagent)

var showUrl = require('./data/showUrl.json')

var pageNum = 160
var pageUrls = []

for (var i = 1; i <= pageNum; i++) {
  pageUrls.push('http://www.jq22.com/jq' + i + '-jq')
}

pageUrls.forEach(function (pageUrl) {
  superagent.get(pageUrl)
    .proxy('http://111.56.5.42:80')
    .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    .end((err, ares) => {
      if (err) {
        console.log('轮询链接列表出错')
      }

      var $ = cheerio.load(ares.text)
      for (var i = 1; i < 16; i++) {
        var urlArray = 'http://www.jq22.com/' + $('.cover-info').eq(i).find('a').attr('href')

        showUrl.push(urlArray)
        fs.writeFile('./data/showUrl.json', JSON.stringify(showUrl))
      }
    })
})