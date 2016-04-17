/**
 * Created by Priyanka on 4/7/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a event schema
    var event = mongoose.Schema({
        eventId : String,
        image: String,
        title: String,
        venueName : String,
        venueAddress : String,
        startTime : String,
        city : String,
        price : String,
        ticketLink : String,
        users : [String],
        comments : [{user : String, comment : String, timePosted : Date}]

        // store user documents in this collection
    }, {collection: 'project.event'});

    return event;
};