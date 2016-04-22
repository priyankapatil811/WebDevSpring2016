/**
 * Created by Priyanka on 3/29/16.
 */
module.exports = function(mongoose)
{
    var fieldSchema = require("./field.schema.server.js")(mongoose);
    // use mongoose to declare a form schema
    var form = mongoose.Schema({
        userId: String,
        title: {type : String, default : 'New Form'},
        fields: [fieldSchema],
        created: {type : Date,default : Date.now}, //Default : Current Date
        updated: {type : Date,default : Date.now}  //Default : Current Date
        // store form documents in this collection
    }, {collection: 'assignment.form'});

    return form;
};