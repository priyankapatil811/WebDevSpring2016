module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var user = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]
        // store user documents in this collection
    }, {collection: 'assignment.user'});

    return user;
};