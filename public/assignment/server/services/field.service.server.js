/**
 * Created by Priyanka on 3/16/16.
 */
module.exports = function (app,fieldModel) {

    app.get("/api/assignment/form/:formId/field",function(req,res){

        var formId = req.params.formId;
        var fields = fieldModel.getFieldsForForm(formId);
        res.json(fields);
    });

    app.post("/api/assignment/form/:formId/field",function(req,res){
        var formId = req.params.formId;
        var newField = req.body;
        res.json(fieldModel.createFieldForForm(formId,newField));
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId",function(req,res){
        console.log("in delete");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldFromForm(formId,fieldId);
        res.send("ok");
    });

    app.put("/api/assignment/form/:formId/field/:fieldId",function(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        fieldModel.updateField(formId,fieldId,updatedField);
        res.send("ok");
    });

    app.get("/api/assignment/form/:formId",function(req,res){
        var formId = req.params.formId;
        var form = fieldModel.getFormName(formId);
        res.json(form);
    });
};