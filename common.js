const http = require('http');
const superagent = require('superagent');
const cheerio = require('cheerio');

function spliceUrls(pageUrls, site) {
  for (let i = 1; i <= (site.num ? site.num : 1); i++) {
    let pageUrl = {}
    pageUrl.name = site.name ? site.name : 'undefined'
    pageUrl.url = (site.startUrl ? site.startUrl : '') + i + (site.endUrl ? site.endUrl : '')
    pageUrls.push(pageUrl);
  };
};
//获取路径集合
function getPageUrls(pageUrls, sites) {
  sites.forEach(site => {
    spliceUrls(pageUrls, site)
  });
};

function getData(name, Urls, dataHandle) {
  Urls.forEach(function (Url) {
    if (Url.name == name) {
      superagent.get(Url)
        .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
        .end((err, res) => {
          if (err) {
            console.log(err)
          }
          dataHandle(cheerio, res)
        })
    }else if(Url.name == 'undefined'){
      console.log(Url.url + 'is undefined, from: ' + Url.name)
    }else{
      console.log('not fond this site url!')
    }
  })
}
exports.getPageUrls = getPageUrls
exports.getData = getData