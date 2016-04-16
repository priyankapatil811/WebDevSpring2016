/**
 * Created by Priyanka on 4/12/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("UserProfileController",UserProfileController);

    function UserProfileController($routeParams,UserService,RecipeService,SpaceService,EventService)
    {
        console.log($routeParams.username);

        var vm = this;
        vm.myRecipes = [];
        vm.myNews = [];
        vm.myEvents = [];

        vm.userParam = $routeParams.username;
        vm.user = "";
        vm.loggedInUser = "";
        vm.users = [];
        vm.followers = [];
        vm.following = [];


        vm.init = init;

        vm.getSavedRecipeBoards = getSavedRecipeBoards;
        vm.getSavedNewsBoards = getSavedNewsBoards;
        vm.getSavedEventBoards = getSavedEventBoards;
        vm.followUser = followUser;

        init();

        function init() {

            UserService.getCurrentUser()
                .then(function (response) {
                    UserService.findUserById(response.data._id)
                        .then(function (response) {
                            if (response.data) {
                                vm.loggedInUser = response.data;
                            }
                        });
                });


            UserService.findUserByUsername(vm.userParam)
                .then(function (response) {
                    if (response.data) {
                        vm.user = response.data;
                        findFollowers(vm.user);
                        findFollowing(vm.user);
                        getSavedRecipeBoards(vm.user);
                        getSavedNewsBoards(vm.user);
                        getSavedEventBoards(vm.user);
                    }
                });
        }

        /******************************************************************************************/
        function followUser()
        {
            console.log("user profile : " +vm.user._id + " loggedIn User : " +vm.loggedInUser._id);
            UserService.followUser(vm.user._id,vm.loggedInUser._id).then(
                function(response){
                    if(response.data)
                    {
                        console.log(response.data);
                        findFollowers(vm.user);
                        findFollowing(vm.user);
                    }
                }
            );
        }

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

        /******************************************************************************************/
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
        function getSavedEventBoards(user)
        {
            EventService.findEventsForUser(user._id).then(
                function(response)
                {
                    vm.myEvents = response.data;
                }
            );

        }
    }
})();