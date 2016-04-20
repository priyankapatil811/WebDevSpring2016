/**
 * Created by Priyanka on 4/7/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a news schema
    var news = mongoose.Schema({
        newsId : String,
        image: String,
        title: String,
        url : String,
        content : String,
        publishedDate : String,
        users : [String],
        comments : [{user : String, comment : String, timePosted : Date}]

        // store user documents in this collection
    }, {collection: 'project.news'});

    return news;
};