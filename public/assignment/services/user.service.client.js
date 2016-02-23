/**
 * Created by Priyanka on 2/21/16.
 */
(function(){
    "use strict";
    angular
       .module("FormBuilderApp")
       .factory("UserService",UserService);

    function UserService($rootScope)
    {
        $rootScope.currentuser = {"_id" : null, "firstName":null, "lastName":null, "username":null, "password":null , "roles" : null};

        var curUsers = [
            {"_id":123,
             "firstName":"Alice",
             "lastName":"Wonderland",
             "username":"alice",
             "password":"alice",
             "roles": ["student"]},

            {"_id":234,
             "firstName":"Bob",
             "lastName":"Hope",
             "username":"bob",
             "password":"bob",
             "roles": ["admin"]},

            {"_id":345,
             "firstName":"Charlie",
             "lastName":"Brown",
             "username":"charlie",
             "password":"charlie",
             "roles": ["faculty"]},

            {"_id":456,
             "firstName":"Dan",
             "lastName":"Craig",
             "username":"dan",
             "password":"dan",
             "roles": ["faculty", "admin"]},

            {"_id":567,
             "firstName":"Edward",
             "lastName":"Norton",
             "username":"ed",
             "password":"ed",
             "roles": ["student"]}
        ];

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };

        return api;

        function findUserByCredentials(username,password,callback)
        {
            var matchedUser = -1;
            for(var i=0;i<curUsers.length;i++)
            {
                if(curUsers[i].username == username && curUsers[i].password == password){
                    matchedUser = curUsers[i];
                    break;
                }
            }
            callback(matchedUser);
        }

        function findAllUsers(callback)
        {
            callback(curUsers);
        }

        function createUser(user,callback)
        {
            var newUser =
            {
                _id : Math.floor((Math.random() * 1000) + 1),
                //_id : (new Date).getTime(),
                username : user.username,
                password : user.password
            };

            curUsers.push(newUser);
            console.log(curUsers);

            callback(newUser);
        }

        function deleteUserById(userId,callback)
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
            callback(remUsers);
        }

        function updateUser(userId,user,callback)
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

            updateUser[index] =
            {
                _id : userId,
                firstName : user.firstName,
                lastName : user.lastName,
                password : user.password,
                username : user.username
            };

            callback(updateUser);
        }
    }
})();