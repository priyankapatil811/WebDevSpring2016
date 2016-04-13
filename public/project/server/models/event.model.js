/**
 * Created by Priyanka on 3/24/16.
 */
var events = require("./event.mock.json");
var uuid = require('node-uuid');

var q = require("q");

module.exports = function(mongoose)
{
    //load event schema
    var EventSchema = require("./event.schema.server.js")(mongoose);

    //create event model from schema
    var EventModel = mongoose.model('ProjEvent',EventSchema);

    var api =
    {
        likesEvent : likesEvent,
        findAllEventsForUser : findAllEventsForUser,
        deleteEventById : deleteEventById
     /*   getEventByIndex : getEventByIndex,
        createEventForUser : createEventForUser,
        findEvents : findEvents,
        deleteEventById : deleteEventById,
        updateEventById : updateEventById */
    };

    return api;

    function likesEvent(userId,event)
    {
        var deferred = q.defer();

        EventModel.findOne({eventId : event.id}, function(err,doc)
        {
            if(err)
                deferred.reject(err);

            if(doc)
            {
                doc.users.push(userId);

                doc.save(function(err,doc)
                {
                    if(err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }
            else
            {
                newEvent = new EventModel(
                    {
                        eventId : event.id,
                        image: event.image,
                        title: event.title,
                        venueName : event.venue_name,
                        startTime : event.start_time,
                        city : event.city,
                        users : []
                    });

                newEvent.users.push(userId);

                newEvent.save(function(err,doc)
                {
                    if(err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }
        });

        return deferred.promise;
    }

    function findAllEventsForUser(eventIds)
    {
        var deferred = q.defer();

        EventModel.find({
                _id: {$in: eventIds}
            },
            function (err, users) {
                if (err)
                {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(users);
                }
            });

        return deferred.promise;
    }


    function deleteEventById(eventId,userId)
    {
        var deferred = q.defer();

        EventModel.findById(eventId,function(err,event)
        {
           if(err)
           {
               deferred.reject(err);
           }
           else
           {
               for(var i=0;i<event.users.length;i++)
               {
                    if(userId == event.users[i])
                    {
                        event.users.splice(i,1);
                        break;
                    }
               }

               event.save(function(err,doc)
               {
                   if(err)
                   {
                       deferred.reject(err);
                   }
                   else
                   {
                       deferred.resolve(doc);
                   }
               });
           }
        });

        return deferred.promise;
    }

    /*

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

    }*/
};