/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("MainController",MainController);

    function MainController($location)
    {
        var vm = this;
        vm.$location = $location;
    }
})();