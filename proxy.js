const cheerio = require('cheerio');
const common = require('./common');
const c = common.c;

//获取代理列表页
const sites = [
	{
		name: 'kx',
		pageNum: 1,
		pageItem: 10,
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
let pageUrls = [];

// c.getPageUrls(pageUrls, sites);
// console.log(pageUrls)

let data = { a: 'aa', b: 'bb' }
// c.fs('/aa/bb/cc/dd.json', data)
c.mkdirs('./aa/bb/cc/dd', function (ee) {
	console.log(ee)
})



// pageUrls.forEach(function (pageUrl) {
// 	switch (pageUrl.name) {
// 		case 'kx':
// 			c.superagent(pageUrl.url).then(res => {
// 				let $ = cheerio.load(res.text);
// 				for (let i = 0; i < 10; i++) {
// 					let ip = $('tbody tr').eq(i).find('td').first().text()
// 					let port = $('tbody tr').eq(i).find('td').eq(1).text()
// 					let dlUrl = 'http://' + ip + ':' + port
// 					ep.emit(pageUrl.name, dlUrl)
// 				};
// 			});
// 			c.isUsable('有效: 开心代理', pageUrl.name, pageUrl.pageNum, pageUrl.pageItem)
// 			break
// 		case 'xc':
// 			c.superagent(pageUrl.url).then(res => {
// 				let $ = cheerio.load(res.text);
// 				for (let i = 1; i < 100; i++) {
// 					let ip = $('#ip_list tr').eq(i).find('td').eq(1).text()
// 					let port = $('#ip_list tr').eq(i).find('td').eq(2).text()
// 					let dlUrl = 'http://' + ip + ':' + port
// 					ep.emit('xcProxy', dlUrl)

// 				};
// 			});
// 			c.isUsable('有效: 西刺代理', pageUrl.name, pageUrl.pageNum, pageUrl.pageItem)
// 			break
// 	}
// });






