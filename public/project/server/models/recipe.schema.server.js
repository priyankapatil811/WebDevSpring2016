/**
 * Created by Priyanka on 4/6/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a recipe schema
    var recipe = mongoose.Schema({
        recipeId : String,
        image: String,
        title: String,
        source: String,
        users : [String],
        comments : [{user : String, comment : String, timePosted : Date}]

        // store user documents in this collection
    }, {collection: 'project.recipe'});

    return recipe;
};