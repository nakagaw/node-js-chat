

var WebSocketServer = require('ws').Server,
      wss = new WebSocketServer({ port: 8080 });

var d = new Date();
var n = d.toString() + '：';

wss.on('connection', function (ws) {
    console.log('onconnection:' , ws._socket._connecting);

    ws.on('message', function (message) {
        console.log(n + message);
        // ws.send(n + message); // ws.onmessageに送る

        broadcast(n + message);
        // ws.close(); //コネクションを切断
    });
});

// wsにはブロードキャストする機能がないので
// 接続時に保存している配列を精査して全員にsendメソッドでメッセージを送ります。
// 参考：http://dev.classmethod.jp/server-side/ws/
// 配列ではなく、こちらをみてカスタマイズ
// https://github.com/websockets/ws#server-sending-broadcast-data
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

