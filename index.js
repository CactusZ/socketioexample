var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', function (socket) {
  socket.on('nickname', function (msg) {
    socket._name = msg;
    io.emit('chat message', {
      nickname: 'System',
      message: 'New user connected:' + socket._name
    });

    let users = [];
    for (let clientId in io.sockets.connected) {
      users.push(io.sockets.connected[clientId]._name);
    }
    io.emit('user list', users);
  });

  socket.on('disconnect', function (msg) {
    io.emit('chat message', {
      nickname: 'System',
      message: 'user disconnected:' + socket._name
    });

    let users = [];
    for (let clientId in io.sockets.connected) {
      users.push(io.sockets.connected[clientId]._name);
    }
    io.emit('user list', users);
  });

  socket.on('chat message', function (msg) {
    for (let clientId in io.sockets.connected) {
      if (clientId !== socket.id) {
        io.sockets.connected[clientId].emit('chat message', {
          nickname: socket._name,
          message: msg
        });
      }
    }
  });

  socket.on('is typing', function (status) {
    for (let clientId in io.sockets.connected) {
      if (clientId !== socket.id) {
        io.sockets.connected[clientId].emit('is typing', {
          nickname: socket._name,
          status: status
        });
      }
    }
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
