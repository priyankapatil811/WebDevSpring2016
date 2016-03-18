/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService,$routeParams,$rootScope,FormService) {

        var vm = this;

        vm.popupField = "";
        vm.form = "";
        vm.formId = $routeParams.formId;
        vm.getField = getField;
        vm.addField = addField;
        vm.updateField = updateField;
        vm.deleteField = deleteField;
        vm.selectField = selectField;

        function init()
        {
            vm.fields = [];
            FieldService.getFieldsForForm(vm.formId).then(
                function(response)
                {
                    vm.fields = response.data;
                    console.log(vm.fields);
                }
            );

            FormService.getFormById(vm.formId).then(
                function (response)
                {
                    vm.form =  response.data;
                });
        }

        if($rootScope.currentuser != null)
        {
            init();
        }

        function selectField(field)
        {
            if(field.type == "TEXT" || field.type == "TEXTAREA" || field.type == "EMAIL") {

                vm.popupField =
                {
                    "_id": field._id,
                    "label": field.label,
                    "type": field.type,
                    "placeholder" :  field.placeholder
                };

            }
            else if(field.type == "DATE")
            {
                vm.popupField =
                 {
                    "_id": field._id,
                    "label": field.label,
                    "type": field.type
                };

            }
            else
            {
                vm.popupField =
                {
                    "_id": field._id,
                    "label": field.label,
                    "type": field.type,
                    "options" : convertArrayToJson(field.options)

                };
            }
        }

        function convertArrayToJson(options)
        {
            var optionsStr = "";
            for(var i=0;i<options.length;i++)
            {
                optionsStr = optionsStr + options[i].label + ":" + options[i].value + "\n";
            }
            return optionsStr;
        }

        function addField(fieldType)
        {
            console.log(fieldType);
            var newField = "";

            if(fieldType=="Single Line Text")
                newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            else if(fieldType == "Dropdown")
                newField = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};

            else if(fieldType == "Date")
                newField = {"_id": null, "label": "New Date Field", "type": "DATE"};

            else if(fieldType == "Checkboxes")
                newField = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};

            else if(fieldType == "Radio buttons")
                newField = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};

            else
                newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};


            FieldService.createFieldForForm(vm.formId,newField).then(
                function(response)
                {
                    init();
                }
            )
        }

        function deleteField(field)
        {
            console.log(field);
            FieldService.deleteFieldFromForm(vm.formId,field._id).then(
                function(response)
                {
                    init();
                }
            )
        }


        function updateField(field)
        {
            console.log(field);

            var fieldId = vm.popupField._id;

            field.type = vm.popupField.type;

            FieldService.updateField(vm.formId,fieldId,field).then(
                function(response)
                {
                    init();
                }
            )

        }


        function getField()
        {
            FieldService.getFieldForForm(vm.formId).then(
                function (response) {
                    vm.field = response.data;
                }
            );
        }
    }
})();