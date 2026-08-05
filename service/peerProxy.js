const { WebSocketServer, WebSocket } = require('ws');
const cookie = require('cookie');
const DB = require('./database');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', async (request, socket, head) => {
    try {
      const cookies = cookie.parse(request.headers.cookie || '');
      const token = cookies.token;

      if (!token) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      const user = await DB.getUserByToken(token);
      if (!user) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      socketServer.handleUpgrade(request, socket, head, (ws) => {
        ws.user = { username: user.username, token };
        socketServer.emit('connection', ws, request);
      });
    } catch (err) {
      console.error('WebSocket upgrade auth error:', err);
      socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
      socket.destroy();
    }
  });

  
  socketServer.on('connection', (socket) => {
    socket.isAlive = true;
    socket.sessionName = null;

    socket.on('message', function message(data) {
      try {
        const text = data.toString();
        const msg = JSON.parse(text);

        socket.sessionName = msg.sessionName;

        socketServer.clients.forEach((client) => {
          if (
            client !== socket &&
            client.readyState === WebSocket.OPEN &&
            client.sessionName === msg.sessionName
          ) {
            client.send(text, (err) => {
              if (err) {
                console.error('WebSocket send error:', err);
              }
            });
          }
        });
      } catch (err) {
        console.error('Failed to process WebSocket message:', err);
      }
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });

    socket.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };