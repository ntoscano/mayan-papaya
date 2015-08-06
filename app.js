var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'client')));


// only run server if app.js was run directly (rather than being
// imported as a module)
if (!module.parent) {
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;
