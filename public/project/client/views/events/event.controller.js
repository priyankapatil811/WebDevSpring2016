/**
 * Created by Priyanka on 3/8/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("EventController", EventController);

    function EventController(EventService, $rootScope, UserService) {

        var vm = this;
        vm.eventDetails = [];
        vm.eventList = [];
        vm.where = "";
        vm.getGeoLoc = getGeoLoc;
        vm.searchLocation = searchLocation;
        vm.showError = showError;
        vm.showPosition = showPosition;
        vm.search = search;
        vm.addEvent = addEvent;

        /*
        if(angular.isUndefined(vm.e))
            getGeoLoc();
        else
            searchLocation(vm.e); */

        function getGeoLoc()
        {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }
            else {
                vm.error = "Geolocation is not supported by this browser";
            }
        }

        function searchLocation(e)
         {
             EventService.findEventByLocation(e.city).then(function (mapData) {
                 console.log(mapData.data);
                 if (mapData.data.results.length != 0) {
                     vm.where = mapData.data.results[0].geometry.location.lat + "," + mapData.data.results[0].geometry.location.lng;
                     vm.eventDetails = [];
                     search(vm.where,2);
                 }
                 else {
                     vm.error = "Could not find entered location";
                     vm.showErr = true;
                 }
             });

         }

        function showPosition(position)
        {
            console.log("in show position");
            vm.where = position.coords.latitude + "," + position.coords.longitude;
            search(vm.where,2);
        }

        function showError()
        {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    error = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    error = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    error = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    error = "An unknown error occurred.";
                    break;
            }
        }

        function search(where,radius)
        {
            EventService.findAllEvents(where,radius).then(function (response) {
                console.log("in search!");
                vm.eventData = response.data;

                for (var j = 0; j < vm.eventData.events.event.length; j++) {
                    var eventObj = new Object();
                    eventObj.id = vm.eventData.events.event[j].id;
                    eventObj.eventId = vm.eventData.events.event[j].id;
                    eventObj.url = vm.eventData.events.event[j].url;
                    eventObj.title = vm.eventData.events.event[j].title;
                    eventObj.desc = vm.eventData.events.event[j].description;
                    if (eventObj.desc == null)
                        eventObj.desc = "There is no description for this event.";
                    eventObj.startTime = vm.eventData.events.event[j].start_time;
                    eventObj.stop_time = vm.eventData.events.event[j].stop_time;
                    eventObj.venueName = vm.eventData.events.event[j].venue_name;
                    eventObj.venueAddress = vm.eventData.events.event[j].venue_address;
                    eventObj.city = vm.eventData.events.event[j].city_name;
                    eventObj.latitude = vm.eventData.events.event[j].latitude;
                    eventObj.longitude = vm.eventData.events.event[j].longitude;
                    eventObj.image = "images/NoImage.png";
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
                    eventObj.color = 'blue';

                    vm.eventDetails.push(eventObj);
                    $rootScope.eventDetails.push(eventObj);
                }
                console.log(vm.eventDetails);
            });
        }

        var user = "";
        UserService
            .getCurrentUser()
            .then(function(response) {
                user = response.data;
            });


        function addEvent(event)
        {
            console.log(event.color);
            EventService.createEvent(user._id,event).then(
                function(response){
                    console.log(response.data);
                    event.color = 'green';
                    console.log(event.color);
                });
        }

    }

})();