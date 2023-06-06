const commandLineArgs = require('command-line-args');

function generateNodeID() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const idLength = 32;
  let id = '';

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

module.exports = {
  cmdArgs: commandLineArgs([
    { name: 'p2p-port', type: Number },
    { name: 'rpc-port', type: Number },
    { name: 'verbose-log', type: Boolean },
  ]),
  
  nodeID: generateNodeID(),

  connectedPeers: 0,
  peerNodeID: [],
};