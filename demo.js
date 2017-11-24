var str = 'background:  center url("img/a212.png")center no-repeat url("img/a22.png")'
var str1 = "background: url('img/a123.png')  center center no-repeat url('img/a23.png')"
var substr = str1.match(/url\('(\S*)'\)|url\("(\S*)"\)/g)

// var rex = new RegExp(/url\('(\S*)'\)|url\("(\S*)"\)/g)
// rex.exec(str)
console.log(substr)