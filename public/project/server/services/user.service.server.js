/**
 * Created by Priyanka on 3/16/16.
 */
module.exports = function(app,userModel)
{
    app.get("/api/project/loggedin", loggedIn);
    app.post("/api/project/logout", logout);
    app.get("/api/project/user", findUser);
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);

    /**************** FUNCTIONALITY RELATED*****************/
    app.get("/api/project/user/:id",findUserById);
    app.get("/api/project/user/followers/:userId",findFollowersByUserId);
    app.get("/api/project/user/following/:userId",findFollowingByUserId);
    app.put("/api/project/followOtherUser/:friendId/user/:currentUserId",updateUserFollowInfo);
    app.put("/api/project/unFollowOtherUser/:friendId/user/:currentUserId",updateUserUnfollowInfo);
    /*******************************************************/

    //logged in
    function loggedIn(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findUser(req,res)
    {
        var uName = req.query.username;
        var uPwd = req.query.password;

        if(typeof uName == 'undefined' && typeof uPwd == 'undefined') {
            userModel.findAllUsers().then(
                function (doc) {
                    console.log("returning all users : "+doc);
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
    }

    function createUser(req,res)
    {
        var newUser = req.body;

        userModel.findUserByUsername(newUser.username).then(
            function(doc)
            {
                if(doc)
                {
                    res.json(null);
                }
                else
                {
                    return userModel.createUser(newUser);
                }
            },
            function(err)
            {
                res.status(400).send(err);
            })
            .then(
                function(user)
                {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err)
                {
                    res.status(600).send(err);
                }
            );
    }


    function updateUser(req,res)
    {
        var userId = req.params.userId;
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
    }


    function deleteUser(req,res){

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
    }

    function findUserById(req,res)
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
    }

    function findFollowersByUserId(req,res){

        var userId = req.params.userId;

        userModel.getUserById(userId).then(
            function(doc)
            {
                if(doc)
                {
                    return userModel.getUserFollowers(doc.follower);
                }
                else
                {
                    res.json({});
                }

            },
            function(err)
            {
                res.status(400).send(err);
            }).
        then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(600).send(err);
            }
        );
    }


    function findFollowingByUserId(req,res){

        var userId = req.params.userId;

        userModel.getUserById(userId).then(

            function(doc)
            {
                if(doc)
                {
                    console.log(doc);
                    return userModel.getUserFollowing(doc.following);
                }
                else
                {
                    res.json({});
                }
            },
            function(err)
            {
                res.status(400).send(err);
            }).
        then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(600).send(err);
            }
        );
    }

    function updateUserFollowInfo(req,res)
    {
        var friendId = req.params.friendId;
        var currentUserId = req.params.currentUserId;

        userModel.updateFollowerInfo(friendId,currentUserId).then(
            function(doc)
            {
                console.log(doc);
                return userModel.updateFollowingInfo(currentUserId,doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }).
        then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(600).send(err);
            }
        );
    }


    function updateUserUnfollowInfo(req,res)
    {
        var friendId = req.params.friendId;
        var currentUserId = req.params.currentUserId;

        userModel.removeFollowerInfo(friendId,currentUserId).then(
            function(doc)
            {
                console.log(doc);
                return userModel.removeFollowingInfo(currentUserId,doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }).
        then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(600).send(err);
            }
        );
    }

};