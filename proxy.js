var http = require('http')
var superagent = require('superagent')
require('superagent-proxy')(superagent)
const cheerio = require('cheerio');
var eventproxy = require('eventproxy')
var ep = new eventproxy()

const common = require('./common');
const c = common.c;

//获取代理列表页
let pageUrls = [];
const sites = [
	{
		name: 'kx',
		num: 1,
		item: 10,
		startUrl: 'http://www.kxdaili.com/dailiip/1/',
		endUrl: '.html#ip'
	},
	{
		name: 'xc',
		pageNum: 1,
		pageItem: 99,
		startUrl: 'http://www.xicidaili.com/nn/'
	}
];
let proxy = 'http://118.114.77.47:8080'

c.getPageUrls(pageUrls, sites)
console.log(pageUrls)


pageUrls.forEach(function (pageUrl) {
	switch (pageUrl.name) {
		case 'kx':
			c.superagent(pageUrl.url, proxy).then(res => {
				let $ = cheerio.load(res.text);
				for (let i = 0; i < 10; i++) {
					let ip = $('tbody tr').eq(i).find('td').first().text()
					let port = $('tbody tr').eq(i).find('td').eq(1).text()
					let dlUrl = 'http://' + ip + ':' + port
					ep.emit('Proxy', dlUrl)
					console.log(dlUrl)
				};
			});
			break
		// case 'xc':
		// 	c.superagent(pageUrl.url).then(res => {
		// 		let $ = cheerio.load(res.text);
		// 		for (let i = 1; i < 100; i++) {
		// 			let ip = $('#ip_list tr').eq(i).find('td').eq(1).text()
		// 			let port = $('#ip_list tr').eq(i).find('td').eq(2).text()
		// 			let dlUrl = 'http://' + ip + ':' + port
		// 			ep.emit('Proxy', dlUrl)
		// 		};
		// 	});
		// 	break
	}
});

ep.after('proxy1', sites.num * 10, function (dlUrls) {
	console.log(1)
	dlUrls.forEach(function (dlUrl) {
		console.log(dlUrl)
		superagent1.get('http://ip.chinaz.com/getip.aspx')
			.proxy(dlUrl)
			.timeout(3000)
			.end((err, res) => {
				if (res === undefined) {
					console.log(dlUrl + '已失效');
					return
				} else {
					let proxys = [];
					let proxy = {};
					proxy.url = dlUrl;
					proxys.push(proxy);
					console.log(proxys)
					c.createFile('./proxy/ipUsable.json', JSON.stringify(proxys));
				}
			})
	})
})