/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("HeaderController",HeaderController);

    function HeaderController($location,UserService,$rootScope,EventService,RecipeService,SpaceService)
    {
        var vm = this;
        vm.usersList = [];

        vm.$location = $location;
        vm.placeholder = 'city for events';
        vm.logout = logout;
        vm.home = home;
        vm.categoryClicked = categoryClicked;
        vm.search = search;

        vm.complete = complete;
        vm.init = init;

        function complete(){
            $("#users").autocomplete({
                source: vm.usersList
            });
        }

        init();

        function init() {
            UserService.findAllUsers().then(
                function (response) {
                    vm.users = response.data;

                    for (var i = 0; i < vm.users.length; i++) {
                        vm.usersList.push(vm.users[i].username);
                    }
                }
            );
        }

        function search(category)
        {
            if (category == 'city for events')
                EventService.setSearchKeyword(vm.query);
            else if (category == 'cooking recipes')
                RecipeService.setSearchKeyword(vm.query);
            else
                SpaceService.setSearchKeyword(vm.query);
        }

        function categoryClicked(category)
        {
            if(category == 'event' || category == 'Events')
            {
                vm.placeholder = 'city for events';
                $rootScope.selectedCategory = 'event';
            }
            else if(category == 'recipe' || category == 'Cooking Recipes')
            {
                vm.placeholder = 'cooking recipes';
                $rootScope.selectedCategory = 'recipe';
            }
            else
            {
                vm.placeholder = 'news in space science';
                $rootScope.selectedCategory = 'news';
            }

            console.log($rootScope.selectedCategory);
        }

        function home()
        {
            $location.url('/home');
        }

        function logout()
        {
            console.log("in logout");
            UserService.logout().then(
            function (response) {
                console.log(response);
                $rootScope.currentuser = null;
            });

        }
    }
})();