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

        var api =
        {
            findAllNews : findAllNews,
            findNewsById : findNewsById,
            createNews : createNews,
            deleteNewsById : deleteNewsById,
            addComment: addComment,
            deleteComment: deleteComment,
            findNews: findNews,
            findNewsForUser : findNewsForUser

            /********** POC ************/
            //findNews : findNews,
            //updateNewsById : updateNewsById,
            //getNewsByIndex : getNewsByIndex
            /***************************/
        };

        return api;

        function findAllNews(keyword) {
          /*  url = "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q="+keyword+
                "&dataType=json&callback=JSON_CALLBACK"; */

            url = "https://webhose.io/search?token=def15a08-b97c-44b7-a238-8bb4bc04360b&format=json&q=(site_type%3Anews)"+keyword;

            return $http.get(url);
        }

        function findNewsById(newsId,callback) {

            for(var i=0;i<$rootScope.newsDetails.length;i++){

                if(newsId == $rootScope.newsDetails[i].id)
                {
                    callback($rootScope.newsDetails[i]);
                }
            }
            callback({});
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

        /********** POC ************/

        //function findNewsForUser(userId)
        //{
        //    return $http.get("/api/project/user/"+userId+"/news");
        //}
        //
        //function getNewsByIndex(index,userId)
        //{
        //    return $http.get("/api/project/news/"+index+"/user/"+userId);
        //}
        //
        //
        //
        //function findNews(userId)
        //{
        //    return $http.get("/api/project/user/"+userId+"/news");
        //}
        //
        //
        //
        //function updateNewsById(newsId, newNews)
        //{
        //    return $http.put("/api/project/news/"+newsId,newNews);
        //}
        /***************************/
    }
})();