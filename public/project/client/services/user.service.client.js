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
        $rootScope.selectedCategory = 'recipe';
        $rootScope.currentuser = {"_id" : null, "firstName":null, "lastName":null, "username":null, "password":null , "interests" : null, "selectedCategory" : null, "users" : null};

        var api = {
            followUser : followUser,
            unFollowUser : unFollowUser,
            findUserFollowers : findUserFollowers,
            findUserFollowing : findUserFollowing,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            updateUser : updateUser,
            updatePwd : updatePwd,
            deleteUserById : deleteUserById,
            setCurrentUser : setCurrentUser,
            setSelectedCategory : setSelectedCategory,
            getCurrentUser : getCurrentUser,
            logout : logout
        };

        return api;

        function updatePwd(user)
        {
            console.log(user);
            return $http.put("/api/project/user",user);
        }

        function followUser(friendId,currentUserId)
        {
            return $http.put("/api/project/followOtherUser/"+friendId+"/user/"+currentUserId);
        }

        function unFollowUser(friendId,currentUserId)
        {
            return $http.put("/api/project/unFollowOtherUser/"+friendId+"/user/"+currentUserId);
        }

        function findUserFollowers(userId)
        {
            return $http.get("/api/project/user/followers/"+userId);
        }

        function findUserFollowing(userId)
        {
            return $http.get("/api/project/user/following/"+userId);
        }

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
            //return $http.get("/api/project/user?username="+username+"&password="+password)
            return $http.post("/api/project/login", {username : username, password: password});
        }

        function findAllUsers()
        {
            return $http.get("/api/project/user");
        }

        function createUser(user)
        {
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

        function setSelectedCategory(category)
        {
            if(category == "Cooking Recipes")
                $rootScope.selectedCategory = 'recipe';
            else if(category == "Events")
                $rootScope.selectedCategory = 'event';
            else
                $rootScope.selectedCategory = 'news';
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