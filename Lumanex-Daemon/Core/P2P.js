const Config = require('./Config');
const Core = require('./Core');
const Logger = require('./Logger');

module.exports = {
  startServer: function(server) {
    server.listen((!isNaN(Core.cmdArgs['p2p-port']) ? Core.cmdArgs['p2p-port'] : Config.P2P_PORT), () => {
      Logger.log(Logger.INFO, 'P2P', `P2P server has started on port ${(!isNaN(Core.cmdArgs['p2p-port']) ? Core.cmdArgs['p2p-port'] : Config.P2P_PORT)}`);
    });
  },

  serverIncomingConnection: function(io) {
    io.on('connection', (socket) => {
      Core.connectedPeers++;
    
      socket.on('disconnect', () => {
        Core.connectedPeers--;
      });
      
      socket.on('send-node-id', (nodeID) => {
        if(nodeID == Core.nodeID) {
          socket.disconnect();
        }
      });
    });
  },

  clientConnect: function(io) {
    for(let i = 0; i < Config.SEED_NODES.length; i++) {
      const socket = io(`http://${Config.SEED_NODES[i]}`);
      
      socket.on('connect', (data) => {
        socket.emit('send-node-id', Core.nodeID);
      });
    }
  }
};