/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("EventDetailsController", EventDetailsController);

    function EventDetailsController(EventService, $routeParams) {

        var vm = this;

        EventService.findEventById($routeParams.eventId,function (data) {
            console.log("in event Id search");
            console.log($routeParams.eventId);
            vm.eventData = data;

            console.log(vm.eventData);

        });
    };
})();