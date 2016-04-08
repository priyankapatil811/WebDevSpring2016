/**
 * Created by Priyanka on 2/21/16.
 */
(function(){
    "use strict";
    angular
       .module("infoPinStrap")
       .factory("UserService",UserService);

    function UserService($rootScope, $http)
    {
        $rootScope.selectedCategory = 'event';
        $rootScope.currentuser = {"_id" : null, "firstName":null, "lastName":null, "username":null, "password":null , "interests" : null, "selectedCategory" : null};

        var api = {
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            updateUser : updateUser,
            deleteUserById : deleteUserById,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            logout : logout
        };

        return api;

        function findUserById(userId)
        {
            return $http.get("/api/project/user/"+userId);
        }

        function findUserByUsername(username)
        {
            return $http.get("/api/project/user?username="+username)
        }

        function findUserByCredentials(username,password)
        {
            return $http.get("/api/project/user?username="+username+"&password="+password)
        }

        function findAllUsers()
        {
            return $http.get("/api/project/user");
        }

        function createUser(user)
        {
            console.log(user);
            return $http.post("/api/project/user",user)
        }

        function updateUser(userId,user)
        {
            return $http.put("/api/project/user/"+userId,user)
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/project/user="+userId);
        }

        function setCurrentUser(user)
        {
            $rootScope.currentuser = user;
        }

        function getCurrentUser()
        {
            return $http.get("/api/project/loggedin");
        }

        function logout()
        {
            return $http.post("/api/project/logout");
        }
    }
})();