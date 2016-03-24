/**
 * Created by Priyanka on 3/16/16.
 */
module.exports = function(app,userModel)
{
    app.get("/api/project/user?username=username",function(req,res)
    {
        var uName = req.query.username;
        res.json(userModel.findUserByUsername(uName));
    });

    app.get("/api/project/user", function (req,res) {
        var uName = req.query.username;
        var uPwd = req.query.password;
        var user = userModel.findUserByCredentials(uName,uPwd)
        req.session.currentUser = user;
        res.json(user);
    });

    app.get("/api/project/user",function(req,res){
        res.json(userModel.findAllUsers);
    });

    app.post("/api/project/user",function(req,res){
        var newUser = req.body;
        console.log(newUser);
        var user = userModel.createUser(newUser)
        req.session.currentUser = user;
        res.json(user);
    });

    app.put("/api/project/user/:id",function(req,res){
        var userId = req.params.id;
        var upUser = req.body;
        var user = userModel.updateUser(userId,upUser);
        res.json(user);
    });

    app.delete("/api/project/user/:id",function(req,res){
        var delUser = req.param.userId;
        userModel.deleteUserById(delUser);
        res.send("ok");
    });

    //logged in
    app.get("/api/project/loggedin", function (req, res) {
        res.json(req.session.currentUser);
    });

    app.post("/api/project/logout", function (req, res) {
        req.session.destroy();
        res.send(200);
    });
};