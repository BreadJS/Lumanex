
const os = require('os');
const fs = require('fs');
const process = require('process');
const express = require('express');

const Config = require('./core/Config');
const Logger = require('./core/Logger');
const Database = require('./core/Database');

const app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db');

(async() => {
  /* Check if coin blockchain folder exists */
  /* TODO: Change this for windows directory to %appdata% */
  if (!fs.existsSync(`${os.homedir()}/${(process.platform == "win32" ? '' : '.')}${Config.COINNAME}`)){
    fs.mkdirSync(`${os.homedir()}/.${Config.COINNAME}`);

    /* Set blockchain folder */
    Config.BLOCKCHAIN_FOLDER = `${os.homedir()}/.${Config.COINNAME}`;
  }

  /* Clear console */
  console.clear();


  Logger.log(Logger.INFO, 'Core', `${Config.COINNAME} v${Config.VERSION}`);


  /* Initializing blocks and transactions tables */
  Logger.log(Logger.INFO, 'Block', 'Initializing blocks...');
  Logger.log(Logger.INFO, 'Transaction', 'Initializing transactions...');
  await Database.initializeTables(db);


  /* Express calls */
  app.get('/', function (req, res) {
    res.json({
      success: false,
      result: {
        message: "This is not a valid API call"
      }
    });
  });


  /* Starting RPC server */
  app.listen(Config.RPC_PORT, () => {
    Logger.log(Logger.INFO, 'RPC', `RPC server has started on port ${Config.RPC_PORT}`);
  });
})();