/**
 * Created by Priyanka on 2/20/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$rootScope)
    {
        var vm = this;
        vm.addForm = addForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;

        function init()
        {
            FormService.findAllFormsForUser($rootScope.currentuser._id).then(
                function(response){
                    vm.viewForms = response.data;
                });
            console.log(vm.viewForms);
        };

        if($rootScope.currentuser != null)
        {
            init();
        }

        function addForm()
        {
            console.log($rootScope.currentuser._id);
            FormService.createFormForUser($rootScope.currentuser._id,vm.form).then(
                function(response){
                    if(response.data == "ok")
                    {
                        init();
                    }
            });
        };


        function selectForm(index)
        {
            vm.formIndex = index;

            FormService.getFormByIndex(vm.formIndex,$rootScope.currentuser._id).then(
                function(response)
                {
                    vm.form = {
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


        function updateForm(form)
        {
            console.log("in update form" + vm.form._id);
            // FormService.updateFormById($scope.formId, $scope.form).then(
            FormService.updateFormById(form._id, form).then(
                function(response){
                    if(response.data == "ok")
                    {
                        init();
                    }
            });
        };


        function deleteForm(index)
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
            FormService.deleteFormById(formIndex,$rootScope.currentuser._id).then(
                function(response){
                    if(response.data == "ok")
                    {
                        init();
                    }
            });

        };
    }
})();