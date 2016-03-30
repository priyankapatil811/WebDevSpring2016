/**
 * Created by Priyanka on 3/29/16.
 */
module.exports = function(mongoose)
{
    var fieldSchema = require("./field.schema.server.js")(mongoose);
    // use mongoose to declare a form schema
    var form = mongoose.Schema({
        userId: String,
        title: String,
        fields: [fieldSchema],
        created: Date, //Default : Current Date
        updated: Date  //Default : Current Date
        // store form documents in this collection
    }, {collection: 'assignment.form'});

    return form;
};