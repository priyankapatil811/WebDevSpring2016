/**
 * Created by Priyanka on 3/9/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("RecipeController", RecipeController);

    function RecipeController(RecipeService, $rootScope) {

        var vm = this;
        vm.recipeList = [];
        vm.recipeDetails = [];
        vm.searchRecipe = searchRecipe;
        vm.init = init;
        vm.addRecipe = addRecipe;
        vm.selectRecipe = selectRecipe;
        vm.updateRecipe = updateRecipe;
        vm.deleteRecipe = deleteRecipe;


        //$scope.searchRecipe = function (r) {
        function searchRecipe(r)
        {
            RecipeService.findAllRecipes(r.recipe).then(function (response) {

                vm.recipeDetails = [];
                console.log("in recipe search");
                console.log(r.recipe);
                vm.recipeData = response.data;

                console.log(vm.recipeData);

                for(var i=0;i<vm.recipeData.matches.length;i++)
                {
                    var recipeObj = new Object();
                    recipeObj.id = vm.recipeData.matches[i].id;
                    recipeObj.title = vm.recipeData.matches[i].recipeName;
                    recipeObj.image = vm.recipeData.matches[i].smallImageUrls[0];
                    vm.recipeDetails.push(recipeObj);
                }
                console.log(vm.recipeDetails);
            });
        };

        /********** POC ************/

        function init()
        {
            RecipeService.findRecipes($rootScope.currentuser._id).then(
                function (response) {
                    vm.recipeList = response.data;
                });

            console.log(vm.recipeList);
        }

        if($rootScope.currentuser != null) {
            init();
        }

        function addRecipe()
        {
            RecipeService.createRecipe($rootScope.currentuser._id,vm.recipe).then(
                function(response){
                    init();
                });
        }

        function selectRecipe(index)
        {
            vm.recipeIndex = index;

            RecipeService.getRecipeByIndex(vm.recipeIndex,$rootScope.currentuser._id).then(
                function(response)
                {
                    vm.recipe = {
                        "_id" : response.data._id,
                        "title":response.data.title,
                        "url" :response.data.url,
                        "image":response.data.image,
                        "userId": response.data.userId
                    };
                });
/*
            RecipeService.getRecipeIdByIndex(recipeIndex).then(
                function(response)
                {
                    vm.recipeId = response;
                });

            console.log($scope.recipeId); */
        }


        function updateRecipe()
        {
            console.log("in update Recipe" + vm.recipe._id);

            RecipeService.updateRecipeById(vm.recipe._id,vm.recipe).then(
                function(response){
                    init();
                });

        }

        function deleteRecipe(index)
        {
            var recipeIndex = index;

            //function call return formId
         /*   RecipeService.getRecipeIdByIndex(recipeIndex).then(
                function(response)
                {
                    $scope.recipeId = response;
                });
                */

        //    RecipeService.deleteRecipeById($scope.recipeId).then(
            RecipeService.deleteRecipeById(recipeIndex,$rootScope.currentuser._id).then(
                function(response){
                    init();
                });

          //  console.log($scope.recipeList);
        }

        /***************************/
    }
})();