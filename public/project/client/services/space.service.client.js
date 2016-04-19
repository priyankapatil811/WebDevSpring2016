/**
 * Created by Priyanka on 3/9/16.
 */
(function(){
    "use strict";
    angular
        .module("infoPinStrap")
        .factory("SpaceService",SpaceService);

    function SpaceService($http, $rootScope)
    {
        $rootScope.newsDetails = [];

        var url = "";
        var token = "def15a08-b97c-44b7-a238-8bb4bc04360b";
        
        var api =
        {
            findAllNews : findAllNews,
            createNews : createNews,
            deleteNewsById : deleteNewsById,
            addComment: addComment,
            deleteComment: deleteComment,
            findNews: findNews,
            findNewsForUser : findNewsForUser
        };

        return api;

        function findAllNews(keyword) {

            url = "https://webhose.io/search?token="+token+"&format=json&q=(site_type%3Anews)"+keyword;

            return $http.get(url);
        }

        function createNews(userId,news)
        {
            return $http.post("/api/project/user/"+userId+"/news",news);
        }

        function deleteNewsById(newsId,userId)
        {
            return $http.delete("/api/project/news/"+newsId+"/user/"+userId);
        }

        function addComment(news, user, comment) {
            return $http.post("/api/project/news/user/" + user + "?comment=" + comment, news);
        }

        function deleteComment(newsId, comment) {
            return $http.delete("/api/project/news/"+newsId+"/user/"+comment.user+"/comment/"+comment.comment);
        }

        function findNews(newsId)
        {
            return $http.get("/api/project/news/"+newsId);
        }

        function findNewsForUser(userId)
        {
            return $http.get("/api/project/user/"+userId+"/news");
        }
    }
})();
