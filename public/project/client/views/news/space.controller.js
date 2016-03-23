/**
 * Created by Priyanka on 3/9/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("SpaceController", SpaceController);

    function SpaceController($scope, SpaceService, $rootScope, UserService) {

        $scope.searchSpaceNews = function (s) {

            SpaceService.findAllNews(s.spacenews, function (data) {

                console.log("in space related news search");
                console.log(s.spacenews);
                $scope.newsData = data;
                $scope.newsDetails = [];

                console.log($scope.newsData);

                for(var i=0;i<$scope.newsData.responseData.results.length;i++)
                {
                    var newsObj = new Object();
                    newsObj.relatedStories = [];
                    newsObj.id = parseInt(Math.random() * 100);
                    newsObj.title = $scope.newsData.responseData.results[i].titleNoFormatting;
                    newsObj.url = $scope.newsData.responseData.results[i].unescapedUrl;
                    newsObj.content = $scope.newsData.responseData.results[i].content;
                    newsObj.image = $scope.newsData.responseData.results[i].image.url;
                    newsObj.relatedStories = $scope.newsData.responseData.results[i].relatedStories;
                    newsObj.publishedDate = $scope.newsData.responseData.results[i].publishedDate;
                    newsObj.publisher = $scope.newsData.responseData.results[i].publisher;
                    $scope.newsDetails.push(newsObj);
                    $rootScope.newsDetails.push(newsObj);
                }
                console.log($scope.newsDetails);
                console.log($rootScope.newsDetails);
            });
        };

        /********** POC ************/
        if($rootScope.currentuser != null) {
            SpaceService.findAllSpaces($rootScope.currentuser._id,
                function (response) {
                    $scope.spaceDetails = response;
                });

            console.log($scope.spaceDetails);
        }

        $scope.addContent = function()
        {
            SpaceService.createSpace($rootScope.currentuser._id,
                $scope.space,
                function(response){
                    $scope.spaceDetails = response;
                });

            console.log($scope.spaceDetails);
        };

        $scope.selectContent = function(index)
        {
            var spaceIndex = index;

            SpaceService.getSpaceByIndex(spaceIndex,
                function(response)
                {
                    $scope.space = {
                        "title":response.title,
                        "url" :response.url,
                        "image":response.image,
                        "content" : response.content
                    };
                });

            SpaceService.getSpaceIdByIndex(spaceIndex,
                function(response)
                {
                    $scope.spaceId = response;
                });

            console.log($scope.spaceId);
        }


        $scope.updateContent = function()
        {
            console.log("in update Space" + $scope.spaceId);

            SpaceService.updateSpaceById($scope.spaceId,$scope.space,
                function(response){
                    $scope.spaceDetails = response;
                });

            console.log($scope.spaceDetails);
        };

        $scope.deleteContent = function(index)
        {
            var spaceIndex = index;

            //function call return formId
            SpaceService.getSpaceIdByIndex(spaceIndex,
                function(response)
                {
                    $scope.spaceId = response;
                });

            SpaceService.deleteSpaceById($scope.spaceId,
                function(response){
                    $scope.spaceDetails = response;
                });

            console.log($scope.spaceDetails);
        }
        /***************************/
    }
})();