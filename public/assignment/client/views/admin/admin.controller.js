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

        console.log(vm.sortReverse);
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
                function(response)
                {
                    if(response.data)
                    {
                        init();
                    }
                }
            );
        }

        function selectUser(index)
        {
            vm.user = {
                _id : vm.users[index]._id,
                username : vm.users[index].username,
                password : vm.users[index].password,
                firstName : vm.users[index].firstName,
                lastName : vm.users[index].lastName,
                roles : vm.users[index].roles
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