/**
 * Created by Priyanka on 3/17/16.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http)
    {
        var api =
        {
            getFormName : getFormName,
            getFieldsForForm : getFieldsForForm,
            createFieldForForm : createFieldForForm,
            getFieldForForm : getFieldForForm,
            deleteFieldFromForm : deleteFieldFromForm,
            updateField : updateField
        };

        return api;

        function getFormName(formId)
        {
            return $http.get("/api/assignment/form/"+formId);
        }

        function getFieldsForForm(formId)
        {
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function createFieldForForm(formId, field)
        {
            return $http.post("/api/assignment/form/"+formId+"/field",field);
        }

        function getFieldForForm(formId, fieldId)
        {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId, fieldId)
        {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function updateField(formId, fieldId, field)
        {
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId,field);
        }
    }
})();

