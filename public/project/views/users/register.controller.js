/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope, $rootScope, UserService, $location)
    {
        $scope.register = function ()
        {
            //console.log("in register");
            if($scope.user.password == $scope.user.verpwd)
            {
                UserService.createUser($scope.user,
                    function (response) {
                        $rootScope.currentuser = response;
                        $scope.visibility = true;
                        $location.url('/profile');
                    });
            }
        };
    };
})();