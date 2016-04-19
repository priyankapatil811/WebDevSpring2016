/**
 * Created by Priyanka on 2/20/16.
 */
(function() {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService, $location)
    {
        var vm = this;
        vm.event = "";
        vm.recipe = "";
        vm.news = "";

        vm.update = update;
        vm.setInterests = setInterests;
        vm.user = {};

        UserService.getCurrentUser().then(
            function(response)
            {
                console.log(response.data);
                vm.user = response.data;
                setInterests(response.data.interests);
            }
        );

        function update(user)
        {
            user.interests = [];
            console.log(vm.event);
            console.log(vm.recipe);
            console.log(vm.news);

            if(vm.event != 'false')
                user.interests.push('Events');
            if(vm.recipe != 'false')
                user.interests.push('Cooking Recipes');
            if(vm.news != 'false')
                user.interests.push('Space Exploration');

            UserService.updateUser(user._id, user)
                .then(function (response) {
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                    setInterests(response.data.interests);
                    $location.url("/profile");
                });
        }

        function setInterests(interests)
        {
            console.log(interests);

            if(interests.indexOf('Events') >-1)
            {
                vm.event = 'Events';
            }
            if(interests.indexOf('Cooking Recipes') >-1)
            {
                vm.recipe = 'Cooking Recipes';
            }
            if(interests.indexOf('Space Exploration') >-1)
            {
                vm.news = 'Space Exploration';
            }

        }
    }

})();