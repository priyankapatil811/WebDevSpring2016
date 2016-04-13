/**
 * Created by Priyanka on 4/7/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a recipe schema
    var news = mongoose.Schema({
        newsId : String,
        image: String,
        title: String,
        publishedDate : String,
        users : [String]

        // store user documents in this collection
    }, {collection: 'project.news'});

    return news;
};