/**
 * Created by Priyanka on 3/16/16.
 */

module.exports = function (app) {

  var userModel = require("./models/user.model.js")();
  var userService = require("./services/user.service.server.js")(app,userModel);

  var recipeModel = require("./models/recipe.model.js")();
  var recipeService = require("./services/recipe.service.server.js")(app,userModel,recipeModel);


};
