/**
 * Created by Priyanka on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);


    function FormService($http)
    {
        var api =
        {
            getFormById : getFormById,
            getFormByIndex : getFormByIndex,
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return api;

        function getFormById(formId)
        {
            return $http.get("/api/assignment/form?formId="+formId);
        }

        //added userId parameter
        function getFormByIndex(index,userId)
        {
            return $http.get("/api/assignment/form/"+index+"/user/"+userId);
        }

        function createFormForUser(userId, form)
        {
            return $http.post("/api/assignment/user/"+userId+"/form",form);
        }

        function findAllFormsForUser(userId)
        {
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        //added userId parameter
        function deleteFormById(formId,userId)
        {
            return $http.delete("/api/assignment/form/"+formId+"/user/"+userId);
        }

        function updateFormById(formId, newForm)
        {
            return $http.put("/api/assignment/form/"+formId,newForm);
        }
    }
})();