/**
 * Created by Priyanka on 3/16/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app,userModel)
{
    var auth = authorized;

    app.get("/api/project/loggedin", loggedIn);
    app.post("/api/project/logout", logout);
    app.get("/api/project/user", auth, findUser);
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:userId", auth, updateUser);
    app.delete("/api/project/user/:userId", auth, deleteUser);
    app.put("/api/project/user",auth,updatePassword)

    /**************** FUNCTIONALITY RELATED*****************/
    app.get("/api/project/user/:id",findUserById);
    app.get("/api/project/user/followers/:userId",findFollowersByUserId);
    app.get("/api/project/user/following/:userId",findFollowingByUserId);
    app.put("/api/project/followOtherUser/:friendId/user/:currentUserId",updateUserFollowInfo);
    app.put("/api/project/unFollowOtherUser/:friendId/user/:currentUserId",updateUserUnfollowInfo);
    /*******************************************************/

    function authorized(req,res,next)
    {
        if(!req.isAuthenticated())
        {
            res.send(401);
        }
        else
        {
            next();
        }
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req,res)
    {
        req.logOut();
        res.send(200);
    }

    function updatePassword(req,res)
    {
        var user = req.body;

        user.password = bcrypt.hashSync(req.body.password);

        userModel.updatePassword(user).then
        (
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(700).send(err);
            }
        );
    }

    function findUser(req,res)
    {
        var uName = req.query.username;
        var uPwd = req.query.password;
        console.log(uName);
        console.log(uPwd);

        if(typeof uName == 'undefined' && typeof uPwd == 'undefined') {
            userModel.findAllUsers().then(
                function (doc) {
                    console.log("getting all the users : " +doc);
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
        newUser.password = bcrypt.hashSync(req.body.password);

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
                    if(user)
                    {
                        req.login(user,function(err)
                        {
                            if(err) {
                                res.status(500).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
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

        upUser.password = bcrypt.hashSync(req.body.password);

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

    //function serializeUser(user,done)
    //{
    //    done(null,user);
    //}

    function deserializeUser(user,done)
    {
        console.log("inside deserialize");
        if(user.type == 'project') {
            console.log("in check for project");
            userModel.findUserById(user._id).then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
        }
    }

    //function authorized(req,res,next)
    //{
    //    if(!req.isAuthenticated())
    //    {
    //        res.send(401);
    //    }
    //    else
    //    {
    //        next();
    //    }
    //}

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

    //
    //app.post("/api/project/user",function(req,res){
    //    var newUser = req.body;
    //    userModel.createUser(newUser).then(
    //        function(doc)
    //        {
    //            req.session.currentUser = doc;
    //            res.json(doc);
    //        },
    //        function(err)
    //        {
    //            res.status(400).send(err);
    //        }
    //    );
    //});


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