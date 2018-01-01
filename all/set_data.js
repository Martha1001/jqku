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

var proxy = 'http://118.114.77.47:8080'
var pathArr = []
var cssBgArr = []
// var writeArr = []
var jsq = 0
var num = 0
var jsqN = 0
var numN = 0

var setData = function (info, huidiao) {
  superagent.get(info.url)
    .proxy(proxy)
    .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
    .buffer(true)
    .end((err, ares) => {
      if (err) {
        console.log('获取demo页失败!')
      }
      var $ = cheerio.load(ares.text,{decodeEntities:false})
      $('title').text(info.name.toString())

      jsq++
      num++
      let delay = parseInt(Math.random() * 30000000 % 1000, 10)
      console.log('Demo：' + num + '，并发：' + jsq + '，正爬取：' + info.url + '，耗时：' + delay)

      fs.mkdir(__dirname + '/static/' + info.name, function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.writeFile(__dirname + '/static/' + info.name + '/index.html',
        $.html(),
        function (err) {
          if (err) {
            console.log('生成html文件失败!')
          }
        })

      let cssUrls = $('link')
      for (var i = 0; i < cssUrls.length; i++) {
        let cssUrl = cssUrls.eq(i).attr('href')
        if (cssUrl !== undefined && cssUrl.indexOf('http') < 0 && cssUrl.indexOf('css') >= 0) {
          pathArr.push(cssUrl)
        }
      }
      let jsUrls = $('script')
      for (var i = 0; i < jsUrls.length; i++) {
        let jsUrl = jsUrls.eq(i).attr('src')
        if (jsUrl !== undefined && jsUrl.indexOf('http') < 0) {
          pathArr.push(jsUrl)
        }
      }
      let imgUrls = $('img')
      for (var i = 0; i < imgUrls.length; i++) {
        let imgUrl = imgUrls.eq(i).attr('src')
        if (imgUrl !== undefined && imgUrl.indexOf('http') < 0) {
          pathArr.push(imgUrl)
        }
      }
      let bgUrls = $('*')
      for (var i = 0; i < bgUrls.length; i++) {
        let bgUrl = bgUrls.eq(i).css('background')
        if (bgUrl !== undefined && bgUrl.indexOf('http') < 0) {
          pathArr.push(bgUrl.substring(bgUrl.indexOf('(') + 1, bgUrl.indexOf(')')))
        }
      }
      let styUrls = $('style')
      for (var i = 0; i < styUrls.length; i++) {
        let styUrl = styUrls.html().toString()
        if (styUrl !== undefined) {
          var styArr = styUrl.match(/url\('(\S*)'\)|url\("(\S*)"\)/g)
          styArr.forEach(function (sty) {
            pathArr.push(sty.substring(sty.indexOf('(') + 2, sty.indexOf(')') - 1))
          });
        }
      }

      var setFile = function (path, callback) {
        console.log(path)
        let idx = path.lastIndexOf('/')
        let pathC = path.slice(0, idx)
        superagent.get(info.url + '/' + path)
          .proxy(proxy)
          .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
          .buffer(true)
          .end(function (err, bres) {
            if (err) {
              console.log('抓取资源失败!')
            }

            jsqN++
            numN++
            let delayN = parseInt(Math.random() * 30000000 % 1000, 10)
            console.log('File：' + numN + '，并发：' + jsqN + '，正爬取：' + path + '，耗时：' + delayN)

            if (path.indexOf('css') >= 0 || path.indexOf('js') >= 0) {
              if (path.indexOf('/') >= 0) {
                fs.mkdir(__dirname + '/static/' + info.name + '/' + pathC, function (err) {
                  if (err) {
                    console.log(err)
                  }
                })
              }
              fs.writeFile(__dirname + '/static/' + info.name + '/' + path,
                bres.text,
                function (err) {
                  if (err) {
                    console.log(err)
                  }
                })

                let $ = cheerio.load(bres.text)
                let cssBgUrl = $.text()



            } else {
              if (path.indexOf('/') >= 0) {
                fs.mkdir(__dirname + '/static/' + info.name + '/' + pathC, function (err) {
                  if (err) {
                    console.log(err)
                  }
                })
              }
              fs.writeFile(__dirname + '/static/' + info.name + '/' + path,
                bres.body,
                function (err) {
                  if (err) {
                    console.log(err)
                  }
                })
            }

            pathArr = []
            setTimeout(function () {
              jsqN--
              callback(null, path + 'Callback content')
            }, delayN + 3000)
          })
      }

      async.mapLimit(pathArr, 1, function (path, callback) {
        setFile(path, callback)
      }, function (err, result) {
        console.log(err)
      })

      setTimeout(function () {
        jsq--
        huidiao(null, info.url + 'Callback content')
      }, delay + 3000)
    })
}

async.mapLimit(testUrls, 1, function (info, huidiao) {
  setData(info, huidiao)
}, function (err, result) {
  console.log(err)
})



