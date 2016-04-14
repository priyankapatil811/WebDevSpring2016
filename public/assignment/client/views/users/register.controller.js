/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController(UserService, $location)
    {
        var vm = this;
        vm.register = register;

        function register()
        {
            if(vm.user.password == vm.user.verpwd)
            {
                UserService.createUser(vm.user).
                    then(function (response) {
                    if(response.data)
                    {
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile');
                    }
                    else
                    {
                        alert("User Already Registered!");
                    }
                    });
            }
        }
    }
})();