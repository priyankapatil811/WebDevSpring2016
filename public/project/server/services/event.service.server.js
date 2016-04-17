/**
 * Created by Priyanka on 3/24/16.
 */
module.exports = function(app,userModel,eventModel)
{
    app.post("/api/project/user/:userId/event", function(req,res) {
        var userId = req.params.userId;
        var newevent = req.body;

        eventModel.likesEvent(userId,newevent).then(
            function(doc)
            {
                console.log("event " + doc);
                return userModel.userLikesEvent(userId,doc);
            },
            function(err)
            {
                console.log(err);
                res.status(600).send(err);
            }
        ).then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }
        );
       // res.json("ok");
    });


    app.get("/api/project/user/:userId/event",function(req,res)
    {
        var userId = req.params.userId;

        userModel.getUserById(userId).then(
            function(doc)
            {
                if(doc) {
                    console.log(doc);
                    return eventModel.findAllEventsForUser(doc.likesEvent);
                }
                else
                {
                    res.json({});
                }
            },
            function(err)
            {
                res.status(400).send(err);
            }).
        then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(500).send(err);
            }
        );
    });

    //added userId parameter
    app.delete("/api/project/event/:eventId/user/:userId", function(req,res) {
        var deleventId = req.params.eventId;
        var userId = req.params.userId;

        eventModel.deleteEventById(deleventId,userId).then(
            function(doc)
            {
                return userModel.removeEventLikes(doc,userId);
            },
            function(err)
            {
                res.status(600).send(err);
            }
        ).then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }
        );
    });

    app.delete("/api/project/event/:eventId/user/:user/comment/:comment",function(req,res)
    {
        var eventId = req.params.eventId;
        var user = req.params.user;
        var comment = req.params.comment;

        eventModel.deleteComment(eventId,user,comment).then(
            function(doc)
            {
                console.log(doc);
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }
        );
    });

    app.post("/api/project/event/user/:user",function(req,res)
    {
        var user = req.params.user;
        var comment = req.query.comment;
        var event = req.body;

        eventModel.addComment(event,user,comment).then(
            function(doc)
            {
                console.log(doc);
                res.json(doc);
            },
            function(err)
            {
                console.log(err);
                res.status(400).send(err);
            }
        );
    });

    app.get("/api/project/event/:eventId",function(req,res)
    {
        var eventId = req.params.eventId;

        eventModel.findEventById(eventId).then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(500).send(err);
            }
        )
    });

    app.put("/api/project/event/:eventId", function(req,res)
    {
        var eventId = req.params.eventId;
        var upevent = req.body;
        eventModel.updateEventById(eventId,upevent);
        res.json("ok");
    });



    //added userId parameter
    app.get("/api/project/event/:eventId/user/:userId", function(req,res)
    {
        var eventIdIndex = req.params.eventId;
        var userId = req.params.userId;
        var event = eventModel.getEventByIndex(eventIdIndex,userId);
        res.json(event);
    });

    app.get("/api/project/user/:userId/event", function(req,res)
    {
        var userId = req.params.userId;
        var events = eventModel.findEvents(userId);
        res.json(events);
    });

};