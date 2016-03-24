/**
 * Created by Priyanka on 3/24/16.
 */
var news = require("./news.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
    var api =
    {
        //findAllNews : findAllNews,
        //findNewsById : findNewsById,

        /********** POC ************/
        getNewsByIndex : getNewsByIndex,
        createNewsForUser : createNewsForUser,
        findNews : findNews,
        deleteNewsById : deleteNewsById,
        updateNewsById : updateNewsById
        /***************************/
    };

    return api;

    function getNewsByIndex(index, userId) {
        var userNews = [];

        for (var i = 0; i < news.length; i++)
        {
            if(userId == news[i].userId)
            {
                userNews.push(news[i]);
            }
        }

        return userNews[index];
    }

    function createNewsForUser(userId, cnews) {
        var newnews =
        {
            _id: uuid.v1(),
            //_id : (new Date).getTime(),
            "title": cnews.title,
            "url": cnews.url,
            "image": cnews.image,
            "content": cnews.content,
            "userId": userId
        };

        news.push(newnews);
        console.log(news);
    }

    function findNews(userId) {
        var newsForUserId = [];
        for (var i = 0; i < news.length; i++) {
            if (userId == news[i].userId) {
                newsForUserId.push(news[i]);
            }
        }
        console.log(newsForUserId);
        return newsForUserId;
    }

    function deleteNewsById(newsIndex, userId) {
        var userNews = [];

        for (var i = 0; i < news.length; i++)
        {
            if(userId == news[i].userId)
            {
                userNews.push(news[i]);
            }
        }

        var newsId = userNews[newsIndex]._id;
        console.log(newsId);

        news = news.filter(function (sId) {
            return sId._id != newsId;
        });

        console.log(news);
    }

    function updateNewsById(newsId, newnews) {
        var index;
        var userId;

        for (var i = 0; i < news.length; i++) {
            if (newsId == news[i]._id) {
                index = i;
                userId = news[i].userId;
                break;
            }
        }

        news[index] =
        {
            "id" : newsId,
            "title": newnews.title,
            "url": newnews.url,
            "image": newnews.image,
            "content": newnews.content,
            "userId": userId
        };

        console.log(news);
    }
};