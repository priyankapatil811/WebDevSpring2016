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
        vm.update = update;
        vm.user = {};

        UserService.getCurrentUser().then(
            function(response)
            {
                console.log(response.data);
                vm.user = response.data;
            }
        );

        function update(user)
        {
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }

})();