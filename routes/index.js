
var fs = require('fs');
var compileBar = require('./compiler.js').compileBar;
var compileForce = require('./compiler.js').compileForce

exports.index = function(req, res){
  fs.readdir('./public/files/', function (err, files) {
    res.render('index', {
  	 files: files
    });
  })
};

exports.save = function(req, res) {
  var title = req.body.name,
      content = req.body.content,
      filename = req.body.file,
      extension = req.body.type;
  fs.open('./public/files/'+filename+'.'+extension, 'w', function opened(err, fd) {
  if(err) { console.log(err); }
  var writeBuffer = new Buffer(title+'<T>'+content),
  bufferPosition = 0,
  bufferLength = writeBuffer.length, filePosition = null;
  fs.write(fd,
    writeBuffer,
    bufferPosition,
    bufferLength,
    filePosition,
    function wrote(err, written){
      if (err) { console.log(err); }
      res.redirect('/')
    })
})
};

exports.view = function (req, res) {
	req.session.file = req.params.file;
	res.render('view');
}

exports.open = function (req, res) {
  var file = req.session.file;
  var tester = new RegExp('\.(fce|bar)');
  if(!tester.test(file)) {
    res.redirect('/');
  } else {
  	var type = file.split('.')[1];
  };
  fs.open('./public/files/'+file, 'r', function opened(err, fd) {
    if (err) { console.log(err); }
    var readBuffer = new Buffer(1024),
    bufferOffset = 0,
    bufferLength = readBuffer.length,
    filePosition = 0;
    fs.read(fd, 
      readBuffer, 
      bufferOffset, 
      bufferLength, 
      filePosition,
      function read(err, readBytes) {
      	var fileBody = readBuffer.slice(0, readBytes);
      	fileBody = fileBody.toString();
        var title = fileBody.split('<T>')[0];
        var body = fileBody.split('<T>')[1];
        var data;
        if(type === 'bar') {
          data = JSON.stringify(compileBar(body, title));
        } else {
          data = JSON.stringify(compileForce(body, title));
        }
        res.end(data);
        })
      })
};

exports.edit = function(req, res) {
  var file = req.params.file.split('.')[0];
  var type = req.params.file.split('.')[1];
  fs.open('./public/files/'+req.params.file,'r', function (err, fd) {
    if (err) { console.log(err); }
    var readBuffer = new Buffer(1024),
    bufferOffset = 0,
    bufferLength = readBuffer.length,
    filePosition = 0;
    fs.read(fd, 
      readBuffer, 
      bufferOffset, 
      bufferLength, 
      filePosition,
      function read(err, readBytes) {
        var body = readBuffer.slice(0, readBytes).toString();
        var name = body.split('<T>')[0];
        var content = body.split('<T>')[1];
        console.log(file + type);
        res.render('edit', {
          file: file,
          type: type,
          name: name,
          content: content
        })
      })
  })
}

var forEach = function(array, fn) {
  for(i=0;i<array.length;i++) {
    fn(array[i]);
  }
};