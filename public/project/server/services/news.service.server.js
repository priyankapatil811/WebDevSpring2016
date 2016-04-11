/**
 * Created by Priyanka on 3/24/16.
 */
module.exports = function(app,userModel,newsModel)
{
    app.post("/api/project/user/:userId/news", function(req,res) {
        var userId = req.params.userId;
        var newnews = req.body;

        newsModel.likesNewsArticle(userId,newnews).then(
            function(doc)
            {
                console.log("news " + doc);
                return userModel.userLikesArticle(userId,doc);
            } ,
            function(err)
            {
                console.log(err);
                res.status(600).send(err);
            }
        ).then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(400).send(err);
            }
        );
        //res.json("ok");
    });

    app.get("/api/project/news/:newsId",function(req,res)
    {
        var newsId = req.params.newsId;

        newsModel.findNewsByIdForUser(newsId).then(
            function(doc)
            {
                res.json(doc);
            },
            function(err)
            {
                res.status(600).send(err);
            });
    });

    app.put("/api/project/news/:newsId", function(req,res)
    {
        var newsId = req.params.newsId;
        var upnews = req.body;
        newsModel.updateNewsById(newsId,upnews);
        res.json("ok");
    });

    //added userId parameter
    app.delete("/api/project/news/:newsId/user/:userId", function(req,res) {
        var delnewsId = req.params.newsId;
        var userId = req.params.userId;
        newsModel.deleteNewsById(delnewsId,userId).then(
            function(doc)
            {
                return userModel.removeNewsLikes(doc,userId);
            },
            function(err)
            {
                console.log(err);
                res.status(600).send(err);
            }).
            then(
                function(doc)
                {
                    res.json(doc);
                },
                function(err)
                {
                    res.status(400).send(err);
                }
            );
    });

    //added userId parameter
    app.get("/api/project/news/:newsId/user/:userId", function(req,res)
    {
        var newsIndex = req.params.newsId;
        var userId = req.params.userId;
        var news = newsModel.getNewsByIndex(newsIndex,userId);
        res.json(news);
    });

    app.get("/api/project/user/:userId/news", function(req,res)
    {
        var userId = req.params.userId;
        var news = newsModel.findNews(userId);
        res.json(news);
    });

};