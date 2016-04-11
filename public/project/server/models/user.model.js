/**
 * Created by Priyanka on 3/16/16.
 */
var curUsers = require("./user.mock.json");

//load q promise library
var q = require("q");

module.exports = function(db,mongoose)
{
    //load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create user model from schema
    var UserModel = mongoose.model('ProjUser',UserSchema);

    var api = {
        getUserById : getUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findAllUsers : findAllUsers,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUser : updateUser,
        userLikesRecipe : userLikesRecipe,
        userLikesEvent : userLikesEvent,
        userLikesArticle : userLikesArticle,
        removeRecipeLikes : removeRecipeLikes,
        removeNewsLikes : removeNewsLikes
    };

    return api;

    function getUserById(userId)
    {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    function findUserByUsername(username)
    {
        var deferred = q.defer();

        UserModel.findOne({username : username}, function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(username,password)
    {
        var deferred = q.defer();

        UserModel.findOne({username : username,password : password}, function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers()
    {
        //   return curUsers;
        var deferred = q.defer();

        UserModel.find({},function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createUser(user)
    {
        var deferred = q.defer();

        var categories = [];

        if(typeof user.category.event != 'undefined')
            categories.push(user.category.event);
        if(typeof user.category.recipe != 'undefined')
            categories.push(user.category.recipe);
        if(typeof user.category.news != 'undefined')
            categories.push(user.category.news);

        newUser = new UserModel(
            {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email : user.email,
                interests : categories,
                likesRecipe : [],
                likesEvent : [],
                likesArticle : []
            });

        newUser.save(function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        /*
        UserModel.create(user,function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });
        */
        return deferred.promise;
    }

    function deleteUserById(userId)
    {
        var deferred = q.defer();

        UserModel.remove({_id : userId},function(err,doc)
        {
            if(err)
                deferred.reject(err);
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(userId,user)
    {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,loggedInUser)
        {
            if(err)
                deferred.reject(err);
            else
            {
                loggedInUser.firstName = user.firstName;
                loggedInUser.lastName = user.lastName;
                loggedInUser.password = user.password;
                loggedInUser.username = user.username;
                loggedInUser.emails = user.emails;
                loggedInUser.phones = user.phones;
                loggedInUser.save(function (err,doc) {
                    if(err)
                        deferred.reject(err);
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }


    function userLikesRecipe(userId,recipe)
    {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,loggedInUser)
        {
            if (err)
                deferred.reject(err);
            else {

                loggedInUser.likesRecipe.push(recipe._id);

                loggedInUser.save(function (err,doc) {
                    if(err)
                        deferred.reject(err);
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function userLikesEvent(userId,event)
    {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,loggedInUser)
        {
            if (err)
                deferred.reject(err);
            else {

                loggedInUser.likesEvent.push(event._id);

                loggedInUser.save(function (err,doc) {
                    if(err)
                        deferred.reject(err);
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function userLikesArticle(userId,news)
    {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,loggedInUser)
        {
            if (err)
                deferred.reject(err);
            else {

                loggedInUser.likesArticle.push(news._id);

                loggedInUser.save(function (err,doc) {
                    if(err)
                        deferred.reject(err);
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function removeRecipeLikes(recipe,userId)
    {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,loggedInUser)
        {
            if (err)
                deferred.reject(err);
            else
            {
                for(var i=0;i<loggedInUser.likesRecipe.length;i++)
                {
                    if(recipe._id == loggedInUser.likesRecipe[i])
                    {
                        loggedInUser.likesRecipe.splice(i,1);
                        break;
                    }
                }

                loggedInUser.save(function(err,doc)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(doc);
                    }
                });
            }
        });
    }

    function removeNewsLikes(news,userId)
    {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,loggedInUser)
        {
            if (err)
                deferred.reject(err);
            else
            {
                for(var i=0;i<loggedInUser.likesArticle.length;i++)
                {
                    if(news._id == loggedInUser.likesArticle[i])
                    {
                        loggedInUser.likesArticle.splice(i,1);
                        break;
                    }
                }

                loggedInUser.save(function(err,doc)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(doc);
                    }
                });
            }
        });
    }
};