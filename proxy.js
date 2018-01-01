const common = require('./common');

//获取代理列表页
let pageUrls = [];
const sites = [
	// {
	// 	name: 'kx',
	// 	num: 1,
	// 	startUrl: 'http://www.kxdaili.com/dailiip/1/',
	// 	endUrl: '.html#ip'
	// },
	{
		name: 'xc',
		num: 1,
		startUrl: 'http://www.xicidaili.com/nn/'
	}
];
function dataKX(cheerio, res) {
	let $ = cheerio.load(res.text)
	for (let i = 0; i < 10; i++) {
		let kxIp = $('tbody tr').eq(i).find('td').first().text();
		let kxPort = $('tbody tr').eq(i).find('td').eq(1).text();
		let kxDl = 'http://' + kxIp + ':' + kxPort;
		console.log(kxDl)
	};
};
function dataXC(cheerio, res) {
	let $ = cheerio.load(res.text)
	for (let i = 0; i < 10; i++) {
		let xcIp = $('#ip_list tr').eq(i).find('td').eq(1).text()
		let xcPort = $('#ip_list tr').eq(i).find('td').eq(2).text()
		let xcDl = 'http://' + xcIp + ':' + xcPort
		console.log(xcDl)
	};
};

common.getPageUrls(pageUrls, sites);
console.log(pageUrls);
// common.getData('kx', pageUrls, dataKX);
common.getData('xc', pageUrls, dataXC);



