const http = require('http');
const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');
const ep = eventproxy();
const fs = require('fs');

//获取代理列表页
let sites = [
	{ name: 'kx', num: 10 },
	{ name: 'xc', num: 2 }
]
function url(name, i) {
	switch (name) {
		case 'kx':
			pageUrl = 'http://www.kxdaili.com/dailiip/1/' + i + '.html#ip';
			break
		case 'xc':
			pageUrl = 'http://www.xicidaili.com/nn/' + i;
			break
	}
}
let pageUrl = ''
let pageUrls = [];
function getPageUrls(name, num) {
	for (let i = 1; i <= num; i++) {
		let page = {};
		page.name = name;
		url(name, i);
		page.url = pageUrl;
		pageUrls.push(page);
	};
};
sites.forEach(site => {
	getPageUrls(site.name, site.num)
});
console.log(pageUrls);



