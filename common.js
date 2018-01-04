const http = require('http')
const superagent = require('superagent')
require('superagent-proxy')(superagent)
var eventproxy = require('eventproxy')
var ep = eventproxy()
var fs = require("fs");
var path = require("path");

class Common {
  constructor() { }

  //Get pageUrls
  getPageUrls(pageUrls, sites) {
    sites.forEach(site => {
      for (let i = 1; i <= (site.num ? site.num : 1); i++) {
        let pageUrl = {};
        pageUrl.name = site.name ? site.name : 'undefined';
        pageUrl.pageNum = site.pageNum;
        pageUrl.pageItem = site.pageItem;
        pageUrl.url = (site.startUrl ? site.startUrl : '') + i + (site.endUrl ? site.endUrl : '');
        pageUrls.push(pageUrl);
      };
    });
  };

  //Create path and file
  mkdirsSync(dirnameStr) { 
    if (fs.existsSync(dirnameStr)) {
      return true;
    } else {
      if (common.mkdirsSync(path.dirname(dirnameStr))) {
        fs.mkdirSync(dirnameStr);
        return true;
      }
    }
  }
  createFile(pathStr, data) {
    let dirname = path.dirname(pathStr)
    common.mkdirsSync(dirname)
    fs.writeFile(pathStr, data)
  }

  //Http request
  superagent(url, proxy) {
    return new Promise((resolve, reject) => {
      superagent.get(url)
        .proxy(proxy)
        .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
        .end((err, res) => {
          if (err) {
            console.log(err)
          }
          resolve(res)
        })
    })
  }

  //Determine proxy is available
  isUsable(name, stite, pageNum, pageItem) {
    ep.after(stite, pageNum * pageItem, function (dlUrls) {
      dlUrls.forEach(function (dlUrl) {
        superagent.get('http://ip.chinaz.com/getip.aspx')
          .proxy(dlUrl)
          .timeout(3000)
          .end((err, res) => {
            if (res === undefined) {
              console.log(dlUrl + '已失效');
              return
            } else {
              let proxys = [];
              let proxy = {};
              proxy.name = name;
              proxy.url = res;
              proxys.push(proxy);
              common.createFile('./proxy/ipUsable.json', JSON.stringify(proxys));
            }
          })
      })
    })
  }




}
var common = new Common();
exports.c = common