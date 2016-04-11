/**
 * Created by Priyanka on 3/24/16.
 */
module.exports = function(app,userModel,recipeModel)
{
    app.post("/api/project/user/:userId/recipe", function(req,res) {
        var userId = req.params.userId;
        var newrecipe = req.body;

        recipeModel.likesRecipe(userId,newrecipe).then(
            function(doc)
            {
                console.log("recipe " + doc);
                return userModel.userLikesRecipe(userId,doc);
            },
            function(err)
            {
                console.log(err);
                res.status(600).send(err);
            }
        ).then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }
        );
        //res.json("ok");
    });

    app.get("/api/project/recipe/:recipeId",function(req,res)
    {
        var recipeId = req.params.recipeId;

        recipeModel.findRecipeByIdForUser(recipeId).then(
          function(doc)
          {
              res.json(doc);
          },
          function(err)
          {
              res.status(500).send(err);
          }
        );
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
        //removes user from list of users saved in each recipe
        recipeModel.deleteRecipeById(delrecipeId,userId).then(
            function(doc)
            {
                console.log("in delete recipe "+doc);
                return userModel.removeRecipeLikes(doc,userId);
            },
            function(err)
            {
                console.log(err);
                res.status(600).send(err);
            }
        ).then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }
        );
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