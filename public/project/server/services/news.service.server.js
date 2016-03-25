/**
 * Created by Priyanka on 3/24/16.
 */
module.exports = function(app,userModel,newsModel)
{
    app.post("/api/project/user/:userId/news", function(req,res) {
        var userId = req.params.userId;
        var newnews = req.body;
        newsModel.createNewsForUser(userId,newnews);
        res.json("ok");
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
        newsModel.deleteNewsById(delnewsId,userId);
        res.json("ok");
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