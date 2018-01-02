const http = require('http')
const superagent = require('superagent')
require('superagent-proxy')(superagent)
const cheerio = require('cheerio')
const fs = require('fs')
const common = require('./common');

//获取代理列表页
let pageUrls = [];
const sites = [
	{
		name: 'kx',
		num: 1,
		startUrl: 'http://www.kxdaili.com/dailiip/1/',
		endUrl: '.html#ip'
	},
	{
		name: 'xc',
		num: 1,
		startUrl: 'http://www.xicidaili.com/nn/'
	}
];
function dataKx($) {
	for (let i = 0; i < 10; i++) {
		ip = $('tbody tr').eq(i).find('td').first().text()
		port = $('tbody tr').eq(i).find('td').eq(1).text()
	}
}
function dataXc($) {
	for (let i = 1; i < 10; i++) {
		ip = $('#ip_list tr').eq(i).find('td').eq(1).text()
		port = $('#ip_list tr').eq(i).find('td').eq(2).text()
	}
}

common.getPageUrls(pageUrls, sites);
common.getData('kx', 10, pageUrls, dataKx);
common.getData('xc', 99, pageUrls, dataXc);






