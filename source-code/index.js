var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  console.log("Hello");
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(files);
      var oldpath = files.filetoupload.path;
      var newpath = '/home/robson/' + files.filetoupload.name;

      var is = fs.createReadStream(oldpath);
      var os = fs.createWriteStream(newpath);

      is.pipe(os);
      is.on('end', function () {
        fs.unlinkSync(oldpath);
      });
    });
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
