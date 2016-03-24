/**
 * Created by Priyanka on 3/8/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("EventController", EventController);

    function EventController($scope, EventService, $rootScope, UserService) {

        var vm = this;
        vm.eventDetails = [];
        vm.where = "";
        vm.getGeoLoc = getGeoLoc;
        vm.searchLocation = searchLocation;
        vm.showError = showError;
        vm.showPosition = showPosition;
        vm.search = search;

        getGeoLoc();

       // $scope.where = "";
      //  $scope.getGeoLoc = function ()
        function getGeoLoc()
        {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }
            else {
                vm.error = "Geolocation is not supported by this browser";
            }
        };

      //   $scope.searchLocation = function (e)
        function searchLocation(e)
         {
                console.log("in location search");
                EventService.findEventByLocation(e.city, function (mapData) {
                    if (mapData.results.length != 0) {
                        vm.where = mapData.results[0].geometry.location.lat + "," + mapData.results[0].geometry.location.lng;
                    }
                    else {
                        vm.error = "Could not find entered location";
                        vm.showErr = true;
                    }
                    search(vm.where);
                    console.log(vm.where);
                });

         };

        //$scope.showPosition = function (position) {
        function showPosition(position)
        {
            console.log("in show position");
            vm.where = position.coords.latitude + "," + position.coords.longitude;
            search(vm.where);
            $scope.$apply();
        };

        //$scope.showError = function (error) {
        function showError()
        {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    error = "An unknown error occurred."
                    break;
            }
        };

       // $scope.search = function (where) {
        function search(where)
        {
            EventService.findAllEvents(where, function (data) {
                console.log("in search!");
                vm.eventData = data;

                for (var j = 0; j < vm.eventData.events.event.length; j++) {
                    var eventObj = new Object();
                    eventObj.id = vm.eventData.events.event[j].id;
                    eventObj.url = vm.eventData.events.event[j].url;
                    eventObj.title = vm.eventData.events.event[j].title;
                    eventObj.desc = vm.eventData.events.event[j].description;
                    if (eventObj.desc == null)
                        eventObj.desc = "There is no description for this event.";
                    eventObj.start_time = vm.eventData.events.event[j].start_time;
                    eventObj.stop_time = vm.eventData.events.event[j].stop_time;
                    eventObj.venue_name = vm.eventData.events.event[j].venue_name;
                    eventObj.venue_address = vm.eventData.events.event[j].venue_address;
                    eventObj.city = vm.eventData.events.event[j].city_name;
                    eventObj.latitude = vm.eventData.events.event[j].latitude;
                    eventObj.longitude = vm.eventData.events.event[j].longitude;
                    eventObj.image = "images/default_image.png";
                    eventObj.price = "Free";
                    if (vm.eventData.events.event[j].links != null)
                        eventObj.ticketLink = vm.eventData.events.event[j].links.link[0].url;
                    else
                        eventObj.ticketLink = "";
                    if (vm.eventData.events.event[j].price != null) {
                        eventObj.price = "$ " + vm.eventData.events.event[j].price;
                    }
                    if (vm.eventData.events.event[j].image != null) {
                        eventObj.image = vm.eventData.events.event[j].image.medium.url;
                    }
                    eventObj.categories = vm.eventData.events.event[j].categories.category;

                    vm.eventDetails.push(eventObj);
                    $rootScope.eventDetails.push(eventObj);
                }
                console.log(vm.eventDetails);
            });
        }


        /********** POC ************/
        if($rootScope.currentuser != null) {
            EventService.findEvents($rootScope.currentuser._id,
                function (response) {
                    $scope.eventList = response;
                });

        console.log($scope.eventList);
        }

        $scope.addEvent = function()
        {
            EventService.createEvent($rootScope.currentuser._id,
                $scope.event,
                function(response){
                    $scope.eventList = response;
                });

            console.log($scope.eventList);
        };

        $scope.selectEvent = function(index)
        {
            var eventIndex = index;

            EventService.getEventByIndex(eventIndex,
                function(response)
                {
                    $scope.event = {
                        "title":response.title,
                        "stime" :response.stime,
                        "etime":response.etime,
                        "location":response.location,
                        "venue": response.venue
                    };
                });

            EventService.getEventIdByIndex(eventIndex,
                function(response)
                {
                    $scope.eventId = response;
                });

            console.log($scope.eventId);
        }


        $scope.updateEvent = function()
        {
            console.log("in update Event" + $scope.eventId);

            EventService.updateEventById($scope.eventId,$scope.event,
                function(response){
                    $scope.eventList = response;
                });

            console.log($scope.eventList);
        };

        $scope.deleteEvent = function(index)
        {
            var eventIndex = index;

            //function call return formId
            EventService.getEventIdByIndex(eventIndex,
                function(response)
                {
                    $scope.eventId = response;
                });

            EventService.deleteEventById($scope.eventId,
                function(response){
                    $scope.eventList = response;
                });

            console.log($scope.eventList);
        }

        /***************************/
    }

})();