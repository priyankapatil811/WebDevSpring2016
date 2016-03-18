/**
 * Created by Priyanka on 2/20/16.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope, UserService, $location)
    {
        var vm = this;
        vm.update = update;

        vm.user = {
            _id: $rootScope.currentuser._id,
            username : $rootScope.currentuser.username,
            password : $rootScope.currentuser.password,
            firstName : $rootScope.currentuser.firstName,
            lastName : $rootScope.currentuser.lastName,
            email : $rootScope.currentuser.email,
            roles : $rootScope.currentuser.roles
        };

        function update(user)
        {
            console.log("in update");
            console.log(user);
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        };
    };

})();