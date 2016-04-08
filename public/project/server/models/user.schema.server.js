module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var user = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email : String,
        interests : [String],
        likesRecipe : [String],
        likesEvent : [String],
        likesArticle : [String]

        // store user documents in this collection
    }, {collection: 'project.user'});

    return user;
};