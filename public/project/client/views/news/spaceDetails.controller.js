/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("SpaceDetailsController", SpaceDetailsController);

    function SpaceDetailsController(SpaceService, $routeParams) {

        var vm = this;

        SpaceService.findNewsById($routeParams.newsId,
                function (response) {
                    console.log("in news Id search");
                    console.log($routeParams.newsId);
                    vm.newsData = response;
                    console.log(vm.newsData);
            });
        }
})();