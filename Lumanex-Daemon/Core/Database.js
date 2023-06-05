const Logger = require('./Logger');

module.exports = {
  checkTableExist: async function(db, db_name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${db_name};`;

      db.get(query, function (error, row) {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  },

  initializeTables: async function(db) {
    return new Promise(async (resolve, reject) => {
      let blocks = await module.exports.checkTableExist(db, 'blocks');
      let transactions = await module.exports.checkTableExist(db, 'transactions');

      /* Create 'blocks' table if it does not exist */
      if(!blocks) {
        db.run(`CREATE TABLE "blocks" (
          "id" INTEGER,
          "version" INTEGER,
          "hash" TEXT,
          "previous_block_hash" TEXT,
          "markle_root_hash" TEXT,
          "timestamp" INTEGER,
          "difficulty" INTEGER,
          "nonce" INTEGER,
          PRIMARY KEY("id" AUTOINCREMENT)
        )`);

        /* Log */
        Logger.log(Logger.INFO, 'Block', `Blocks table created`);
      } else {
        /* Log */
        Logger.log(Logger.INFO, 'Block', `Blocks table loaded`);
      }
      
      /* Create 'transactions' table if it does not exist */
      if(!transactions) {
        db.run(`CREATE TABLE "transactions" (
          "id"	INTEGER,
          "version"	INTEGER,
          "inputs"	TEXT,
          "outputs"	TEXT,
          "locktime"	INTEGER,
          "tx_hash"	TEXT,
          "fee"	INTEGER,
          PRIMARY KEY("id" AUTOINCREMENT)
        )`);

        /* Log */
        Logger.log(Logger.INFO, 'Transaction', `Transactions table created`);
      } else {
        /* Log */
        Logger.log(Logger.INFO, 'Transaction', `Transactions table loaded`);
      }

      resolve();
    });
  }
};
