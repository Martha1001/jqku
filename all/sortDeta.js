var fs = require('fs')

var demos = require('./data/demoList.json')
var datas = require('./data/dataList.json')
var resDatas = require('./static/demoList.json')

var num = 0

for (var i = 0; i < 2375; i++) {
  let info = {}
  let name = datas[i].title
  let url = demos[i]

  if(datas[i].demo == demos[i]){
    info.name = name
    info.url = url
    num++
    resDatas.push(info)
    fs.writeFile('./static/demoList.json', JSON.stringify(resDatas))
    console.log('已写入' + num + '条数据')
  }
}

