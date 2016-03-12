/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("EventDetailsController", EventDetailsController);

    function EventDetailsController($scope, EventService, $routeParams, $rootScope, UserService) {

        EventService.findEventById($routeParams.eventId, function (data) {
            console.log("in event Id search");
            console.log($routeParams.eventId);
            $scope.eventData = data;

            console.log($scope.eventData);

        });
    };
})();