/**
 * Created by Priyanka on 3/9/16.
 */
(function(){
    "use strict";
    angular
        .module("infoPinStrap")
        .factory("RecipeService",RecipeService);

    function RecipeService($http, $rootScope)
    {
        /********** POC ************/
        var recipes = [
            {"_id":123,
                "title":"Red Velvet Cheesecake",
                "url" :"www.recipes.com",
                "image":"img1.jpeg",
                "userId":123},

            {"_id":456,
                "title":"Mac & Cheese",
                "url" :"www.allrecipes.com",
                "image":"img2.jpeg",
                "userId":234},

            {"_id":345,
                "title":"French Fries",
                "url" :"www.allrecipes.com",
                "image":"img3.jpeg",
                "userId":123}
        ];
        /***************************/

        var apiId = "5b171984";
        var apiKey = "9f46fd1c44408240f0b10f3fbc39dca3";
        var url = "";

        var api =
        {
            findAllRecipes : findAllRecipes,
            findRecipeById : findRecipeById,

            /********** POC ************/
            createRecipe : createRecipe,
            findRecipes : findRecipes,
            deleteRecipeById : deleteRecipeById,
            updateRecipeById : updateRecipeById,
            getRecipeIdByIndex : getRecipeIdByIndex,
            getRecipeByIndex : getRecipeByIndex
            /***************************/
        };

        return api;

        function findAllRecipes(recipe,callback) {
            url = "http://api.yummly.com/v1/api/recipes?_app_id="+apiId+"&_app_key="+apiKey+"&q="+recipe+"&requirePictures=true" +
                "&dataType=json";

            $http.get(url).success(callback);
        }


        function findRecipeById(recipeId,callback)
        {
            url = "http://api.yummly.com/v1/api/recipe/"+recipeId+"?_app_id="+apiId+"&_app_key="+apiKey+
                "&dataType=json";

            $http.get(url).success(callback);
        }

        /********** POC ************/
        function getRecipeIdByIndex(index,callback)
        {
            callback(recipes[index]._id);
        }

        function getRecipeByIndex(index,callback)
        {
            callback(recipes[index]);
        }

        function createRecipe(userId,recipe,callback)
        {
            var newRecipe =
            {
                _id : Math.floor((Math.random() * 1000) + 1),
                //_id : (new Date).getTime(),
                "title":recipe.title,
                "url" :recipe.url,
                "image":recipe.image,
                "userId" : userId
            };

            recipes.push(newRecipe);
            //   console.log(curRecipes);

            findRecipes($rootScope.currentuser._id,callback);
        }

        function findRecipes(userId,callback)
        {
            var recipesForUserId = [];
            for(var i=0;i<recipes.length;i++)
            {
                if(userId==recipes[i].userId)
                {
                    recipesForUserId.push(recipes[i]);
                }
            }

            callback(recipesForUserId);
        }

        function deleteRecipeById(recipeId, callback)
        {
            console.log(recipeId);

            recipes = recipes.filter(function(rId){
                return rId._id != recipeId;
            });

            console.log(recipes);

            findRecipes($rootScope.currentuser._id,callback);
        }

        function updateRecipeById(recipeId, newRecipe, callback)
        {
            var index;
            for(var i=0;i<recipes.length;i++) {
                if (recipeId == recipes[i]._id) {
                    index = i;
                    break;
                }
            }

            recipes[index] =
            {
                "title":newRecipe.title,
                "url" :newRecipe.url,
                "image":newRecipe.image,
                "userId":$rootScope.currentuser._id
            };

            console.log(recipes[index]);

            findRecipes($rootScope.currentuser._id,callback);
        }
        /***************************/

    }
})();