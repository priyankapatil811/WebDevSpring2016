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

        vm.user = {};
        vm.users = [];
        vm.sortReverse = 'false';
        vm.sortType = 'username';

        vm.init = init;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;

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


        function addUser(user)
        {
            UserService.createUserByAdmin(user).then(
                  function(response)
                  {
                      if(response.data)
                      {
                          init();
                      }
                  }
            );
        }

        function deleteUser(user)
        {
            UserService.deleteUserByIdByAdmin(user._id).then(
                function (response) {
                    if (response.data) {
                        init();
                    }
                }
            );
        }

        function selectUser(user)
        {
            vm.user = {
                _id : user._id,
                username : user.username,
                password : user.password,
                firstName : user.firstName,
                lastName : user.lastName,
                roles : user.roles
            };
        }

        function updateUser(user)
        {
            UserService.updateUserByAdmin(user._id,user).then(
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