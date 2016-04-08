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
        startTime : String,
        city : String,
        users : [String]

        // store user documents in this collection
    }, {collection: 'project.event'});

    return event;
};