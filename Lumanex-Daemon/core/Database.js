module.exports = {
  checkTableExist: function(db, db_name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${db_name};`;

      db.get(query, function (error, row) {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
};
