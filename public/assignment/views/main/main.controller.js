/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("MainController",MainController);

    function MainController($scope,$location)
    {
        $scope.$location = $location;
    }
})();