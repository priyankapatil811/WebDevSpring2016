/**
 * Created by Priyanka on 3/16/16.
 */
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
        findUserById : findUserById,
        findAllUsers : findAllUsers,
        createUser : createUser,
        createNewUser : createNewUser,
        deleteUserById : deleteUserById,
        updateUser : updateUser
    };

    return api;


    function createNewUser(newUser)
    {
        var deferred = q.defer();
        newUser.type = 'assignment';

        UserModel.create(newUser,function(err,doc)
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


    function findUserById(userId)
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
        user.type = 'assignment';

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

        console.log(user.password);

        UserModel.findById(userId,function(err,loggedInUser)
        {
           if(err)
               deferred.reject(err);
           else
           {
               loggedInUser.firstName = user.firstName;
               loggedInUser.lastName = user.lastName;
               if(typeof user.password != 'undefined')
                    loggedInUser.password = user.password;
               loggedInUser.username = user.username;
               loggedInUser.emails = user.emails;
               loggedInUser.phones = user.phones;
               loggedInUser.roles = user.roles;
               loggedInUser.type = 'assignment';
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