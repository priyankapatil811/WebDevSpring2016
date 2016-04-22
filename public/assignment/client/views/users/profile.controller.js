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
        vm.user = {};

        vm.update = update;
        vm.init = init;

        init();

        function init() {

            UserService.getCurrentUser().then(
                function (response) {
                    if (response.data) {
                        vm.user._id = response.data._id;
                        vm.user.username = response.data.username;
                        vm.user.firstName = response.data.firstName;
                        vm.user.lastName = response.data.lastName;
                        vm.user.emails = response.data.emails;
                        vm.user.phones = response.data.phones;
                        vm.user.roles = response.data.roles;
                    }
                }
            );
        }

        console.log($rootScope.currentuser);

        function update()
        {
            console.log(vm.user.password);
            var user = {};
            console.log("in update");

            if(!angular.isUndefined(vm.user.password))
            {
                user = vm.user;
            }
            else {
                user =
                    {
                        _id : vm.user._id,
                        username : vm.user.username,
                        firstName : vm.user.firstName,
                        lastName : vm.user.lastName,
                        emails : vm.user.emails,
                        phones : vm.user.phones,
                        roles : vm.user.roles
                    }
            }
            console.log(user);

            UserService.updateUser(user._id, user)
                .then(function (response) {
                    if(response.data) {
                        console.log("response : " + response.data);
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();