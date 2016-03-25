/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("RecipeDetailsController", RecipeDetailsController);

    function RecipeDetailsController(RecipeService, $routeParams) {

        var vm = this;

         RecipeService.findRecipeById($routeParams.recipeId).then(function (response) {
                console.log("in recipe Id search");
                console.log($routeParams.recipeId);
                vm.recipeData = response.data;

                console.log(vm.recipeData);
            });
        };
})();