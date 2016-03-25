/**
 * Created by Priyanka on 3/24/16.
 */
module.exports = function(app,userModel,recipeModel)
{
    app.post("/api/project/user/:userId/recipe", function(req,res) {
        var userId = req.params.userId;
        var newrecipe = req.body;
        recipeModel.createRecipeForUser(userId,newrecipe);
        res.json("ok");
    });

    app.put("/api/project/recipe/:recipeId", function(req,res)
    {
        var recipeId = req.params.recipeId;
        var uprecipe = req.body;
        recipeModel.updateRecipeById(recipeId,uprecipe);
        res.json("ok");
    });

    //added userId parameter
    app.delete("/api/project/recipe/:recipeId/user/:userId", function(req,res) {
        var delrecipeId = req.params.recipeId;
        var userId = req.params.userId;
        recipeModel.deleteRecipeById(delrecipeId,userId);
        res.json("ok");
    });

    //added userId parameter
    app.get("/api/project/recipe/:recipeId/user/:userId", function(req,res)
    {
        var recipeIndex = req.params.recipeId;
        var userId = req.params.userId;
        var recipe = recipeModel.getRecipeByIndex(recipeIndex,userId);
        res.json(recipe);
    });

    app.get("/api/project/user/:userId/recipe", function(req,res)
    {
        var userId = req.params.userId;
        var recipes = recipeModel.findRecipes(userId);
        res.json(recipes);
    });

};