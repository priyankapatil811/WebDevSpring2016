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
            //getRecipeIdByIndex : getRecipeIdByIndex,
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
      /*  function getRecipeIdByIndex(index,callback)
        {
            callback(recipes[index]._id);
        }
       */

        function getRecipeByIndex(index,userId)
        {
            return $http.get("/api/project/recipe/"+index+"/user/"+userId);
        }

        function createRecipe(userId,recipe)
        {
           return $http.post("/api/project/user/"+userId+"/recipe",recipe);
        }

        function findRecipes(userId)
        {
            return $http.get("/api/project/user/"+userId+"/recipe");
        }

        function deleteRecipeById(recipeId,userId)
        {
            return $http.delete("/api/project/recipe/"+recipeId+"/user/"+userId);
        }

        function updateRecipeById(recipeId, newRecipe)
        {
            return $http.put("/api/project/recipe/"+recipeId,newRecipe);
        }
        /***************************/

    }
})();