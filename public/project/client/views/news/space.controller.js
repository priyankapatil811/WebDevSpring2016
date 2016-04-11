/**
 * Created by Priyanka on 3/9/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("SpaceController", SpaceController);

    function SpaceController(SpaceService, $rootScope, UserService) {

        var vm = this;
        vm.newsDetails = [];
        vm.spaceDetails = [];
        vm.searchSpaceNews = searchSpaceNews;
        vm.addNews = addNews;
        /*
        vm.init = init;
        vm.addContent = addContent;
        vm.selectContent = selectContent;
        vm.updateContent = updateContent;
        vm.deleteContent = deleteContent;*/

        //$scope.searchSpaceNews = function (s) {

        function searchSpaceNews(s)
        {
              SpaceService.findAllNews(s.spacenews).then(function (response) {
                vm.newsDetails = [];
                console.log("in space related news search");
                console.log(s.spacenews);
                vm.newsData = response.data;
                console.log("News Data : " +vm.newsData);

                for(var i=0;i<vm.newsData.posts.length;i++)
                {
                    var newsObj = new Object();
                    newsObj.id = vm.newsData.posts[i].uuid;
                    newsObj.title = vm.newsData.posts[i].thread.title;
                    newsObj.url = vm.newsData.posts[i].url;
                    newsObj.publishedDate = vm.newsData.posts[i].thread.published;
                    if(vm.newsData.posts[i].thread.main_image == "")
                        newsObj.image = "images/NoImage.png";
                    newsObj.image = vm.newsData.posts[i].thread.main_image;
                    newsObj.content = vm.newsData.posts[i].text;
                    newsObj.relatedStories = [];

                    vm.newsDetails.push(newsObj);
                    $rootScope.newsDetails.push(newsObj);
                }
                  console.log(vm.newsDetails);
                  console.log($rootScope.newsDetails);
            });

        }

        /********** POC ************/

        var user = "";
        UserService
            .getCurrentUser()
            .then(function(response) {
                user = response.data;
            });

        function addNews(news)
        {
            SpaceService.createNews(user._id, news).then(
                function(response){
                    console.log(response.data);
                });
        }

        /*
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
        */
        /***************************/
    }
})();