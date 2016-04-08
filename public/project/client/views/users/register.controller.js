/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("RegisterController",RegisterController);

    function RegisterController(UserService, $location)
    {
        var vm = this;
        vm.register = register;

        function register()
        {
            console.log(vm.user.category.event);
            console.log(vm.user.category.recipe);
            console.log(vm.user.category.news);

            if(vm.user.password == vm.user.verpwd)
            {
                UserService.createUser(vm.user).
                    then(function (response) {
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile');
                    });
            }
        };
    };
})();