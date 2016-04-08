/**
 * Created by Priyanka on 3/16/16.
 */

module.exports = function (app,mongoose,db) {

  var userModel = require("./models/user.model.js")(mongoose,db);
  var userService = require("./services/user.service.server.js")(app,userModel);

  var recipeModel = require("./models/recipe.model.js")(mongoose,db);
  var recipeService = require("./services/recipe.service.server.js")(app,userModel,recipeModel);

  var newsModel = require("./models/news.model.js")(mongoose,db);
  var newsService = require("./services/news.service.server.js")(app,userModel,newsModel);

  var eventModel = require("./models/event.model.js")(mongoose,db);
  var eventService = require("./services/event.service.server.js")(app,userModel,eventModel);

};
