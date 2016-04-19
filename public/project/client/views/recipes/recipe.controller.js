/**
 * Created by Priyanka on 3/9/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("RecipeController", RecipeController);

    function RecipeController(RecipeService, UserService) {

        var vm = this;
        vm.showSpinner = false;
        vm.showError = false;
        vm.recipeList = [];
        vm.recipeDetails = [];
        vm.searchRecipe = searchRecipe;
        vm.addRecipe = addRecipe;

        var user = "";

        UserService
            .getCurrentUser()
            .then(function(response) {
                user = response.data;
            });

        function searchRecipe(r)
        {
            if(!vm.r)
            {
                vm.showSpinner = false;
                alert("Please enter a dish name to search for its recipe");
            }
            else {
                vm.showSpinner = true;
                RecipeService.findAllRecipes(r.recipe).then(function (response) {

                    vm.recipeDetails = [];
                    console.log("in recipe search");
                    console.log(r.recipe);
                    vm.recipeData = response.data;

                    console.log(vm.recipeData);
                    console.log(vm.recipeData.matches.length);

                    if(vm.recipeData.matches.length < 1)
                    {
                        vm.showSpinner = false;
                        vm.showError = true;
                    }
                    else {

                        if (vm.recipeData.matches.length < 100)
                            vm.showSpinner = false;

                        for (var i = 0; i < vm.recipeData.matches.length; i++) {
                            var recipeObj = new Object();
                            recipeObj.id = vm.recipeData.matches[i].id;
                            recipeObj.title = vm.recipeData.matches[i].recipeName;
                            if (vm.recipeData.matches[i].smallImageUrls)
                                recipeObj.image = vm.recipeData.matches[i].smallImageUrls[0];
                            else
                                recipeObj.image = "images/NoImage.png";
                            recipeObj.source = vm.recipeData.matches[i].sourceDisplayName;
                            recipeObj.color = 'crimson';
                            vm.recipeDetails.push(recipeObj);
                        }
                        console.log(vm.recipeDetails);
                        vm.showSpinner = false;
                    }
                });
            }
        }

        function addRecipe(recipe) {
            RecipeService.createRecipe(user._id, recipe).then(
                function (response) {
                    console.log(response.data);
                    recipe.color = 'green';
                });
        }
    }
})();