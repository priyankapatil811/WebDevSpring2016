/**
 * Created by Priyanka on 3/9/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("RecipeController", RecipeController);

    function RecipeController($scope, RecipeService, $rootScope, UserService) {

        $scope.searchRecipe = function (r) {

            RecipeService.findAllRecipes(r.recipe, function (data) {
                console.log("in recipe search");
                console.log(r.recipe);
                $scope.recipeData = data;
                $scope.recipeDetails = [];

                console.log($scope.recipeData);

                for(var i=0;i<$scope.recipeData.matches.length;i++)
                {
                    var recipeObj = new Object();
                    recipeObj.id = $scope.recipeData.matches[i].id;
                    recipeObj.title = $scope.recipeData.matches[i].recipeName;
                    recipeObj.image = $scope.recipeData.matches[i].smallImageUrls[0];
                    $scope.recipeDetails.push(recipeObj);
                }
                console.log($scope.recipeDetails);
            });
        };

        /********** POC ************/
        if($rootScope.currentuser != null) {
            RecipeService.findRecipes($rootScope.currentuser._id,
                function (response) {
                    $scope.recipeList = response;
                });

            console.log($scope.recipeList);
        }

        $scope.addRecipe = function()
        {
            RecipeService.createRecipe($rootScope.currentuser._id,
                $scope.recipe,
                function(response){
                    $scope.recipeList = response;
                });

            console.log($scope.recipeList);
        };

        $scope.selectRecipe = function(index)
        {
            var recipeIndex = index;

            RecipeService.getRecipeByIndex(recipeIndex,
                function(response)
                {
                    $scope.recipe = {
                        "title":response.title,
                        "url" :response.url,
                        "image":response.image
                    };
                });

            RecipeService.getRecipeIdByIndex(recipeIndex,
                function(response)
                {
                    $scope.recipeId = response;
                });

            console.log($scope.recipeId);
        }


        $scope.updateRecipe = function()
        {
            console.log("in update Recipe" + $scope.recipeId);

            RecipeService.updateRecipeById($scope.recipeId,$scope.recipe,
                function(response){
                    $scope.recipeList = response;
                });

            console.log($scope.recipeList);
        };

        $scope.deleteRecipe = function(index)
        {
            var recipeIndex = index;

            //function call return formId
            RecipeService.getRecipeIdByIndex(recipeIndex,
                function(response)
                {
                    $scope.recipeId = response;
                });

            RecipeService.deleteRecipeById($scope.recipeId,
                function(response){
                    $scope.recipeList = response;
                });

            console.log($scope.recipeList);
        }

        /***************************/
    }
})();