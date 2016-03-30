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
        vm.viewForms = [];
        vm.addForm = addForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;

        function init()
        {
            FormService.findAllFormsForUser($rootScope.currentuser._id).then(
                function(response){
                    vm.viewForms = response.data;
                    console.log(vm.viewForms);
                });
        }

        if($rootScope.currentuser != null)
        {
            init();
        }

        function addForm()
        {
            console.log($rootScope.currentuser._id);
            FormService.createFormForUser($rootScope.currentuser._id,vm.form).then(
                function(response){
                    if(response.data)
                    {
                        init();
                    }
            });
        }


        function selectForm(index)
        {
            vm.form = {
                _id: vm.viewForms[index]._id,
                title: vm.viewForms[index].title,
                userId : vm.viewForms[index].userId
            };
        }


        function updateForm(form)
        {
            console.log("in update form" + vm.form._id);

            FormService.updateFormById(form._id, form).then(
                function(response){
                    if(response.data)
                    {
                        init();
                    }
            });
        }


        function deleteForm(index)
        {
            var formId = vm.viewForms[index]._id;

            FormService.deleteFormById(formId).then(
                function(response){
                    if(response.data)
                    {
                        init();
                    }
            });

        }
    }
})();