/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $rootScope, UserService, $location)
    {
        $scope.login = function ()
        {
            console.log("in login");
            UserService.findUserByCredentials($scope.user.username,$scope.user.password)
                .then( function (response) {
                    console.log(response.data);
                    if(response.data == null)
                    {
                        console.log("Please register!");
                        alert("Please register! User does not exist!");
                    }
                    else
                    {
                        //$rootScope.currentuser = response;
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile');
                    }
                });
        };
    }
})();