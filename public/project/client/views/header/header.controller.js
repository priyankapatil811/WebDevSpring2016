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

        vm.$location = $location;
        vm.placeholder = 'city for events';
        vm.logout = logout;
        vm.home = home;
        vm.categoryClicked = categoryClicked;
        vm.search = search;

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
            if(category == 'event')
            {
                vm.placeholder = 'city for events';
                $rootScope.selectedCategory = category;
            }
            else if(category == 'recipe')
            {
                vm.placeholder = 'cooking recipes';
                $rootScope.selectedCategory = category;
            }
            else
            {
                vm.placeholder = 'news in space science';
                $rootScope.selectedCategory = category;
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