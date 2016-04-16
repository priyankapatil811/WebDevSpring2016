/**
 * Created by Priyanka on 4/7/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("AccountController",AccountController);

    function AccountController(UserService,RecipeService,SpaceService,EventService)
    {
        var vm = this;
        vm.myRecipes = [];
        vm.myNews = [];
        vm.myEvents = [];
        vm.user = "";
        vm.users = [];
        vm.visible = true;

        vm.init = init;

        vm.getSavedRecipeBoards = getSavedRecipeBoards;
        vm.removeRecipe = removeRecipe;

        vm.getSavedNewsBoards = getSavedNewsBoards;
        vm.removeNews = removeNews;

        vm.getSavedEventBoards = getSavedEventBoards;
        vm.removeEvent = removeEvent;

        vm.findFollowers = findFollowers;
        vm.findFollowing = findFollowing;

        init();

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                    UserService.findUserById(response.data._id)
                        .then(function (response) {
                            if (response.data) {
                                vm.user = response.data;
                                vm.userProfile = response.data;
                                findFollowers(vm.userProfile);
                                findFollowing(vm.userProfile);
                                getSavedRecipeBoards(vm.userProfile);
                                getSavedNewsBoards(vm.userProfile);
                                getSavedEventBoards(vm.userProfile);
                            }
                        });
                });
        }

        /******************************************************************************************/
        function removeRecipe(recipe)
        {
            RecipeService.deleteRecipeById(recipe._id,vm.user._id).then(
                function(response)
                {
                    if(response.data)
                    {
                        getSavedRecipeBoards(response.data);
                    }
                });
        }

        function getSavedRecipeBoards(user)
        {
            RecipeService.findRecipesForUser(user._id).then(
                function(response)
                {
                    vm.myRecipes = response.data;
                }
            );
        }
        /******************************************************************************************/

        /******************************************************************************************/
        function removeNews(news)
        {
            SpaceService.deleteNewsById(news._id,vm.user._id).then(
                function(response)
                {
                    if(response.data)
                    {
                        getSavedNewsBoards(response.data);
                    }
                });
        }

        function getSavedNewsBoards(user)
        {
            SpaceService.findNewsForUser(user._id).then(
              function(response)
              {
                  vm.myNews = response.data;
              }
            );
        }
        /******************************************************************************************/

        /******************************************************************************************/
        function removeEvent(event)
        {
            EventService.deleteEventById(event._id,vm.user._id).then(
                function(response)
                {
                    if(response.data)
                    {
                        getSavedEventBoards(response.data);
                    }
                });
        }

        function getSavedEventBoards(user)
        {
            EventService.findEventsForUser(user._id).then(
                function(response)
                {
                   vm.myEvents = response.data;
                }
            );

        }
        /******************************************************************************************/

        /******************************************************************************************/
        function findFollowers(user)
        {
            UserService.findUserFollowers(user._id).then(
                function(response){
                    if(response.data)
                    {
                        console.log(response.data);
                        vm.followers = response.data;
                    }
                });
        }

        function findFollowing(user)
        {
            UserService.findUserFollowing(user._id).then(
                function(response)
                {
                    if(response.data)
                    {
                        console.log(response.data);
                        vm.following = response.data;
                    }
                });
        }
        /******************************************************************************************/
    }
})();