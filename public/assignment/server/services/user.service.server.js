/**
 * Created by Priyanka on 3/16/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app,userModel)
{
    var auth = authorized;
    var isAdmin = isAdmin;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedIn);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/user", auth,findUser);
    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:userId", auth,updateUser);
    app.delete("/api/assignment/user/:userId", auth,deleteUser);

    /******************ADMIN******************/

    app.post("/api/assignment/admin/user",auth,isAdmin,createUser);
    app.get("/api/assignment/admin/user",auth,isAdmin,findAllUsers);
    app.get("/api/assignment/admin/user/:userId",auth,isAdmin,findUser);
    app.delete("/api/assignment/admin/user/:userId",auth,isAdmin,deleteUser);
    app.put("/api/assignment/admin/user/:userId",auth,isAdmin,updateUser);

    /*****************************************/

    function login(req,res)
    {
        var user = req.user;
        res.json(user);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req,res)
    {
        req.logOut();
        res.send(200);
    }

    function localStrategy(username,password,done)
    {
        userModel.findUserByUsername(username).then(
            function(user)
            {
                if(!user)
                {
                    return done(null,false);
                }
                else
                {
                    if(user && bcrypt.compareSync(password,user.password))
                        return done(null,user);
                }
            },
            function(err)
            {
                if(err)
                {
                    return done(err);
                }
            }
        );
    }

    function findAllUsers(req,res)
    {
        userModel.findAllUsers().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findUser(req,res)
    {
        var uName = req.query.username;
        var uPwd = req.query.password;

        if(typeof uName == 'undefined' && typeof uPwd == 'undefined') {
            userModel.findAllUsers().then(
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
    }

    function createUser(req,res)
    {
        var newUser = req.body;
        newUser.roles = ["student"];
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

    function deleteUser(req,res)
    {
        var delUser = req.params.userId;

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

    function serializeUser(user,done)
    {
        done(null,user);
    }

    function deserializeUser(user,done)
    {
        userModel.findUserById(user._id).then(
            function(user)
            {
                done(null,user);
            },
            function(err)
            {
                done(err,null);
            }
        );
    }

    function isAdmin(req,res,next)
    {
        if(req.user.roles.indexOf("admin")>=0)
        {
            next();
        }
        else
        {
            res.send(403);
        }
    }

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
};