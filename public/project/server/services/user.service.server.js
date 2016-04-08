/**
 * Created by Priyanka on 3/16/16.
 */
module.exports = function(app,userModel)
{
    app.get("/api/project/user", function(req,res)
    {
        var uName = req.query.username;
        var uPwd = req.query.password;

        if(typeof uName == 'undefined' && typeof uPwd == 'undefined') {
            userModel.findAllUsers.then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }
        else if(uName != null && uPwd != null)
        {
            userModel.findUserByCredentials(uName, uPwd).then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }
        else
        {
            userModel.findUserByUsername(uName).then(
                function(doc)
                {
                    res.json(doc);
                },
                function(err)
                {
                    res.status(400).send(err);
                }
            );
        }
    });

    app.get("/api/project/user/:id",function(req,res)
    {
        var userId = req.params.id;

        userModel.getUserById(userId).then(
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

    app.post("/api/project/user",function(req,res){
        var newUser = req.body;
        userModel.createUser(newUser).then(
            function(doc)
            {
                req.session.currentUser = doc;
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }
        );
    });

    app.put("/api/project/user/:id",function(req,res){
        var userId = req.params.id;
        var upUser = req.body;
        userModel.updateUser(userId,upUser).then(
            function(doc)
            {
                req.session.currentUser = doc;
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }
        );
    });

    app.delete("/api/project/user/:id",function(req,res){
        var delUser = req.param.userId;
        userModel.deleteUserById(delUser).then(
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

    //logged in
    app.get("/api/project/loggedin", function (req, res) {
        res.json(req.session.currentUser);
    });

    app.post("/api/project/logout", function (req, res) {
        req.session.destroy();
        res.send(200);
    });
};