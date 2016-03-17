/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope, $rootScope, UserService, $location)
    {
        $scope.register = function ()
        {
            console.log("in register");
            if($scope.user.password == $scope.user.verpwd)
            {
                UserService.createUser($scope.user).
                    then(function (response) {
                        console.log(response);
                        $rootScope.currentuser = response.data;
                        console.log($rootScope.currentuser);
                        $scope.visibility = true;
                        $location.url('/profile');
                    });
            }
        };
    };
})();