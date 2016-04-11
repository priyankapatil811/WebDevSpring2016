/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location, $rootScope)
    {
        console.log("in login controller");

        var vm = this;

        vm.login = login;

        function login()
        {
            console.log("in login");
            UserService.findUserByCredentials(vm.user.username,vm.user.password)
                .then( function (response) {
                    if(response.data == null)
                    {
                        console.log("Please register!");
                        alert("Please register! User does not exist!");
                    }
                    else
                    {
                        UserService.setCurrentUser(response.data);
                        UserService.setSelectedCategory(response.data.interests[0]);
                        $location.url('/profile');
                    }
                });
        };
    }
})();