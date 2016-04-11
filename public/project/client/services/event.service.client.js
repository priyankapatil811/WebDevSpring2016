/**
 * Created by Priyanka on 3/8/16.
 */
/**
 * Created by Priyanka on 3/4/16.
 */

(function(){
    "use strict";
    angular
        .module("infoPinStrap")
        .factory("EventService",EventService);

    function EventService($http, $rootScope)
    {
        $rootScope.eventDetails = [];

        var apiKey = "rcnxbzfT3dLNF3ff";
        var pageNo = 1;
        var sortOrder = "Popularity";
        var range = 2;
        var url = "";
        var searchKeyWord = "";

        var api =
        {
            findEventByLocation : findEventByLocation,
            findAllEvents : findAllEvents,
            findEventById : findEventById,

            /********** POC ************/
            setSearchKeyword : setSearchKeyword,
            getSearchKeyword : getSearchKeyword,
            createEvent : createEvent,
            findEvents : findEvents,
            deleteEventById : deleteEventById,
            updateEventById : updateEventById,
            getEventByIndex : getEventByIndex
            /***************************/
        };

        return api;

        function setSearchKeyword(query)
        {
            searchKeyWord = query;
        }

        function getSearchKeyword()
        {
            return searchKeyWord;
        }

        function findEventByLocation(location) {

           // $http.get('http://maps.google.com/maps/api/geocode/json?address=' + location).success(callback);
            url = 'http://maps.google.com/maps/api/geocode/json?address=' + location;
            return $http.get(url);
        }


        function findAllEvents(whereCo,range) {

            url = "http://api.eventful.com/json/events/search?app_key=" + apiKey + "&where=" + whereCo + "&within=" +
                range + "&units=mi&date=Future&page_size=1000&page_number=" + pageNo + "&include=categories,price,links&sort_order=" +
                sortOrder + "&dataType=json&callback=JSON_CALLBACK";

            return $http.jsonp(url);
        }

        function findEventById(eventId,callback) {

            for(var i=0;i<$rootScope.eventDetails.length;i++)
            {
                 if(eventId == $rootScope.eventDetails[i].id)
                 {
                     callback($rootScope.eventDetails[i]);
                 }
            }
        }

        /********** POC ************/
        function getEventByIndex(index,userId)
        {
            return $http.get("/api/project/event/"+index+"/user/"+userId);
        }

        function createEvent(userId,event)
        {
            return $http.post("/api/project/user/"+userId+"/event",event);
        }

        function findEvents(userId)
        {
            return $http.get("/api/project/user/"+userId+"/event");
        }

        function deleteEventById(eventId, userId)
        {
            return $http.delete("/api/project/event/"+eventId+"/user/"+userId);
        }

        function updateEventById(eventId, newEvent)
        {
            return $http.put("/api/project/event/"+eventId,newEvent);
        }
        /***************************/

    }
})();