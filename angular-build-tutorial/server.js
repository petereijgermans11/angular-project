  var vertx = require('vertx');

  vertx.createHttpServer().requestHandler(function(req) {
      var file = req.path() === '/' ? '/index.html' : req.path();
      req.response.sendFile('build/' + file.substr(1));
  }).listen(8000)