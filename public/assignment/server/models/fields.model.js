/**
 * Created by Priyanka on 3/17/16.
 */

var forms = require("./form.mock.json");

module.exports = function()
{
    var api =
    {
        getFieldsForForm : getFieldsForForm,
        createFieldForForm : createFieldForForm,
        deleteFieldFromForm : deleteFieldFromForm
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

    function createFieldForForm(formId,newField)
    {
        for(var i=0;i<forms.length;i++)
        {
            if(formId == forms[i]._id)
            {
                console.log(formId + " " + newField);
                return forms[i].fields.push(newField);
            }
        }
    }

    function deleteFieldFromForm(formId, fieldId)
    {
        var form = "";
        for(var i=0;i<forms.length;i++)
        {
            if(formId == forms[i]._id)
            {
                console.log(formId + " " + fieldId);
                form = forms[i];
            }
        }

        for(var i=0;i<form.fields.length;i++)
        {
            if(fieldId == form.fields[i]._id)
            {
                form.fields.splice(i,1);
            }
        }
    }

};