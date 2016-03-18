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
        deleteFieldFromForm : deleteFieldFromForm,
        updateField : updateField
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
        var id = Math.floor((Math.random() * 1000) + 1);

        for(var i=0;i<forms.length;i++)
        {
            if(formId == forms[i]._id)
            {
                console.log(formId + " " + newField);
                var upNewField =
                {
                 "_id": id, "label": newField.label, "type": newField.type
                };

                return forms[i].fields.push(upNewField);
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

    function updateField(formId,fieldId,upField)
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
                form.fields[i] =
                {
                    _id : formId,
                    label : upField.label,
                    type : upField.type,
                    placeholder : upField.placeholder
                }
            }
        }

    }
};