/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("SpaceDetailsController", SpaceDetailsController);

    function SpaceDetailsController(SpaceService, $routeParams, $rootScope, UserService) {

        var vm = this;

        SpaceService.findNewsById($routeParams.newsId, function (data) {
            console.log("in news Id search");
            console.log($routeParams.newsId);
            vm.newsData = data;
            vm.relatedStories = [];

        if(vm.newsData.relatedStories != null) {
            for (var i = 0; i < vm.newsData.relatedStories.length; i++) {
                var newsObj = new Object();
                newsObj.id = parseInt(Math.random() * 100);
                newsObj.title = vm.newsData.relatedStories[i].titleNoFormatting;
                newsObj.url = vm.newsData.relatedStories[i].unescapedUrl;
                newsObj.content = vm.newsData.relatedStories[i].content;
                newsObj.publishedDate = vm.newsData.relatedStories[i].publishedDate;
                newsObj.publisher = vm.newsData.relatedStories[i].publisher;
                vm.relatedStories.push(newsObj);
            }
        }
        });
    }
})();