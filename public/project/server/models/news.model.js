/**
 * Created by Priyanka on 3/24/16.
 */
var news = require("./news.mock.json");
var uuid = require('node-uuid');

var q = require("q");

module.exports = function(mongoose) {

    //load news schema
    var NewsSchema = require("./news.schema.server.js")(mongoose);

    //create news model from schema
    var NewsModel = mongoose.model('ProjNews', NewsSchema);

    var api =
    {
        likesNewsArticle : likesNewsArticle,
        findAllNewsForUser : findAllNewsForUser,
        deleteNewsById : deleteNewsById

        /********** POC ************/
       /* getNewsByIndex : getNewsByIndex,
        createNewsForUser : createNewsForUser,
        findNews : findNews,
        updateNewsById : updateNewsById*/
        /***************************/
    };

    return api;

    function likesNewsArticle(userId,news)
    {

        var deferred = q.defer();

        NewsModel.findOne({newsId : news.id},function(err,doc)
        {
            if(err)
                deferred.reject(err);

            if(doc)
            {
                doc.users.push(userId);

                doc.save(function(err,doc)
                {
                    if(err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }
            else
            {
                newArticle = new NewsModel(
                    {
                        newsId : news.id,
                        image: news.image,
                        title: news.title,
                        publishedDate : news.publishedDate,
                        users : []
                    });

                newArticle.users.push(userId);

                newArticle.save(function (err, doc) {
                    if (err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }

        });

        return deferred.promise;
    }

    function findAllNewsForUser(newsIds)
    {
        var deferred = q.defer();

        NewsModel.find({
                _id: {$in: newsIds}
            },
            function (err, users)
            {
                if (err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(users);
                }
            });

        return deferred.promise;
    }

    function deleteNewsById(newsId,userId)
    {
        var deferred = q.defer();

        NewsModel.findById(newsId,function (err, news) {
            if (err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<news.users.length;i++)
                {
                    if(userId == news.users[i])
                    {
                        news.users.splice(i,1);
                        break;
                    }
                }

                news.save(function(err,doc)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    /*
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
        //console.log(news);
    }

    function findNews(userId) {
        var newsForUserId = [];
        for (var i = 0; i < news.length; i++) {
            if (userId == news[i].userId) {
                newsForUserId.push(news[i]);
            }
        }
        //console.log(newsForUserId);
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
        //console.log(newsId);

        news = news.filter(function (sId) {
            return sId._id != newsId;
        });

        //console.log(news);
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

        //console.log(news);
    }
    */
};