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

        function addField()
        {
            FieldService.createFieldForForm(vm.formId,field).then(
                function(response)
                {
                    init();
                }
            )
        }

        function deleteField()
        {
            FieldService.deleteFieldFromForm(vm.formId,fieldId).then(
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