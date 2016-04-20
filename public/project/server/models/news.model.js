/**
 * Created by Priyanka on 3/24/16.
 */

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
        deleteNewsById : deleteNewsById,
        addComment : addComment,
        deleteComment : deleteComment,
        findNewsById : findNewsById
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
                        newsId : news.newsId,
                        image: news.image,
                        title: news.title,
                        url : news.url,
                        content : news.content,
                        publishedDate : news.publishedDate,
                        users : [],
                        comments : []
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

    function addComment(news,user,comment)
    {
        var deferred = q.defer();

        console.log(news);
        console.log(user);
        console.log(comment);
        NewsModel.findOne({newsId : news.id},function(err,doc)
        {
            if(err)
                deferred.reject(err);

            if(doc)
            {
                console.log(comment);
                console.log(user);

                doc.comments.push({user : user, comment: comment, timePosted: new Date()});

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
                //create news as it does not exist
                newArticle = new NewsModel(
                    {
                        newsId : news.newsId,
                        image: news.image,
                        title: news.title,
                        url : news.url,
                        content : news.content,
                        publishedDate : news.publishedDate,
                        users : [],
                        comments : []
                    });

                newArticle.comments.push({user : user, comment:comment, timePosted: new Date()});

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

    function findNewsById(newsId)
    {
        var deferred = q.defer();

        NewsModel.findOne({newsId : newsId},function(err,doc)
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

        return deferred.promise;
    }

    function deleteComment(newsId,user,comment)
    {
        var deferred = q.defer();

        NewsModel.findOne({newsId : newsId},function(err,news)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else {
                console.log(news.comments);

                for (var i = 0; i < news.comments.length; i++) {
                    if ((user == news.comments[i].user) && (comment == news.comments[i].comment)) {
                        news.comments.splice(i, 1);
                        break;
                    }
                }

                news.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }
};