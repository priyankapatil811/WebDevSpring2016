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
        var searchKeyWord = "";
        var token = "";

        var api =
        {
            findAllNews : findAllNews,
            findNewsById : findNewsById,

            /********** POC ************/
            setSearchKeyword : setSearchKeyword,
            getSearchKeyword : getSearchKeyword,
            findNewsByIdForUser : findNewsByIdForUser,
            createNews : createNews,
            findNews : findNews,
            deleteNewsById : deleteNewsById,
            updateNewsById : updateNewsById,
            getNewsByIndex : getNewsByIndex
            /***************************/
        };

        return api;

        function findAllNews(keyword) {
          /*  url = "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q="+keyword+
                "&dataType=json&callback=JSON_CALLBACK"; */

            url = "https://webhose.io/search?token="+token+"&format=json&q=(site_type%3Anews)"+keyword;

            return $http.get(url);
        }

        function findNewsById(newsId,callback) {

            for(var i=0;i<$rootScope.newsDetails.length;i++){
                if(newsId == $rootScope.newsDetails[i].id)
                {
                    callback($rootScope.newsDetails[i]);
                }
            }
        }

        /********** POC ************/

        function setSearchKeyword(query)
        {
            searchKeyWord = query;
        }

        function getSearchKeyword()
        {
            return searchKeyWord;
        }

        function findNewsByIdForUser(newsId)
        {
            return $http.get("/api/project/news/"+newsId);
        }

        function getNewsByIndex(index,userId)
        {
            return $http.get("/api/project/news/"+index+"/user/"+userId);
        }

        function createNews(userId,news)
        {
            return $http.post("/api/project/user/"+userId+"/news",news);
        }

        function findNews(userId)
        {
            return $http.get("/api/project/user/"+userId+"/news");
        }

        function deleteNewsById(newsId,userId)
        {
            return $http.delete("/api/project/news/"+newsId+"/user/"+userId);
        }

        function updateNewsById(newsId, newNews)
        {
            return $http.put("/api/project/news/"+newsId,newNews);
        }
        /***************************/
    }
})();
