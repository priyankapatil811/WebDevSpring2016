/**
 * Created by Priyanka on 3/24/16.
 */

var q = require("q");

module.exports = function(mongoose) {

    //load recipe schema
    var RecipeSchema = require("./recipe.schema.server.js")(mongoose);

    //create recipe model from schema
    var RecipeModel = mongoose.model('ProjRecipe', RecipeSchema);

    var api =
    {
        likesRecipe: likesRecipe,
        findAllRecipesForUser : findAllRecipesForUser,
        findRecipeByIdForUser : findRecipeByIdForUser,
        deleteRecipeById : deleteRecipeById,
        addComment : addComment,
        deleteComment : deleteComment,
        findRecipeById : findRecipeById
    };

    return api;

    function likesRecipe(userId,recipe)
    {
        var deferred = q.defer();

        RecipeModel.findOne({recipeId : recipe.id}, function(err,doc)
        {
            if(err)
                deferred.reject(err);

            //if recipe exists
            if(doc)
            {
                doc.users.push(userId);

                doc.save(function(err,doc)
                {
                    if(err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }
            else {
                //create recipe as it does not exist
                newRecipe = new RecipeModel(
                    {
                        recipeId: recipe.id,
                        title: recipe.title,
                        image: recipe.image,
                        source: recipe.source,
                        users: [],
                        comments : []
                    });

                newRecipe.users.push(userId);

                newRecipe.save(function (err, doc) {
                    if (err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }
        });

        return deferred.promise;
    }

    function findAllRecipesForUser(recipeIds)
    {
        var deferred = q.defer();

        RecipeModel.find({
            _id: {$in: recipeIds}
        },
            function (err, users)
            {
                if (err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(users);
                }
            });

        return deferred.promise;

    }

    function findRecipeByIdForUser(recipeId)
    {
        var deferred = q.defer();

        RecipeModel.findById(recipeId,function (err, doc) {
            if (err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteRecipeById(recipeId, userId) {

        var deferred = q.defer();

        RecipeModel.findById(recipeId,function (err, recipe) {
            if (err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<recipe.users.length;i++)
                {
                    if(userId == recipe.users[i])
                    {
                        recipe.users.splice(i,1);
                        break;
                    }
                }

                recipe.save(function(err,doc)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function addComment(recipe,user,comment)
    {
        var deferred = q.defer();

        RecipeModel.findOne({recipeId : recipe.id},function(err,doc)
        {
            if(err)
               deferred.reject(err);

            if(doc)
            {
                console.log(comment);
                console.log(user);

                doc.comments.push({user : user, comment: comment, timePosted: new Date()});

                doc.save(function(err,doc)
                {
                   if(err)
                        deferred.reject(err);
                   else
                        deferred.resolve(doc);
                });
            }
            else
            {
                //create recipe as it does not exist
                newRecipe = new RecipeModel(
                    {
                        recipeId: recipe.id,
                        title: recipe.name,
                        image: recipe.images[0].hostedLargeUrl,
                        source: recipe.sourceDisplayName,
                        users: [],
                        comments : []
                    });

                newRecipe.comments.push({user : user, comment:comment, timePosted: new Date()});

                newRecipe.save(function (err, doc) {
                    if (err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }
        });

        return deferred.promise;
    }

    function findRecipeById(recipeId)
    {
        var deferred = q.defer();

        RecipeModel.findOne({recipeId : recipeId},function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteComment(recipeId,user,comment)
    {
        var deferred = q.defer();

        RecipeModel.findOne({recipeId : recipeId},function(err,recipe)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else {
                console.log(recipe.comments);

                for (var i = 0; i < recipe.comments.length; i++) {
                    if ((user == recipe.comments[i].user) && (comment == recipe.comments[i].comment)) {
                        recipe.comments.splice(i, 1);
                        break;
                    }
                }

                recipe.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }
};
