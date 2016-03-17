/**
 * Created by Priyanka on 3/17/16.
 */

var forms = require("./form.mock.json");

module.exports = function()
{
    var api =
    {
        getFieldsForForm : getFieldsForForm
    };

    return api;

    function getFieldsForForm(formId)
    {
        for(var i=0;i<forms.length;i++)
        {
            if(formId == forms[i]._id)
            {
                console.log(forms[i].fields);
                return forms[i].fields;
            }
        }
    }

};