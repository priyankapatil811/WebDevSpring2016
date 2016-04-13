/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location,UserService)
    {
        var vm = this;

        vm.$location = $location;
        vm.logout = logout;

        function logout()
        {
            console.log("in logout");
            UserService.logout().then(
                function (response) {
                    console.log(response);
                    UserService.setCurrentUser(null);
                });

        }
    }
})();