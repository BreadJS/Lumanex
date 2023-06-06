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
      /* Verbose Log */
      if(Core.cmdArgs['verbose-log']) {
        Logger.log(Logger.VERB, 'P2P', `[S:${socket.id}] Client connected`); 
      }

      /* Add Node */
      Core.connectedPeers++;
    
      socket.on('disconnect', () => {
        /* Verbose Log */
        if(Core.cmdArgs['verbose-log']) {
          Logger.log(Logger.VERB, 'P2P', `[S:${socket.id}] [NID:${Core.peerNodeID[socket.id]}] Client disconnected`); 
        }

        /* Remove Node */
        Core.connectedPeers--;
        delete Core.peerNodeID[socket.id];
      });
      
      socket.on('send-node-id', (nodeID) => {
        /* Assign socket id to node id */
        Core.peerNodeID[socket.id] = nodeID;

        /* If seed node connects to itself then disconnect */
        if(nodeID == Core.nodeID) {
          /* Verbose Log */
          if(Core.cmdArgs['verbose-log']) {
            Logger.log(Logger.VERB, 'P2P', `[S:${socket.id}] Seed node connected to itself, disconnecting...`); 
          }

          socket.disconnect();
        } else {
          /* Verbose Log */
          if(Core.cmdArgs['verbose-log']) {
            Logger.log(Logger.VERB, 'P2P', `[S:${socket.id}] [NID:${Core.peerNodeID[socket.id]}] Tracking node id`); 
          }
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