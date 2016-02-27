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
        if($rootScope.currentuser != null)
        {
            FormService.findAllFormsForUser($rootScope.currentuser._id,
                function(response){
                    $scope.viewForms = response;
                });
        }

        $scope.addForm = function()
        {
            console.log($rootScope.currentuser._id);
            FormService.createFormForUser($rootScope.currentuser._id,$scope.form,
                function(response){
                    $scope.viewForms = response;
            });

            console.log($scope.viewForms);
        };

        $scope.updateForm = function()
        {
            console.log("in update form" + $scope.formId);
            FormService.updateFormById($scope.formId, $scope.form,
                function(response){
                    $scope.viewForms = response;
            });

            console.log($scope.viewForms);
        };

        $scope.deleteForm = function(index)
        {
            var formIndex = index;

            //function call return formId
            FormService.getFormIdByIndex(formIndex,
                function(response)
                {
                    $scope.formId = response;
                });

            FormService.deleteFormById($scope.formId,
                function(response){
                    $scope.viewForms = response;
            });

            console.log($scope.viewForms);
        }

        $scope.selectForm = function(index)
        {
            var formIndex = index;

            FormService.getFormByIndex(formIndex,
                function(response)
                {
                    $scope.form = {
                        title: response.title
                    };
                });

            FormService.getFormIdByIndex(formIndex,
                function(response)
                {
                    $scope.formId = response;
                });

            console.log($scope.formId);
        }

    }
})();