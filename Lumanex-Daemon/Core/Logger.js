const chalk = require('chalk');

module.exports = {
  INFO: 'info',
  ERROR: 'error',
  WARN: 'warning',

  log: function(type, cat, msg) {
    let typeOutput = "";
    let catOutput = "";

    if(type == this.INFO) {
      typeOutput = chalk.cyan("[INFO] ");
    } else if(type == this.ERROR) {
      typeOutput = chalk.red("[ERROR]");
    } else if(type == this.WARN) {
      typeOutput = chalk.yellow("[WARN] ");
    } else {
      this.log(this.ERROR, "Incorrect logging type");
      return;
    }

    if(cat == "Transaction") {
      catOutput = chalk.greenBright("[Transaction]");
    } else if(cat == "Core") {
      catOutput = chalk.magentaBright("[Core]");
    } else if(cat == "Block") {
      catOutput = chalk.blueBright("[Block]");
    } else if(cat == "RPC") {
      catOutput = chalk.hex('#FFA971')("[RPC]");
    } else if(cat == "P2P") {
      catOutput = chalk.hex('#DDEA62')("[P2P]");
    }

    let currentDate = new Date();

    let date = ("0" + currentDate.getDate()).slice(-2);
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let year = currentDate.getFullYear();

    let hours = ("0" + currentDate.getHours()).slice(-2);
    let minutes = ("0" + currentDate.getMinutes()).slice(-2);
    let seconds = ("0" + currentDate.getSeconds()).slice(-2);

    console.log(`${chalk.white(`[${date}-${month}-${year} ${hours}:${minutes}:${seconds}]`)} ${typeOutput} ${catOutput} ${msg}`);
  }
};
