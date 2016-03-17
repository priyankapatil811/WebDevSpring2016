/**
 * Created by Priyanka on 3/16/16.
 */
module.exports = function (app,fieldModel) {

    app.get("/api/assignment/form/:formId/field",function(req,res){

        var formId = req.params.formId;
        var fields = fieldModel.getFieldsForForm(formId);
        res.json(fields);
    });
};