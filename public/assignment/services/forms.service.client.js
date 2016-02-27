/**
 * Created by Priyanka on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);


    function FormService($rootScope)
    {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api =
        {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            getFormByIndex : getFormByIndex,
            getFormIdByIndex : getFormIdByIndex
        };

        return api;

        function getFormIdByIndex(index,callback)
        {
            callback(forms[index]._id);
        }

        function getFormByIndex(index,callback)
        {
            callback(forms[index]);
        }

        function createFormForUser(userId, form, callback)
        {
            var newform =
            {
                "_id" : "0"+Math.floor((Math.random() * 100) + 1),
                "title" : form.title,
                "userId" : userId
            }

            forms.push(newform);
            findAllFormsForUser(userId, callback)
        }

        function findAllFormsForUser(userId, callback)
        {
            var formsForUserId = [];
            for(var i=0;i<forms.length;i++)
            {
                if(userId==forms[i].userId)
                {
                    formsForUserId.push(forms[i]);
                }
            }

            callback(formsForUserId);
        }

        function deleteFormById(formId, callback)
        {
            console.log(formId);

            forms = forms.filter(function(fId){
                return fId._id != formId;
            });

            console.log(forms);

            findAllFormsForUser($rootScope.currentuser._id, callback)
        }

        function updateFormById(formId, newForm, callback)
        {
            var index;
            for(var i=0;i<forms.length;i++) {
                if (formId == forms[i]._id) {
                    index = i;
                    break;
                }
            }

            forms[index] =
            {
                "_id" : formId,
                "title" : newForm.title,
                "userId" : $rootScope.currentuser._id
            };

            console.log(forms[index]);

            findAllFormsForUser($rootScope.currentuser._id, callback)
        }
    }
})();