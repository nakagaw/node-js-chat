

var express = require('express')
    , app = express()
    , root = "./public/"
    , port = process.env.PORT || 8080 // process.env.PORT はユーザー環境のポート番号でのコネクションの受け入れ
    , WebSocketServer = require('ws').Server
    ;


app.use(express.static(root));
var server = require('http').createServer(app)
    , WSS = new WebSocketServer({ "server" : server })

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



