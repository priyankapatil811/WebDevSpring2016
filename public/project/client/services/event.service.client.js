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

        var apiKey = "";
        var pageNo = 1;
        var sortOrder = "Popularity";
        var url = "";

        var api =
        {
            findEventByLocation : findEventByLocation,
            findAllEvents : findAllEvents,
            createEvent : createEvent,
            findEventsForUser : findEventsForUser,
            deleteEventById : deleteEventById,
            addComment : addComment,
            deleteComment : deleteComment,
            findEvent : findEvent
        };

        return api;

        function findEventByLocation(location) {

            url = 'http://maps.google.com/maps/api/geocode/json?address=' + location;
            return $http.get(url);
        }

        function findAllEvents(whereCo,range) {

            url = "http://api.eventful.com/json/events/search?app_key=" + apiKey + "&where=" + whereCo + "&within=" +
                range + "&units=mi&date=Future&page_size=100&page_number=" + pageNo + "&include=categories,price,links&sort_order=" +
                sortOrder + "&dataType=json&callback=JSON_CALLBACK";

            return $http.jsonp(url);
        }

        function createEvent(userId,event)
        {
            return $http.post("/api/project/user/"+userId+"/event",event);
        }

        function findEventsForUser(userId)
        {
            return $http.get("/api/project/user/"+userId+"/event");
        }

        function deleteEventById(eventId,userId)
        {
            return $http.delete("/api/project/event/"+eventId+"/user/"+userId);
        }

        function addComment(event, userId, comment) {

            return $http.post("/api/project/event/user/" + userId + "?comment=" + comment, event);
        }

        function deleteComment(eventId, comment) {
            return $http.delete("/api/project/event/"+eventId+"/user/"+comment.user+"/comment/"+comment.comment);
        }

        function findEvent(eventId)
        {
            return $http.get("/api/project/event/"+eventId);
        }
    }
})();
