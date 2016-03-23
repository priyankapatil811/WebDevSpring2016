/**
 * Created by Priyanka on 3/16/16.
 */

module.exports = function (app) {

  var userModel = require("./models/user.model.js")();
  require("./services/user.service.server.js")(app,userModel);
};
