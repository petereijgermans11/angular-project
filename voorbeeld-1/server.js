  var vertx = require('vertx');

  vertx.createHttpServer().requestHandler(function(req) {
      var file = req.path() === '/' ? '/index.html' : req.path();
      req.response.sendFile('build/' + file.substr(1));
/*      
      if(req.path().indexOf('/bower_components') === 0 ) {
          req.response.sendFile(req.path().substr(1));
      } else {
        req.response.sendFile('build/' + file);
      }
 */    
  }).listen(8000)