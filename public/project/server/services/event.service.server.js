/**
 * Created by Priyanka on 3/24/16.
 */
module.exports = function(app,userModel,eventModel)
{
    app.post("/api/project/user/:userId/event", function(req,res) {
        var userId = req.params.userId;
        var newevent = req.body;
        eventModel.createEventForUser(userId,newevent);
        res.json("ok");
    });

    app.put("/api/project/event/:eventId", function(req,res)
    {
        var eventId = req.params.eventId;
        var upevent = req.body;
        eventModel.updateEventById(eventId,upevent);
        res.json("ok");
    });

    //added userId parameter
    app.delete("/api/project/event/:eventId/user/:userId", function(req,res) {
        var deleventId = req.params.eventId;
        var userId = req.params.userId;
        eventModel.deleteEventById(deleventId,userId);
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