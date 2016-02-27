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
        $scope.user = {
            _id: $rootScope.currentuser._id,
            username : $rootScope.currentuser.username,
            password : $rootScope.currentuser.password,
            firstName : $rootScope.currentuser.firstName,
            lastName : $rootScope.currentuser.lastName,
            email : $rootScope.currentuser.email,
            roles : $rootScope.currentuser.roles
        };

        $scope.update = function(user)
        {
            console.log("in update");
            UserService.updateUser(user._id, user,
                function (response) {
                    $rootScope.currentuser = response;
                    $location.url("/profile");
                });
        };
    };

})();