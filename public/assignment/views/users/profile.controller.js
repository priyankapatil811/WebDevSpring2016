/**
 * Created by Priyanka on 2/20/16.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location)
    {
        $scope.update = function()
        {
            console.log("in update");
            UserService.updateUser($rootScope.newuser._id,$scope.user,
                function (response) {
                    $rootScope.newuser = response;
                    $location.url('/profile');
                });
            console.log($rootScope.user);
        };
    };
})();