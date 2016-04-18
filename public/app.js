/**
 * Created by Priyanka on 4/17/16.
 */
var userModel = require("./models/user.model.js")(mongoose,db);
var userProjModel = require("../../project/server/models/user.model")(mongoose,db);
require("./services/user.service.server.js")(app,userModel,userProjModel);

var formModel = require("./models/form.model.js")(mongoose,db);
require("./services/form.service.server.js")(app,userModel,formModel);

var fieldModel = require("./models/fields.model.js")(mongoose,db);
require("./services/field.service.server.js")(app,fieldModel);

var recipeModel = require("../../project/server/models/recipe.model.js")(mongoose,db);
var recipeService = require("../../project/server/services/recipe.service.server.js")(app,userProjModel,recipeModel);

var newsModel = require("../../project/server/models/news.model.js")(mongoose,db);
var newsService = require("../../project/server/services/news.service.server.js")(app,userProjModel,newsModel);

var eventModel = require("../../project/server/models/event.model.js")(mongoose,db);
var eventService = require("../../project/server/services/event.service.server.js")(app,userProjModel,eventModel);