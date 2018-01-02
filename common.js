const http = require('http')
const superagent = require('superagent')
require('superagent-proxy')(superagent)
const cheerio = require('cheerio')
const fs = require('fs')

//获取页码路径
function getPageUrls(pageUrls, sites) {
  sites.forEach(site => {
    for (let i = 1; i <= (site.num ? site.num : 1); i++) {
      let pageUrl = {}
      pageUrl.name = site.name ? site.name : 'undefined'
      pageUrl.url = (site.startUrl ? site.startUrl : '') + i + (site.endUrl ? site.endUrl : '')
      pageUrls.push(pageUrl);
    };
  });
};

//获取代理
function getData(site,itemNum, pageUrls, dataHandle) {
  let pageNum = 0;
  pageUrls.forEach(function (pageUrl) {
    if (pageUrl.name == site) {
      pageNum++;
      superagent.get(pageUrl.url)
        .proxy('http://111.20.46.122:80')
        .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
        .end((err, res) => {
          if (err) {
            console.log(err)
          }
          let ip = '';
          let port = ''
          let $ = cheerio.load(res.text)
          dataHandle($)
          let proxys = 'http://' + ip + ':' + port
          ep.emit('isUsable', proxys)
        })
    }
  })
  ep.after('isUsable', pageNum * itemNum, function (proxys) {
    proxys.forEach(function (proxy) {
      superagent.get('http://ip.chinaz.com/getip.aspx')
        .proxy(proxy)
        .timeout(3000)
        .end((err, res) => {
          if (xtres === undefined) {
            console.log(proxy + '已失效')
            return
          } else {
            let dlIp = {}
            dlIp.name = site
            dlIp.url = proxy

            ipUsable.push(dlIp)
            fs.writeFile('./proxy/ipUsable.json', JSON.stringify(ipUsable))
          }
        })
    })
  })
}

exports.getPageUrls = getPageUrls
exports.getData = getData