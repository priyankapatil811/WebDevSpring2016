/**
 * Created by Priyanka on 3/16/16.
 */
 var forms = require("./form.mock.json");
 var uuid = require('node-uuid');

 module.exports = function()
 {
     var api =
     {
          getFormByIndex : getFormByIndex,
          getFormById : getFormById,
          createFormForUser : createFormForUser,
          findAllFormsForUser : findAllFormsForUser,
          deleteFormById : deleteFormById,
          updateFormById : updateFormById
     };

     return api;


     function getFormByIndex(index,userId)
     {
         var userForms = [];
         for(var i=0;i<forms.length;i++)
         {
             if(userId == forms[i].userId)
             {
                 userForms.push(forms[i]);
             }
         }

         return userForms[index];
     }

     function getFormById(formId)
     {
         for(var i=0;i<forms.length;i++)
         {
            if(formId == forms[i]._id)
            {
                return forms[i];
            }
         }
     }

     function createFormForUser(userId, form)
     {
        var newform =
        {
        // "_id" : "0"+ Math.floor((Math.random() * 100) + 1),
         "_id" : uuid.v1(),
         "title" : form.title,
         "userId" : userId
        };

        forms.push(newform);
        console.log(forms);
     }

     function findAllFormsForUser(userId)
     {
        var formsForUserId = [];

        for(var i=0;i<forms.length;i++)
        {
         if(userId==forms[i].userId)
         {
          formsForUserId.push(forms[i]);
         }
        }

        return formsForUserId;
     }

     function deleteFormById(formIndex,userId)
     {
         var userForms = [];
         for(var i=0;i<forms.length;i++)
         {
             if(userId == forms[i].userId)
             {
                 userForms.push(forms[i]);
             }
         }

        var formId = userForms[formIndex]._id;
        console.log(formId);

        forms = forms.filter(function(fId)
        {
            return fId._id != formId;
        });

        console.log(forms);
     }

     function updateFormById(formId, newForm)
     {
         console.log(formId);

         for(var i=0;i<forms.length;i++) {
             if (formId == forms[i]._id) {
                 if(forms[i].hasOwnProperty("fields")) {
                     forms[i] =
                     {
                         "_id": forms[i]._id,
                         "title": newForm.title,
                         "userId": forms[i].userId,
                         "fields": forms[i].fields
                     }
                 }
                 else
                 {
                     forms[i] =
                     {
                         "_id": forms[i]._id,
                         "title": newForm.title,
                         "userId": forms[i].userId
                     }
                 }
             }
         }
         console.log(forms);
     }
 };