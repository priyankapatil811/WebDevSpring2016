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

        vm.formId = $routeParams.formId;
        vm.addField = addField;
        vm.updateField = updateField;
        vm.deleteField = deleteField;

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

        function addField(field)
        {
            console.log(field.type);

            if(field.type=="Single Line Text")
                vm.type = "TEXT";
            else if(field.type == "Dropdown")
                vm.type = "OPTIONS";
            else if(field.type == "Date")
                vm.type = "DATE";
            else if(field.type == "Checkboxes")
                vm.type = "CHECKBOX";
            else if(field.type == "Radio buttons")
                vm.type = "RADIO"
            else
                vm.type = "TEXTAREA";

            var id = Math.floor((Math.random() * 1000) + 1);
            var field = {"_id": id, "label": "New Field", "type": vm.type, "placeholder": ""};

            FieldService.createFieldForForm(vm.formId,field).then(
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

        function updateField()
        {
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