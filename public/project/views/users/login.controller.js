/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("LoginController",LoginController);

    function LoginController($scope, $rootScope, UserService, $location)
    {
        $scope.login = function ()
        {
            console.log("in login");
            UserService.findUserByCredentials($scope.user.username,$scope.user.password,
                function (response) {
                    console.log(response);
                    if(response == "-1")
                    {
                        console.log("Please register!");
                        alert("Please register! User does not exist!");
                    }
                    else
                    {
                        $rootScope.currentuser = response;
                        $location.url('/profile');
                    }
                });
        };
    };
})();