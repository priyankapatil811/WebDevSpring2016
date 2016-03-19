/**
 * Created by Priyanka on 2/21/16.
 */
(function(){
    "use strict";
    angular
       .module("FormBuilderApp")
       .factory("UserService",UserService);

    function UserService($rootScope, $http)
    {
        $rootScope.currentuser = {"_id" : null, "firstName":null, "lastName":null, "username":null, "password":null , "roles" : null};

        var api = {
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            updateUser : updateUser,
            deleteUserById : deleteUserById,
            setCurrentUser : setCurrentUser
        };

        return api;

        function findUserByUsername(username)
        {
            return $http.get("/api/assignment/user?username="+username)
        }

        function findUserByCredentials(username,password)
        {
            return $http.get("/api/assignment/user?username="+username+"&password="+password)
        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/user");
        }

        function createUser(user)
        {
            console.log(user);
            return $http.post("/api/assignment/user",user)
        }

        function updateUser(userId,user)
        {
            return $http.put("/api/assignment/user/"+userId,user)
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/assignment/user="+userId);
        }

        function setCurrentUser(user)
        {
            $rootScope.currentuser = user;
        }
    }
})();