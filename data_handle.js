var superagent = require('superagent')
require('superagent-proxy')(superagent)
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var ep = eventproxy()

var fs = require('fs')
var path = require("path");

var pageNum = 1
var pageUrls = []
for (var i = 1; i <= pageNum; i++) {
  pageUrls.push('http://www.jq22.com/jq' + i + '-jq')
}

function dataUrls($, num, filePath) {
  let showUrl = [];
  for (let i = 1; i < num; i++) {
    let urlArray = 'http://www.jq22.com/' +
      $('.cover-info').eq(i).find('a').attr('href');
    showUrl.push(urlArray);
    fs.writeFile(__dirname + filePath, JSON.stringify(showUrl));
  }
};

function mkdirs(dirname, callback) {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback();
    } else {
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
      });
    }
  });
}

pageUrls.forEach(function (pageUrl) {
  superagent.get(pageUrl)
    .proxy('http://112.114.93.125:8118')
    .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    .end((err, ares) => {
      if (err) {
        console.log('轮询链接列表出错')
      }

      var $ = cheerio.load(ares.text)
      dataUrls($, 16, '/test/showUrl.json')
    })
})
