const Config = require('./Config');
const Core = require('./Core');
const Logger = require('./Logger');

module.exports = {
  startServer: function(app) {
    app.listen((!isNaN(Core.cmdArgs['rpc-port']) ? Core.cmdArgs['rpc-port'] : Config.RPC_PORT), () => {
      Logger.log(Logger.INFO, 'RPC', `RPC server has started on port ${(!isNaN(Core.cmdArgs['rpc-port']) ? Core.cmdArgs['rpc-port'] : Config.RPC_PORT)}`);
    });
  },

  initializeRequests: function(app) {
    /* Information about the project, daemon and networkow to */
    app.get('/info', function (req, res) { res.json(module.exports.getInfo()); });

    /* 404 */
    app.get('*', function (req, res) { res.status(404).json(module.exports.sendCode404()); });
  },

  getInfo: function() {
    return {
      success: true,
      result: {
        height: 0,
        network_height: 0,
        difficulty: 0,
        tx_count: 0,
        tx_mempool: 0,
        connected_peers: Core.connectedPeers,
        fork_heights: Config.FORK_HEIGHTS,
        supported_height: Config.FORK_HEIGHTS[Config.SOFTWARE_SUPPORTED_FORK_INDEX],
        hashrate: 0,
        synced: false,
        version: Config.VERSION,
        ticker: Config.TICKER,
        decimals: Config.DECIMALS,
        start_time: 0,
      }
    };
  },

  sendCode404: function() {
    return {
      success: false,
      result: {
        message: "This is not a valid API call"
      }
    }
  },
};