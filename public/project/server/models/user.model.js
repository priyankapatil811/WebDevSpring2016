/**
 * Created by Priyanka on 3/16/16.
 */
var curUsers = require("./user.mock.json");

module.exports = function()
{
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
        var matchedUser = "";

        for(var i=0;i<curUsers.length;i++)
        {
            if(curUsers[i].username == username && curUsers[i].password == password){
                matchedUser = curUsers[i];
                return matchedUser;
            }
        }
        console.log("match not found!");
        return null;
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
        return curUsers;
    }

    function createUser(user)
    {
        var newUser =
        {
            _id : Math.floor((Math.random() * 1000) + 1),
            //_id : (new Date).getTime(),
            username : user.username,
            password : user.password,
            email : user.email,
            firstName : null,
            lastName: null,
            roles : null
        };

        curUsers.push(newUser);
        //   console.log(curUsers);

        return newUser;
    }

    function deleteUserById(userId)
    {
        for(var i=0;i<curUsers.length;i++)
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
        return remUsers;
    }

    function updateUser(userId,user)
    {
        var index;
        for(var i=0;i<curUsers.length;i++)
        {
            if(curUsers[i]._id == userId)
            {
                index = i;
                break;
            }
        }

        curUsers[index] =
        {
            _id : userId,
            firstName : user.firstName,
            lastName : user.lastName,
            password : user.password,
            username : user.username,
            email : user.email,
            roles: user.roles
        };

        return curUsers[index];
    }

};