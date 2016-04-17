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
        deleteEventById : deleteEventById,
        addComment : addComment,
        deleteComment : deleteComment,
        findEventById : findEventById
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
                        venueAddress : event.venue_address,
                        startTime : event.start_time,
                        city : event.city,
                        price : event.price,
                        ticketLink : event.ticketLink,
                        users : [],
                        comments : []
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


    function addComment(event,user,comment)
    {
        var deferred = q.defer();

        EventModel.findOne({eventId : event.eventId},function(err,doc)
        {
            if(err)
                deferred.reject(err);

            if(doc)
            {
                console.log(comment);
                console.log(user);

                doc.comments.push({user : user, comment: comment, timePosted: new Date()});

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
                //create event as it does not exist
                newEvent = new EventModel(
                    {
                        eventId : event.eventId,
                        image: event.image,
                        title: event.title,
                        venueName : event.venue_name,
                        venueAddress : event.venue_address,
                        startTime : event.start_time,
                        city : event.city,
                        price : event.price,
                        ticketLink : event.ticketLink,
                        users : [],
                        comments : []
                    });

                newEvent.comments.push({user : user, comment:comment, timePosted: new Date()});

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

    function findEventById(eventId)
    {
        var deferred = q.defer();

        EventModel.findOne({eventId : eventId},function(err,doc)
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

        return deferred.promise;
    }

    function deleteComment(eventId,user,comment)
    {
        var deferred = q.defer();

        EventModel.findOne({eventId : eventId},function(err,event)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else {
                console.log(event.comments);

                for (var i = 0; i < event.comments.length; i++) {
                    if ((user == event.comments[i].user) && (comment == event.comments[i].comment)) {
                        event.comments.splice(i, 1);
                        break;
                    }
                }

                event.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }
};