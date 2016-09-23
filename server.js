var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

var port = 3000;

app.use(serveStatic("./"));
app.listen(port);
console.log('Listening at port: ' + port);