/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("RecipeDetailsController", RecipeDetailsController);

    function RecipeDetailsController($scope, RecipeService, $routeParams, $rootScope, UserService) {

        var vm = this;

         RecipeService.findRecipeById($routeParams.recipeId, function (data) {
                console.log("in recipe Id search");
                console.log($routeParams.recipeId);
                vm.recipeData = data;

                console.log(vm.recipeData);
            });
        };
})();