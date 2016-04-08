/**
 * Created by Priyanka on 4/7/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("AccountController",AccountController);

    function AccountController(UserService,$rootScope,RecipeService,SpaceService)
    {
        var vm = this;
        vm.myRecipes = [];
        vm.myNews = [];

        vm.init = init;
        vm.getSavedRecipes = getSavedRecipes;
        var user = "";

        init();

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                    user = response.data;
                });

            console.log(user._id);

            UserService.findUserById($rootScope.currentuser._id)
                .then(function (response) {
                    if (response.data) {
                        vm.userProfile = response.data;
                        getSavedRecipes(vm.userProfile);
                    }
                });
        }

        function getSavedRecipes(user)
        {
            if(user.likesRecipe.length > 0) {
                for (var i = 0; i < user.likesRecipe.length; i++) {
                    RecipeService.findRecipeByIdForUser(user.likesRecipe[i]).then(
                        function (response) {
                            if (response.data) {
                                vm.myRecipes.push(response.data);

                            }

                        });
                }
            }

            if(user.likesArticle.length > 0)
            {
                for(var i = 0;i < user.likesArticle.length; i++)
                {
                    SpaceService.findNewsByIdForUser(user.likesArticle[i]).then(
                      function (response)
                      {
                          if (response.data)
                          {
                              vm.myNews.push(response.data);
                              console.log(vm.myNews);
                          }
                      });
                }
            }
        }

    }
})();