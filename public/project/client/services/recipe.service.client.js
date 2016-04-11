/**
 * Created by Priyanka on 3/9/16.
 */
(function(){
    "use strict";
    angular
        .module("infoPinStrap")
        .factory("RecipeService",RecipeService);

    function RecipeService($http)
    {
        var apiId = "5b171984";
        var apiKey = "9f46fd1c44408240f0b10f3fbc39dca3";
        var url = "";
        var searchKeyWord = "";

        var api =
        {
            findAllRecipes : findAllRecipes,
            findRecipeById : findRecipeById,

            /********** POC ************/
            setSearchKeyword : setSearchKeyword,
            getSearchKeyword : getSearchKeyword,
            findRecipeByIdForUser : findRecipeByIdForUser,
            createRecipe : createRecipe,
            findRecipes : findRecipes,
            deleteRecipeById : deleteRecipeById,
            updateRecipeById : updateRecipeById,
            getRecipeByIndex : getRecipeByIndex
            /***************************/
        };

        return api;

        function findAllRecipes(recipe) {

            url = "http://api.yummly.com/v1/api/recipes?_app_id="+apiId+"&_app_key="
                +apiKey+"&q="+recipe+"&requirePictures=true&maxResult=1000" +
                "&dataType=json";

            return $http.get(url);
        }


        function findRecipeById(recipeId)
        {
            url = "http://api.yummly.com/v1/api/recipe/"+recipeId+"?_app_id="+apiId+"&_app_key="+apiKey+
                "&dataType=json";

            return $http.get(url);
        }

        /********** POC ************/

        function setSearchKeyword(query)
        {
            searchKeyWord = query;
        }

        function getSearchKeyword()
        {
            return searchKeyWord;
        }

        function findRecipeByIdForUser(recipeId)
        {
            return $http.get("/api/project/recipe/"+recipeId);
        }

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