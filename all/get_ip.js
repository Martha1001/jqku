var http = require('http')
var superagent = require('superagent')
require('superagent-proxy')(superagent)
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var ep = eventproxy()
var fs = require('fs')

var ipUsable = require('./proxy/ipUsable.json')
var ipList = require('./proxy/ipList.json')

//开心代理
var kxPageNum = 1
var kxUrls = []

for (var i = 1; i <= kxPageNum; i++) {
  kxUrls.push('http://www.kxdaili.com/dailiip/1/' + i + '.html#ip')
}

kxUrls.forEach(function (kxUrl) {
  superagent.get(kxUrl)
    .proxy('http://111.20.46.122:80')
    .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    .end((err, kres) => {
      if (err) {
        console.log(err)
      }

      var $ = cheerio.load(kres.text)
      for (var i = 0; i < 10; i++) {
        var kxIp = $('tbody tr').eq(i).find('td').first().text()
        var kxPort = $('tbody tr').eq(i).find('td').eq(1).text()
        var kxDl = kxIp + ':' + kxPort
        ep.emit('kxTest', kxDl)
        console.log(kxDl)
      }
    })
})

ep.after('kxTest', kxPageNum * 10, function (kxDls) {
  kxDls.forEach(function (kxDl) {
    let testIp = 'http://' + kxDl

    // let ip = {}
    // ip.name = '开心代理'
    // ip.url = testIp
    // ipList.push(ip)
    // fs.writeFile('./proxy/ipList.json', JSON.stringify(ipList))

    superagent.get('http://ip.chinaz.com/getip.aspx')
      .proxy(testIp)
      .timeout(3000)
      .end((err, ktres) => {
        if (ktres === undefined) {
          console.log(testIp + '已失效')
          return
        } else {
          let dlIp = {}
          dlIp.name = '有效：开心代理'
          dlIp.url = testIp

          ipUsable.push(dlIp)
          fs.writeFile('./proxy/ipUsable.json', JSON.stringify(ipUsable))
        }
      })
  })
})


//西刺代理
var xcPageNum = 2
var xcUrls = []

for (var i = 1; i <= xcPageNum; i++) {
  xcUrls.push('http://www.xicidaili.com/nn/' + i)
}

xcUrls.forEach(function (xcUrl) {
  superagent.get(xcUrl)

    .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    .end((err, xres) => {
      if (err) {
        console.log(err)
      }

      var $ = cheerio.load(xres.text)
      for (var i = 1; i < 100; i++) {
        var xcIp = $('#ip_list tr').eq(i).find('td').eq(1).text()
        var xcPort = $('#ip_list tr').eq(i).find('td').eq(2).text()
        var xcDl = xcIp + ':' + xcPort
        ep.emit('xcTest', xcDl)
      }
    })
})

ep.after('xcTest', xcPageNum * 99, function (xcDls) {
  xcDls.forEach(function (xcDl) {
    var testIp = 'http://' + xcDl

    let ip = {}
    ip.name = '西刺代理'
    ip.url = testIp
    ipList.push(ip)
    fs.writeFile('./proxy/ipList.json', JSON.stringify(ipList))

    superagent.get('http://ip.chinaz.com/getip.aspx')
      .proxy(testIp)
      .timeout(3000)
      .end((err, xtres) => {
        if (xtres === undefined) {
          console.log(testIp + '已失效')
          return
        } else {
          let dlIp = {}
          dlIp.name = '有效：西刺代理'
          dlIp.url = testIp

          ipUsable.push(dlIp)
          fs.writeFile('./proxy/ipUsable.json', JSON.stringify(ipUsable))
        }
      })
  })
})