/**
 * Created by Priyanka on 3/9/16.
 */
(function(){
    "use strict";
    angular
        .module("infoPinStrap")
        .factory("RecipeService",RecipeService);


    function RecipeService($http) {
        var apiId = "5b171984";
        var apiKey = "9f46fd1c44408240f0b10f3fbc39dca3";
        var url = "";

        var api =
        {
            findAllRecipes: findAllRecipes,
            findRecipeById: findRecipeById,
            findRecipesForUser: findRecipesForUser,
            createRecipe: createRecipe,
            deleteRecipeById: deleteRecipeById,
            addComment: addComment,
            deleteComment: deleteComment,
            findRecipe: findRecipe
        };

        return api;

        function findAllRecipes(recipe) {

            url = "http://api.yummly.com/v1/api/recipes?_app_id=" + apiId + "&_app_key="
                + apiKey + "&q=" + recipe + "&requirePictures=true&maxResult=100" +
                "&dataType=json";

            return $http.get(url);
        }

        function findRecipeById(recipeId) {
            url = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + apiId + "&_app_key=" + apiKey +
                "&dataType=json";

            return $http.get(url);
        }

        function createRecipe(userId, recipe) {
            return $http.post("/api/project/user/" + userId + "/recipe", recipe);
        }

        function findRecipesForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/recipe");
        }

        function deleteRecipeById(recipeId, userId) {
            return $http.delete("/api/project/recipe/" + recipeId + "/user/" + userId);
        }

        function addComment(recipe, userId, comment) {
            return $http.post("/api/project/recipe/user/" + userId + "?comment=" + comment, recipe);
        }

        function deleteComment(recipeId, comment) {
            return $http.delete("/api/project/recipe/"+recipeId+"/user/"+comment.user+"/comment/"+comment.comment);
        }

        function findRecipe(recipeId)
        {
            return $http.get("/api/project/recipe/"+recipeId);
        }
    }
})();
