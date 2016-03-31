/**
 * Created by Priyanka on 3/16/16.
 */
module.exports = function (app,fieldModel) {

    app.get("/api/assignment/form/:formId/field",function(req,res){

        var formId = req.params.formId;
        fieldModel.getFieldsForForm(formId).then(
            function(doc)
            {
                res.json(doc.fields);
            },
            function(err)
            {
                res.status(400).send(err);
            });
        //res.json(fields);
    });

    app.post("/api/assignment/form/:formId/field",function(req,res){
        var formId = req.params.formId;
        var newField = req.body;
        fieldModel.createFieldForForm(formId,newField).then(
          function(doc)
          {
              res.json(doc);
          },
          function(err)
          {
              res.status(400).send(err);
          });
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId",function(req,res){
        console.log("in delete");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldFromForm(formId,fieldId).then(
              function(doc)
              {
                  res.json(doc);
              },
              function(err)
              {
                  res.status(400).send(err);
              });
    });

    app.put("/api/assignment/form/:formId/field/:fieldId",function(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        fieldModel.updateField(formId,fieldId,updatedField).then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            });
    });

    /*
    app.get("/api/assignment/form/:formId",function(req,res){
        var formId = req.params.formId;
        var form = fieldModel.getFormName(formId);
        res.json(form);
    });
    */
};