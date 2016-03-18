/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService,$routeParams,$rootScope) {

        var vm = this;

        vm.popupField = "";
        vm.formId = $routeParams.formId;
        vm.addField = addField;
        vm.updateField = updateField;
        vm.deleteField = deleteField;
        vm.openField = openField;

        function init()
        {
            vm.fieldsList = [];
            FieldService.getFieldsForForm(vm.formId).then(
                function(response)
                {
                    vm.fieldsList = response.data;
                }
            );
        }

        if($rootScope.currentuser != null)
        {
            init();
        }

        function openField(field)
        {
            vm.popupField = field;
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


       /* FieldService.getFieldForForm(vm.formId).then(
            function(response)
            {
                vm.field = response.data;
            }
        ) */
/*

        createFieldForForm(formId, field);

        getFieldForForm(formId, fieldId);

        deleteFieldFromForm(formId, fieldId);

        updateField(formId, fieldId, field);
*/

    }
})();