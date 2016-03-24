/**
 * Created by Priyanka on 3/8/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("EventController", EventController);

    function EventController(EventService, $rootScope) {

        var vm = this;
        vm.eventDetails = [];
        vm.eventList = [];
        vm.where = "";
        vm.getGeoLoc = getGeoLoc;
        vm.searchLocation = searchLocation;
        vm.showError = showError;
        vm.showPosition = showPosition;
        vm.search = search;
        vm.init = init;
        vm.addEvent = addEvent;
        vm.selectEvent = selectEvent;
        vm.updateEvent = updateEvent;
        vm.deleteEvent = deleteEvent;

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
            //$scope.$apply();
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

        function init()
        {
            EventService.findEvents($rootScope.currentuser._id).then(
                function (response) {
                    vm.eventList = response.data;
                    console.log(vm.eventList);
                });
        }

        if($rootScope.currentuser != null) {
            init();
        }

        function addEvent()
        {
            EventService.createEvent($rootScope.currentuser._id,vm.event).then(
                function(response){
                    init();
                });
        }

        function selectEvent(index)
        {
            vm.eventIndex = index;

            EventService.getEventByIndex(vm.eventIndex,$rootScope.currentuser._id).then(
                function(response)
                {
                    vm.event = {
                        "_id" : response.data._id,
                        "title":response.data.title,
                        "stime" :response.data.stime,
                        "etime":response.data.etime,
                        "location":response.data.location,
                        "venue": response.data.venue,
                        "userId" : response.data.userId
                    };
                });

            //EventService.getEventIdByIndex(eventIndex,
            //    function(response)
            //    {
            //        $scope.eventId = response;
            //    });
            //
            //console.log($scope.eventId);
        }


        function updateEvent()
        {
            console.log("in update Event" + vm.event._id);

            EventService.updateEventById(vm.event._id,vm.event).then(
                function(response){
                    init();
                });
        }

        function deleteEvent(index)
        {
            var eventIndex = index;

            //function call return formId
            //EventService.getEventIdByIndex(eventIndex,
            //    function(response)
            //    {
            //        $scope.eventId = response;
            //    });

            EventService.deleteEventById(eventIndex,$rootScope.currentuser._id).then(
                function(response){
                    init();
                });
        }

        /***************************/
    }

})();