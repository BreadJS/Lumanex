module.exports = {
  initializeRequests: function(app) {
    app.get('/', function (req, res) { res.json(module.exports.getInfo()); });

    /* 404 */
    app.get('*', function (req, res) { res.status(404).json(module.exports.sendCode404()); });
  },

  getInfo: function() {
    return {
      success: true,
      result: {
        message: "Hey"
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