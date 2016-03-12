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
        /********** POC ************/
        var events = [
            {"_id":123,
                "title":"Blue Man Group",
                "stime" :"06:00pm",
                "etime":"09:00pm",
                "location":"nyc",
                "venue": "timesquare",
                "userId":123},

            {"_id":456,
                "title":"Maroon5",
                "stime" :"05:00pm",
                "etime":"10:00pm",
                "location":"boston",
                "venue": "td garden",
                "userId":234},

            {"_id":345,
                "title":"ellie goulding",
                "stime" :"07:00pm",
                "etime":"09:00pm",
                "location":"boston",
                "venue": "td garden",
                "userId":123},
        ];
        /***************************/


        var apiKey = "rcnxbzfT3dLNF3ff";
        var pageNo = 1;
        var sortOrder = "Popularity";
        var range = 2;
        var url = "";

        var api =
        {
            findEventByLocation : findEventByLocation,
            findAllEvents : findAllEvents,
            findEventById : findEventById,

            /********** POC ************/
            createEvent : createEvent,
            findEvents : findEvents,
            deleteEventById : deleteEventById,
            updateEventById : updateEventById,
            getEventIdByIndex : getEventIdByIndex,
            getEventByIndex : getEventByIndex
            /***************************/
        };

        return api;


        function findEventByLocation(location,callback) {
            $http.get('http://maps.google.com/maps/api/geocode/json?address=' + location).success(callback);
        }


        function findAllEvents(whereCo,callback) {
            url = "http://api.eventful.com/json/events/search?app_key=" + apiKey + "&where=" + whereCo + "&within=" +
                range + "&units=mi&date=Future&page_size=10&page_number=" + pageNo + "&include=categories,price,links&sort_order=" +
                sortOrder + "&dataType=json&callback=JSON_CALLBACK";

            $http.jsonp(url).success(callback);
        }

        function findEventById(eventId,callback) {

            for(var i=0;i<$rootScope.eventDetails.length;i++){
             if(eventId == $rootScope.eventDetails[i].id)
             {
                 callback($rootScope.eventDetails[i]);
             }
            }

        }

        /********** POC ************/
        function getEventIdByIndex(index,callback)
        {
            callback(events[index]._id);
        }

        function getEventByIndex(index,callback)
        {
            callback(events[index]);
        }

        function createEvent(userId,event,callback)
        {
            var newEvent =
            {
                _id : Math.floor((Math.random() * 1000) + 1),
                //_id : (new Date).getTime(),
                "title":event.title,
                "stime" :event.stime,
                "etime":event.etime,
                "location":event.location,
                "venue":event.venue,
                "userId": userId
            };

            events.push(newEvent);
            //   console.log(curEvents);

            findEvents(userId,callback);
        }

        function findEvents(userId,callback)
        {
            var eventsForUserId = [];
            for(var i=0;i<events.length;i++)
            {
                if(userId==events[i].userId)
                {
                    eventsForUserId.push(events[i]);
                }
            }

            callback(eventsForUserId);
            //callback(events);
        }

        function deleteEventById(eventId, callback)
        {
            console.log(eventId);

            events = events.filter(function(eId){
                return eId._id != eventId;
            });

            console.log(events);

            findEvents($rootScope.currentuser._id,callback);
        }

        function updateEventById(eventId, newEvent, callback)
        {
            var index;
            for(var i=0;i<events.length;i++) {
                if (eventId == events[i]._id) {
                    index = i;
                    break;
                }
            }

            events[index] =
            {
                "title":newEvent.title,
                "stime" :newEvent.stime,
                "etime":newEvent.etime,
                "location":newEvent.location,
                "venue": newEvent.venue,
                "userId":$rootScope.currentuser._id
            };

            console.log(events[index]);

            findEvents($rootScope.currentuser._id,callback);
        }
        /***************************/

    }
})();