/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("RecipeDetailsController", RecipeDetailsController);

    function RecipeDetailsController(RecipeService, $routeParams, UserService) {

        var vm = this;
        vm.user = {};
        vm.comments = [];
        vm.recipeIdParam = $routeParams.recipeId;

        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.init = init;
        vm.getDetails = getDetails;

        init();

        function getDetails()
        {
            RecipeService.findRecipe(vm.recipeIdParam).then(
                function (response)
                {
                    if(response.data)
                    {
                        console.log(response.data.comments);
                        vm.comments = response.data.comments;
                    }
                }
            );
        }

        function init() {
             RecipeService.findRecipeById(vm.recipeIdParam).then(function (response) {
                console.log("in recipe Id search");

                vm.recipeData = response.data;

                console.log(vm.recipeData);
            });

            UserService.getCurrentUser()
                .then(function (response) {
                    UserService.findUserById(response.data._id)
                        .then(function (response) {
                            if (response.data) {
                                vm.user = response.data;
                            }
                        });
                });

            getDetails();
        }

        function addComment(comment,recipe) {

            RecipeService.addComment(recipe,vm.user.username,comment).then(
                function (response) {
                    if(response.data)
                    {
                        getDetails();
                    }
                }
            );
        }

        function deleteComment(comment)
        {
            console.log(comment);
            RecipeService.deleteComment(vm.recipeIdParam,comment).then(
               function(response)
               {
                   if(response.data)
                   {
                       getDetails();
                   }
               }
            );
        }
    }

})();