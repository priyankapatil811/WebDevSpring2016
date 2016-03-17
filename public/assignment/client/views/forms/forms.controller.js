/**
 * Created by Priyanka on 2/20/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$scope,$rootScope)
    {
        $scope.init = function()
        {
            FormService.findAllFormsForUser($rootScope.currentuser._id).then(
                function(response){
                    $scope.viewForms = response.data;
                });
        };

        if($rootScope.currentuser != null)
        {
            $scope.init();
        }

        $scope.addForm = function()
        {
            console.log($rootScope.currentuser._id);
            FormService.createFormForUser($rootScope.currentuser._id,$scope.form).then(
                function(response){
                    if(response.data == "ok")
                    {
                        $scope.init();
                    }
            });
        };

        $scope.selectForm = function(index)
        {
            $scope.formIndex = index;

            FormService.getFormByIndex($scope.formIndex).then(
                function(response)
                {
                    $scope.form = {
                        _id: response.data._id,
                        title: response.data.title,
                        userId : response.data.userId
                    };
                });
            /*
             FormService.getFormIdByIndex(formIndex).then(
             function(response)
             {
             $scope.formId = response.data;
             });

             console.log($scope.formId); */
        };

        $scope.updateForm = function(form)
        {
           // console.log("in update form" + $scope.formId);
            // FormService.updateFormById($scope.formId, $scope.form).then(
            FormService.updateFormById(form._id, form).then(
                function(response){
                    if(response.data == "ok")
                    {
                        $scope.init();
                    }
            });
        };

        $scope.deleteForm = function(index)
        {
            var formIndex = index;

         /*   //function call return formId
            FormService.getFormIdByIndex(formIndex).then(
                function(response)
                {
                    $scope.formId = response.data;
                });
           */

            //FormService.deleteFormById($scope.formId).then(
            FormService.deleteFormById(formIndex).then(
                function(response){
                    if(response.data == "ok")
                    {
                        $scope.init();
                    }
            });

        };
    }
})();