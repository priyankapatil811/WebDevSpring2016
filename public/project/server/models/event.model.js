/**
 * Created by Priyanka on 3/24/16.
 */
var events = require("./event.mock.json");
var uuid = require('node-uuid');

module.exports = function()
{
    var api =
    {
        getEventByIndex : getEventByIndex,
        createEventForUser : createEventForUser,
        findEvents : findEvents,
        deleteEventById : deleteEventById,
        updateEventById : updateEventById
    };

    return api;


    function getEventByIndex(index,userId)
    {
        var userEvents = [];

        for (var i = 0; i < events.length; i++)
        {
            if(userId == events[i].userId)
            {
                userEvents.push(events[i]);
            }
        }

        return userEvents[index];
    }

    function createEventForUser(userId,event)
    {
        var newEvent =
        {
            _id : uuid.v1(),
            //_id : (new Date).getTime(),
            "title":event.title,
            "stime" :event.stime,
            "etime":event.etime,
            "location":event.location,
            "venue":event.venue,
            "userId": userId
        };

        events.push(newEvent);
        //console.log(events);
    }

    function findEvents(userId)
    {
        var eventsForUserId = [];
        for(var i=0;i<events.length;i++)
        {
            if(userId==events[i].userId)
            {
                eventsForUserId.push(events[i]);
            }
        }

        return eventsForUserId;
    }

    function deleteEventById(eventIndex, userId)
    {
        var userEvents = [];

        for(var i=0;i<events.length;i++)
        {
            if(userId == events[i].userId)
            {
                userEvents.push(events[i]);
            }
        }

        var eventId = userEvents[eventIndex]._id;
        //console.log(eventId);

        events = events.filter(function(eId){
            return eId._id != eventId;
        });

        //console.log(events);
    }

    function updateEventById(eventId, newEvent)
    {
        var index;
        var userId;

        for(var i=0;i<events.length;i++) {
            if (eventId == events[i]._id) {
                index = i;
                userId = events[i].userId;
                break;
            }
        }

        events[index] =
        {
            "_id" :eventId,
            "title":newEvent.title,
            "stime" :newEvent.stime,
            "etime":newEvent.etime,
            "location":newEvent.location,
            "venue": newEvent.venue,
            "userId":userId
        };

        //console.log(events);
    }
};