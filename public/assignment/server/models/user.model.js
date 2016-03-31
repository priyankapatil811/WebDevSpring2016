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
        findUserById : findUserById,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUser : updateUser
    };

    return api;

    function findUserByUsername(username)
    {
        var matchedUser = "";
        for(var i=0;i<curUsers.length;i++)
        {
            if(curUsers[i].username == username){
                matchedUser = curUsers[i];
                return matchedUser;
            }
        }
        console.log("match not found!");
        return null;
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

    function findUserById(userId)
    {
        for(var i=0;i<curUsers.length;i++)
        {
            if(curUsers[i]._id == userId)
            {
                return curUsers[i];
            }
        }
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
        /*for(var i=0;i<curUsers.length;i++)
        {
            if(curUsers[i]._id == userId)
            {
                var remId = userId;

                var remUsers = curUsers.filter(function(uId){
                    return uId._id != remId;
                });

                break;
            }
        }
        return remUsers;*/

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

        UserModel.findById(userId,function(err,curUser)
        {
           if(err)
               deferred.reject(err);
           else
           {
               curUser.firstName = user.firstName;
               curUser.lastName = user.lastName;
               curUser.password = user.password;
               curUser.username = user.username;
               curUser.emails.push(user.email);
               curUser.phones.push(user.phone);
               curUser.save(function (err,doc) {
                   if(err)
                       deferred.reject(err);
                   else
                       deferred.resolve(doc);
               });
           }
        });

        return deferred.promise;
    }

};