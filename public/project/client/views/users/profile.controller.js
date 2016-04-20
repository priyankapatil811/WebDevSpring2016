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
        vm.updatePwd = updatePwd;
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
            for(var i=0;i<interests.length;i++) {
                if (interests[i] === 'Events')
                    vm.event = 'Events';
                else
                if (interests[i] === 'Cooking Recipes')
                    vm.recipe = 'Cooking Recipes';
                else
                if (interests[i] === 'Space Exploration')
                    vm.news = 'Space Exploration';
            }
        }

        function updatePwd(user)
        {
            UserService.updatePwd(user).then(
              function(response)
              {
                  console.log(response.data);
                  //vm.user = response.data;
              }
            );
        }
    }

})();