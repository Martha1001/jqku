const path = require("path");

//返回当前平台的path分隔符 ('/')
//return: <string> (':',';')
console.log(path.delimiter)

//返回当前平台的文件path分隔符 ('/')
//return: <string> ('/','\\')
console.log(path.sep)

//提供了path方法针对Windows的实现
//return: <object>
console.log(path.win32)

//提供了path方法针对POSIX的实现
//return: <object>
console.log(path.posix)

//path.dirname(path) 返回path的目录名
//path <string>
//return: <string> ('/aa/bb/cc','/aa/bb/cc')
console.log(path.dirname('/aa/bb/cc/dd/'))
console.log(path.dirname('/aa/bb/cc/file.js'))

//path.basename(path[,ext]) 返回path的最后一部分
//path <string>
//ext <string> (可)
//return: <string> ('file.js','file')
console.log(path.basename('/aa/file.js'))
console.log(path.basename('/aa/file.js', '.js'))

//path.extname(path) 返回path的扩展名,即path最后一部分中的最后一个.字符到字符结束
//path <string>
//return: <string> ('.js')
console.log(path.extname('/aa/file.js'))

//path.join([...paths]) 拼接path
//...paths <string>
//return: <string> ('/aa/bb/cc/dd')
console.log(path.join('/aa', 'bb', '', 'cc/dd', 'ee', '..'))

//path.normalize(path) 格式化path
//path <string>
//return: <string> ('/aa/bb./file..js')
console.log(path.normalize('//aa/bb.////file..js'))

//path.isAbsolute(path) 判断path是否为绝对path (path长度为0,返回false)
//path <string>
//return: <boolean> (ture)
console.log(path.isAbsolute('//aa'))

//path.resolve([...paths]) 把一个path或path片段的序列解析为一个绝对path
//...paths <string>
//return: <string> ('/dd/ee/ff')
console.log(path.resolve('/aa/bb/', './cc', '/dd/ee', 'ff'))

//path.relative(from, to) 返回从from到to的相对path(基于当前工作目录)
//from <string>
//to <string>
//return: <string> ('../../../home/martha02/web/jqku/aa/dd')
console.log(path.relative('/aa/bb/cc', 'aa/dd'))

//path.parse(path) 返回一个path对象
//path <string>
//return: <object>{
//   dir <string>
//   root <string>
//   base <string>
//   name <string>
//   ext <string>
//}
// {
//   root: '',
//   dir: 'c:/aa/bb/cc',
//   base: 'file.js',
//   ext: '.js',
//   name: 'file'
// }
console.log(path.parse('c:/aa/bb/cc/file.js'))

//path.format(pathObject) 从一个对象返回一个path字符串 (与path.parse()相反)
//pathObject <object>{
//   dir <string> (有则忽略root)
//   root <string>
//   base <string> (有则忽略name,ext)
//   name <string>
//   ext <string>
//}
//return: <string> ('/a/file.js')
console.log(path.format({
  dir: '/a',
  root: '/b',
  base: 'file.js',
  name: 'file',
  ext: '.js'
}))