/**
 * Created by Priyanka on 3/16/16.
 */
 var forms = require("./form.mock.json");
 var uuid = require('node-uuid');

 var q = require("q");

 module.exports = function(db,mongoose)
 {
     //load form schema
     var FormSchema = require("./form.schema.server.js")(mongoose);

     //create form model from schema
     var FormModel = mongoose.model('Form',FormSchema);

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
         var deferred = q.defer();

         FormModel.findById({_id : formId},function(err,doc)
         {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(doc);
         });

         return deferred.promise;
     }

     function createFormForUser(userId, form)
     {
        var deferred = q.defer();

        form.userId = userId;
        form.fields = [];
        FormModel.create(form,function(err,doc)
        {
           if(err)
           {
               deferred.reject(err);
           }
           else
           {
               deferred.resolve(doc);
           }
        });

        return deferred.promise;
     }

     function findAllFormsForUser(userId)
     {
        var deferred = q.defer();

        FormModel.find({userId : userId},function(err,doc){
           if(err)
           {
               deferred.reject(err);
           }
           else
           {
               deferred.resolve(doc);
           }
        });
        return deferred.promise;
     }


     function deleteFormById(formId)
     {
         var deferred = q.defer();

         FormModel.remove({_id : formId},function(err,doc)
         {
             if(err)
             {
                 deferred.reject(err);
             }
             else
             {
                 deferred.resolve(doc);
             }
         });

         return deferred.promise;
     }

     function updateFormById(formId, newForm)
     {
         var deferred = q.defer();

         FormModel.findById({_id : formId},function(err,upForm)
         {
             if(err)
             {
                 deferred.reject(err);
             }
             else
             {
                upForm.title = newForm.title;
                upForm.save(function(err,doc)
                {
                    deferred.resolve(doc);
                });
             }
         });

         return deferred.promise;
     }
 };