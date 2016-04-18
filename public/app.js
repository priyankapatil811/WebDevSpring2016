/**
 * Created by Priyanka on 4/17/16.
 */
"use strict";

module.exports = function (app,mongoose,db) {

    var userModel = require("./assignment/server/models/user.model.js")(mongoose, db);
    var userProjModel = require("./project/server/models/user.model")(mongoose, db);
    require("./assignment/server/services/user.service.server.js")(app, userModel, userProjModel);
    require("./project/server/services/user.service.server.js")(app, userProjModel);

    var formModel = require("./assignment/server/models/form.model.js")(mongoose, db);
    require("./assignment/server/services/form.service.server.js")(app, userModel, formModel);

    var fieldModel = require("./assignment/server/models/fields.model.js")(mongoose, db);
    require("./assignment/server/services/field.service.server.js")(app, fieldModel);

    var recipeModel = require("./project/server/models/recipe.model.js")(mongoose, db);
    require("./project/server/services/recipe.service.server.js")(app, userProjModel, recipeModel);

    var newsModel = require("./project/server/models/news.model.js")(mongoose, db);
    require("./project/server/services/news.service.server.js")(app, userProjModel, newsModel);

    var eventModel = require("./project/server/models/event.model.js")(mongoose, db);
    require("./project/server/services/event.service.server.js")(app, userProjModel, eventModel);

};