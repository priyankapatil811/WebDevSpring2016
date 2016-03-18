/**
 * Created by Priyanka on 3/16/16.
 */
module.exports = function(app,userModel)
{
    app.get("/api/assignment/user?username=username",function(req,res)
    {
        var uName = req.query.username;
        res.json(userModel.findUserByUsername(uName));
    });

    app.get("/api/assignment/user", function (req,res) {
        var uName = req.query.username;
        var uPwd = req.query.password;
        var user = userModel.findUserByCredentials(uName,uPwd);
        res.json(user);
    });

    app.get("/api/assignment/user",function(req,res){
        res.json(userModel.findAllUsers);
    });

    app.post("/api/assignment/user",function(req,res){
        var newUser = req.body;
        console.log(newUser);
        var user = userModel.createUser(newUser);
        res.json(user);
    });

    app.put("/api/assignment/user/:id",function(req,res){
        var userId = req.params.id;
        var upUser = req.body;
        var user = userModel.updateUser(userId,upUser);
        res.json(user);
    });

    app.delete("/api/assignment/user/:id",function(req,res){
        var delUser = req.param.userId;
        userModel.deleteUserById(delUser);
        res.send("ok");
    });
};