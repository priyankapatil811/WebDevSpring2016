/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope, $location, $rootScope)
    {
        $scope.$location = $location;

        $scope.adminrole = function ()
        {
             if($rootScope.currentuser.roles != null)
             {
                 var userroles = $rootScope.currentuser.roles;

                 for (var i = 0; i < userroles.length; i++) {
                     if (userroles[i] == "admin")
                         return true;
                 }
             }
             return false;
        }
    }
})();