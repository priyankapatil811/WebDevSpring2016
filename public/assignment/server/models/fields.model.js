/**
 * Created by Priyanka on 3/17/16.
 */

"use strict";

var forms = require("./form.mock.json");
var uuid = require('node-uuid');

var q = require("q");

module.exports = function(mongoose)
{
    //load form schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create form model from schema
    var FormModel = mongoose.model('FormForFields',FormSchema);

    var api =
    {
        getFieldsForForm : getFieldsForForm,
        createFieldForForm : createFieldForForm,
        deleteFieldFromForm : deleteFieldFromForm,
        updateField : updateField,
        updateFieldAsPerType : updateFieldAsPerType,
        getFormName : getFormName
    };

    return api;

    function getFieldsForForm(formId)
    {
        var deferred = q.defer();

        FormModel.findById({_id : formId},function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createFieldForForm(formId,newField)
    {
        var deferred = q.defer();

        FormModel.findById({_id : formId},function(err,form)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                var fieldsList = form.fields;
                var upNewField = createFieldAsPerType(newField);
                fieldsList.push(upNewField);
                form.fields = fieldsList;

                form.save(function(err,doc)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }


    function createFieldAsPerType(newField)
    {
        var upNewField = "";
        if(newField.type == "TEXT" || newField.type == "TEXTAREA")
        {
            upNewField =
            {
                //"_id": formId,
                "label": newField.label, "type": newField.type, "placeholder" : newField.placeholder
            };

        }
        else if(newField.type == "DATE")
        {
            upNewField =
            {
                //"_id": formId,
                "label": newField.label, "type": newField.type
            };
        }
        else if(newField.type == "OPTIONS" || newField.type == "CHECKBOXES" || newField.type == "RADIOS")
        {
            upNewField =
            {
                //"_id": formId,
                "label": newField.label, "type": newField.type, "options" : newField.options
            };
        }

        return upNewField;
    }


    function deleteFieldFromForm(formId, fieldId)
    {
        var deferred = q.defer();

        FormModel.findById({_id : formId}, function(err,form)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<form.fields.length;i++)
                {
                    if(fieldId == form.fields[i]._id)
                    {
                        form.fields.splice(i,1);
                        break;
                    }
                }

                form.save(function(err,doc)
                {
                    if(err)
                        deferred.reject(err);
                    else
                    {
                        console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateField(formId,fieldId,upField)
    {
        var deferred = q.defer();

        FormModel.findById({_id : formId}, function(err,form)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<form.fields.length;i++)
                {
                    if(fieldId == form.fields[i]._id)
                    {
                        updateFieldAsPerType(form.fields[i],upField);
                        break;
                    }
                }

                console.log(form);

                form.save(function(err,doc)
                {
                    if(err)
                    {
                        console.log(err);
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateFieldAsPerType(field,upField)
    {
        if(upField.type == "TEXT" || upField.type == "TEXTAREA")
        {
            field.label = upField.label;
            field.placeholder = upField.placeholder;
        }
        else if(upField.type == "DATE")
        {
            field.label = upField.label;
        }
        else
        {
            var optionsList = [];

            var options = upField.options;
            var optionsParts = options.split("\n");

            for(var i=0;i<optionsParts.length;i++)
            {
                var opObject = new Object();

                var parts = optionsParts[i].split(":");

                opObject.label = parts[0];
                opObject.value = parts[1];
                optionsList.push(opObject);
            }

            //console.log(optionsList);

            field.label = upField.label;
            field.options = optionsList;
        }
    }

    function getFormName(formId)
    {
        var form = "";
        for(var i=0;i<forms.length;i++)
        {
            if(formId == forms[i]._id)
            {
                form = forms[i];
            }
        }
        console.log(form);
        return form;
    }
};