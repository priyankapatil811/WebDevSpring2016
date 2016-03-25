/**
 * Created by Priyanka on 3/16/16.
 */

module.exports = function (app) {

  var userModel = require("./models/user.model.js")();
  var userService = require("./services/user.service.server.js")(app,userModel);

  var recipeModel = require("./models/recipe.model.js")();
  var recipeService = require("./services/recipe.service.server.js")(app,userModel,recipeModel);

  var newsModel = require("./models/news.model.js")();
  var newsService = require("./services/news.service.server.js")(app,userModel,newsModel);

  var eventModel = require("./models/event.model.js")();
  var eventService = require("./services/event.service.server.js")(app,userModel,eventModel);

};