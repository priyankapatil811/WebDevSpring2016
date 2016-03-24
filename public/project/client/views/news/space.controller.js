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
        vm.searchSpaceNews = searchSpaceNews;

        //$scope.searchSpaceNews = function (s) {

            function searchSpaceNews(s)
            {
              SpaceService.findAllNews(s.spacenews, function (data) {

                console.log("in space related news search");
                console.log(s.spacenews);
                vm.newsData = data;


                console.log(vm.newsData);

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