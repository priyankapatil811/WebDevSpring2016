/**
 * Created by Priyanka on 3/29/16.
 */
module.exports = function(mongoose)
{
    // use mongoose to declare a field schema
    var field = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label: String,
                   value: String}] //Enum Values : TEXT, TEXTAREA, EMAIL,
                                   // PASSWORD, OPTIONS, DATE, RADIOS, CHECKBOXES
        // store field documents in this collection
    }, {collection: 'cs5610.assignment.field'});

    return field;
};