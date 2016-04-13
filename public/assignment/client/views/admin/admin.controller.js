/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService)
    {
        var vm = this;

        vm.users = [];

        vm.init = init;
        vm.deleteUser = deleteUser;

        init();

        function init()
        {
            UserService.findUsersByAdmin().then(
                function(response)
                {
                    if(response.data)
                    {
                        vm.users = response.data;
                        console.log(response.data);
                    }
                }
            );
        }

        function deleteUser(user)
        {
            UserService.deleteUserByIdByAdmin(user._id).then(
                function(response)
                {
                    if(response.data)
                    {
                        init();
                    }
                }
            );
        }
    }
})();