module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var user = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]
        // store user documents in this collection
    }, {collection: 'cs5610.assignment.user'});

    return user;
};