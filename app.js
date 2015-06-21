

var express = require('express')
    , app = express()
    // , fs = require('fs')
    // , mime= require('mime')
    // , url  = require("url")
    // , path = require("path")
    , root = "./public/"
    , port = 8080
    , WebSocketServer = require('ws').Server
    ;


app.use(express.static(root ));
var server = require('http').createServer(app)
    , WSS = new WebSocketServer({ "server" : server })

// // Create HTTP Server
// 参考：<a href="http://blog.myon.info/blog/2013-10-12/entry/" target="_blank">Node.jsで遊んだ (2) | とさいぬの隠し部屋</a>
// server.on('request', function (req, res) {
//   // Check File Path
//   var path;
//   if(req.url == '/') { // req.urlはアクセスされたURLを取得取得
//     path = root + './index.html';
//   }
//   else {
//     path = '.' + req.url;
//   }
//   // Read File and Write
//   fs.readFile(path, function (err, data) {
//     if(err) {
//       res.writeHead(404, {"Content-Type": "text/plain"});
//       return res.end(req.url + ' not found.');
//     }
//     var type = mime.lookup(path);
//     res.writeHead(200, {"Content-Type": type});
//     res.write(data);
//     res.end();
//   });
// })
server.listen(port);
console.log('http://localhost:' + port);

// websocketserver
WSS.on('connection', function (ws) {
    console.log('onconnection OK');

    ws.on('open', function (message) {
        // console.log(message);
        broadcast(message);
    });
    ws.on('close', function (message) {
        // console.log(message);
        broadcast(message);
    });
    ws.on('message', function (message) {
        console.log(message);
        broadcast(message);
    });
});

function broadcast(data) {
  WSS.clients.forEach(function each(client) {
    client.send(data);
  });
};



