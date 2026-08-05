const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer, path: '/ws' });

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