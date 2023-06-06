
const os = require('os');
const fs = require('fs');
const process = require('process');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const socketIOClient = require('socket.io-client');

const Config = require('./Core/Config');
const Core = require('./Core/Core');
const Logger = require('./Core/Logger');
const Database = require('./Core/Database');
const RPC = require('./Core/RPC');

const app = express();

const p2papp = express();
const p2pServer = http.createServer(p2papp);
const p2pIO = socketIO(p2pServer);

const sqlite3 = require('sqlite3');
const P2P = require('./Core/P2P');
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

  

  /* P2P Incoming Connection */
  P2P.serverIncomingConnection(p2pIO);

  /* Start P2P server */
  P2P.startServer(p2pServer);


  
  /* Client connect to nodes */
  P2P.clientConnect(socketIOClient);



  /* RPC Server */
  RPC.initializeRequests(app);

  /* Start RPC server */
  RPC.startServer(app);
})();