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
    var UserModel = mongoose.model('User',UserSchema);

    var api = {
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findAllUsers : findAllUsers,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUser : updateUser
    };

    return api;

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

};