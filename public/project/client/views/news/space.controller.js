/**
 * Created by Priyanka on 3/9/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("SpaceController", SpaceController);

    function SpaceController($scope, SpaceService, $rootScope, UserService) {

        var vm = this;
        vm.newsDetails = [];
        vm.spaceDetails = [];
        vm.searchSpaceNews = searchSpaceNews;
        vm.init = init;
        vm.addContent = addContent;
        vm.selectContent = selectContent;
        vm.updateContent = updateContent;
        vm.deleteContent = deleteContent;

        //$scope.searchSpaceNews = function (s) {

        function searchSpaceNews(s)
        {
              SpaceService.findAllNews(s.spacenews, function (data) {

                console.log("in space related news search");
                console.log(s.spacenews);
                vm.newsData = data;

                console.log(vm.newsData);
                for(var i=0;i<vm.newsData.posts.length;i++)
                {
                    var newsObj = new Object();
                    newsObj.id = vm.newsData.posts[i].uuid;
                    newsObj.title = vm.newsData.posts[i].thread.title;
                    newsObj.url = vm.newsData.posts[i].url;
                    newsObj.publishedDate = vm.newsData.posts[i].thread.published;
                    newsObj.image = vm.newsData.posts[i].thread.main_image;
                    newsObj.content = vm.newsData.posts[i].text;
                    newsObj.relatedStories = [];

                    vm.newsDetails.push(newsObj);
                    $rootScope.newsDetails.push(newsObj);
                }
                  console.log(vm.newsDetails);
                  console.log($rootScope.newsDetails);
/*
                for(var i=0;i<vm.newsData.responseData.results.length;i++)
                {
                    var newsObj = new Object();
                    newsObj.relatedStories = [];
                    newsObj.id = parseInt(Math.random() * 100);
                    newsObj.title = vm.newsData.responseData.results[i].titleNoFormatting;
                    newsObj.url = vm.newsData.responseData.results[i].unescapedUrl;
                    newsObj.content = vm.newsData.responseData.results[i].content;
                    newsObj.image = vm.newsData.responseData.results[i].image.url;
                    newsObj.relatedStories = vm.newsData.responseData.results[i].relatedStories;
                    newsObj.publishedDate = vm.newsData.responseData.results[i].publishedDate;
                    newsObj.publisher = vm.newsData.responseData.results[i].publisher;
                    vm.newsDetails.push(newsObj);
                    $rootScope.newsDetails.push(newsObj);
                }
                console.log(vm.newsDetails);
                console.log($rootScope.newsDetails);
                */
            });

        }

        /********** POC ************/
        function init()
        {
            SpaceService.findNews($rootScope.currentuser._id).then(
                function (response) {
                    vm.spaceDetails = response.data;
                });

            console.log(vm.spaceDetails);
        }

        if($rootScope.currentuser != null) {
            init();
        }


        function addContent()
        {
            SpaceService.createNews($rootScope.currentuser._id, vm.space).then(
                function(response){
                   init();
                });
        }

        function selectContent(index)
        {
            var spaceIndex = index;

            SpaceService.getNewsByIndex(spaceIndex,$rootScope.currentuser._id).then(
                function(response)
                {
                    vm.space = {
                        "_id" : response.data._id,
                        "title":response.data.title,
                        "url" :response.data.url,
                        "image":response.data.image,
                        "content" : response.data.content,
                        "userId" : response.data.userId
                    };
                });

            //SpaceService.getSpaceIdByIndex(spaceIndex,
            //    function(response)
            //    {
            //        $scope.spaceId = response;
            //    });
            //
            //console.log($scope.spaceId);
        }


        function updateContent()
        {
            console.log("in update Space" + vm.space._id);

            SpaceService.updateNewsById(vm.space._id,vm.space).then(
                function(response){
                    init();
                });
        }

        function deleteContent(index)
        {
            var spaceIndex = index;

            //function call return formId
            //SpaceService.getSpaceIdByIndex(spaceIndex,
            //    function(response)
            //    {
            //        $scope.spaceId = response;
            //    });

            SpaceService.deleteNewsById(spaceIndex,$rootScope.currentuser._id).then(
                function(response){
                    init();
                });

            //console.log($scope.spaceDetails);
        }
        /***************************/
    }
})();