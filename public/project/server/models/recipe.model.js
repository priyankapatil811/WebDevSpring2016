/**
 * Created by Priyanka on 3/24/16.
 */
var recipes = require("./recipe.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
    var api =
    {
        getRecipeByIndex : getRecipeByIndex,
        createRecipeForUser : createRecipeForUser,
        findRecipes : findRecipes,
        deleteRecipeById : deleteRecipeById,
        updateRecipeById : updateRecipeById
    };

    return api;

    function getRecipeByIndex(index,userId) {
        var userRecipes = [];

        for (var i = 0; i < recipes.length; i++)
        {
            if(userId == recipes[i].userId)
            {
                userRecipes.push(recipes[i]);
            }
        }

        return userRecipes[index];
    }

    function createRecipeForUser(userId, recipe) {
        var newRecipe =
        {
            _id: uuid.v1(),
            //_id : (new Date).getTime(),
            "title": recipe.title,
            "url": recipe.url,
            "image": recipe.image,
            "userId": userId
        };

        recipes.push(newRecipe);
        //console.log(recipes);
    }

    function findRecipes(userId) {
        var recipesForUserId = [];
        for (var i = 0; i < recipes.length; i++) {
            if (userId == recipes[i].userId) {
                recipesForUserId.push(recipes[i]);
            }
        }

        return recipesForUserId;
    }

    function deleteRecipeById(recipeIndex, userId) {
        var userRecipes = [];

        for(var i=0;i<recipes.length;i++)
        {
            if(userId == recipes[i].userId)
            {
                userRecipes.push(recipes[i]);
            }
        }

        var recipeId = userRecipes[recipeIndex]._id;
        //console.log(recipeId);

        recipes = recipes.filter(function (rId) {
            return rId._id != recipeId;
        });

        //console.log(recipes);
    }

    function updateRecipeById(recipeId, newRecipe) {
        var index;
        var userId;

        for (var i = 0; i < recipes.length; i++) {
            if (recipeId == recipes[i]._id) {
                index = i;
                userId = recipes[i].userId;
                break;
            }
        }

        recipes[index] =
        {
            "_id" : recipeId,
            "title": newRecipe.title,
            "url": newRecipe.url,
            "image": newRecipe.image,
            "userId": userId
        };

        //console.log(recipes);
    }
};
