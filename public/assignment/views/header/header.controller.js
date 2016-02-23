/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,$rootScope)
    {
        $scope.$location = $location;
        //$scope.user.username = $rootScope.currentuser.username;

        $scope.logout = function ()
        {
            $rootScope.currentuser = null;
        }
    }
})();