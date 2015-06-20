

var WebSocketServer = require('ws').Server,
      wss = new WebSocketServer({ port: 8080 });

// var = CLIENTS=[]; //A

var d = new Date();
var n = d.toString() + '：';

wss.on('connection', function (ws) {
    console.log('onconnection:' , ws._socket._connecting);
    // CLIENTS.push(ws); //A

    ws.on('message', function (message) {
        console.log(n + message);
        
        // sendAll(n + message); //A
        broadcast(n + message); //B
        // ws.close(); //コネクションを切断
    });
});

// A wsにはブロードキャストする機能がないので
// 接続時に保存している配列を精査して全員にsendメソッドでメッセージを送ります。
// 参考：http://dev.classmethod.jp/server-side/ws/
// function sendAll (data) {
//     for (var i=0; i<CLIENTS.length; i++) {
//         CLIENTS[i].send("data: " + data);
//     }
// }

//  B 配列ではなく、こちらをみてカスタマイズ
// https://github.com/websockets/ws#server-sending-broadcast-data
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

