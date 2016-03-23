/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("SpaceDetailsController", SpaceDetailsController);

    function SpaceDetailsController($scope, SpaceService, $routeParams, $rootScope, UserService) {

        SpaceService.findNewsById($routeParams.newsId, function (data) {
            console.log("in news Id search");
            console.log($routeParams.newsId);
            $scope.newsData = data;
            $scope.relatedStories = [];

        if($scope.newsData.relatedStories != null) {
            for (var i = 0; i < $scope.newsData.relatedStories.length; i++) {
                var newsObj = new Object();
                newsObj.id = parseInt(Math.random() * 100);
                newsObj.title = $scope.newsData.relatedStories[i].titleNoFormatting;
                newsObj.url = $scope.newsData.relatedStories[i].unescapedUrl;
                newsObj.content = $scope.newsData.relatedStories[i].content;
                newsObj.publishedDate = $scope.newsData.relatedStories[i].publishedDate;
                newsObj.publisher = $scope.newsData.relatedStories[i].publisher;
                $scope.relatedStories.push(newsObj);
            }
        }
        });
    }
})();