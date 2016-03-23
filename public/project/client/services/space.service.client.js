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

        /********** POC ************/
        var spaces = [
            {"_id":123,
                "title":"Pluto New Horizons",
                "url" :"www.nasa.com",
                "image":"img1.jpeg",
                "content" : "This ethereal scene captured by NASA’s New " +
                "Horizons spacecraft tells yet another story of Pluto’s diversity ...",
                "userId" : 123
            },

            {"_id":456,
                "title":"Gravitational Waves Detected",
                "url" :"www.nasa.com",
                "image":"img2.jpeg",
                "content" : "A team of scientists announced on Thursday that they had heard and recorded " +
                "the sound of two black holes colliding a billion light-years away ...",
                "userId" : 234
            },

            {"_id":345,
                "title":"Ice Found on Mars",
                "url" :"www.nasa.com",
                "image":"img3.jpeg",
                "content" : "A giant slab of ice as big as California and Texas combined lurks just beneath" +
                " the surface of Mars between its equator and north pole, researchers say ...",
                "userId" : 123
            }
        ];
        /***************************/

        var url = "";

        var api =
        {
            findAllNews : findAllNews,
            findNewsById : findNewsById,

            /********** POC ************/
            createSpace : createSpace,
            findAllSpaces : findAllSpaces,
            deleteSpaceById : deleteSpaceById,
            updateSpaceById : updateSpaceById,
            getSpaceIdByIndex : getSpaceIdByIndex,
            getSpaceByIndex : getSpaceByIndex
            /***************************/
        };

        return api;

        function findAllNews(keyword,callback) {
            url = "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q="+keyword+
                "&dataType=json&callback=JSON_CALLBACK";

            $http.jsonp(url).success(callback);
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
        function getSpaceIdByIndex(index,callback)
        {
            callback(spaces[index]._id);
        }

        function getSpaceByIndex(index,callback)
        {
            callback(spaces[index]);
        }

        function createSpace(userId,space,callback)
        {
            var newSpace =
            {
                _id : Math.floor((Math.random() * 1000) + 1),
                //_id : (new Date).getTime(),
                "title":space.title,
                "url" :space.url,
                "image":space.image,
                "content" : space.content,
                "userId":userId
            };

            spaces.push(newSpace);
            //   console.log(curSpaces);

            findAllSpaces(userId,callback);
        }

        function findAllSpaces(userId,callback)
        {
            var spacesForUserId = [];
            for(var i=0;i<spaces.length;i++)
            {
                if(userId==spaces[i].userId)
                {
                    spacesForUserId.push(spaces[i]);
                }
            }

            callback(spacesForUserId);
        }

        function deleteSpaceById(spaceId, callback)
        {
            console.log(spaceId);

            spaces = spaces.filter(function(sId){
                return sId._id != spaceId;
            });

            console.log(spaces);

            findAllSpaces($rootScope.currentuser._id,callback);
        }

        function updateSpaceById(spaceId, newSpace, callback)
        {
            var index;
            for(var i=0;i<spaces.length;i++) {
                if (spaceId == spaces[i]._id) {
                    index = i;
                    break;
                }
            }

            spaces[index] =
            {
                "title":newSpace.title,
                "url" :newSpace.url,
                "image":newSpace.image,
                "content":newSpace.content,
                "userId":$rootScope.currentuser._id
            };

            console.log(spaces[index]);

            findAllSpaces($rootScope.currentuser._id,callback);
        }
        /***************************/
    }
})();