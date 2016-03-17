/**
 * Created by Priyanka on 3/16/16.
 */
 var forms = require("./form.mock.json");

 module.exports = function()
 {
     var api =
     {
      createFormForUser : createFormForUser,
      findAllFormsForUser : findAllFormsForUser,
      deleteFormById : deleteFormById,
      updateFormById : updateFormById,
      getFormByIndex : getFormByIndex
     };

     return api;


     function getFormByIndex(index)
     {
        return forms[index];
     }

     function createFormForUser(userId, form)
     {
        var newform =
        {
         "_id" : "0"+ Math.floor((Math.random() * 100) + 1),
         "title" : form.title,
         "userId" : userId
        }

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

     function deleteFormById(formIndex)
     {
        var formId = forms[formIndex]._id;
        console.log(formId);

        forms = forms.filter(function(fId){
         return fId._id != formId;
        });

        console.log(forms);
     }

     function updateFormById(formId, newForm)
     {
         for(var i=0;i<forms.length;i++) {
             if (formId == forms[i]._id) {
                 forms[i] = newForm;
             }
         }
         console.log(forms);
     }
 };