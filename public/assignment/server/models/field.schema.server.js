/**
 * Created by Priyanka on 3/29/16.
 */
module.exports = function(mongoose)
{
    // use mongoose to declare a field schema
    var field = mongoose.Schema({
        label: String,
        //Enum Values : TEXT, TEXTAREA, EMAIL, PASSWORD, OPTIONS, DATE, RADIOS, CHECKBOXES
        type: {type : String, enum : ["TEXT" , "TEXTAREA" , "DATE" , "OPTIONS" , "RADIOS" , "CHECKBOXES"]},
        placeholder: String,
        options: [{label: String, value: String}]

        // store field documents in this collection
    }, {collection: 'assignment.field'});

    return field;
};