/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location)
    {
        var vm = this;
        vm.login = login;

        function login()
        {
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
                        $location.url('/profile');
                    }
                });
        };
    }
})();