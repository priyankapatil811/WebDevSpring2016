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
        vm.showSpinner = false;
        vm.showError = false;
        vm.newsDetails = [];
        vm.spaceDetails = [];
        vm.searchSpaceNews = searchSpaceNews;
        vm.addNews = addNews;


        function searchSpaceNews(s)
        {
            if(!vm.s)
            {
                vm.showSpinner = false;
                alert("Please enter a topic to search for its news");
            }
            else {
                vm.showSpinner = true;
                SpaceService.findAllNews(s.spacenews).then(function (response) {
                    vm.newsDetails = [];
                    console.log("in space related news search");
                    console.log(s.spacenews);
                    vm.newsData = response.data;
                    console.log("News Data : " + vm.newsData);

                    if(vm.newsData.posts.length < 1)
                    {
                        vm.showSpinner = false;
                        vm.showError = true;
                    }
                    else {
                        for (var i = 0; i < vm.newsData.posts.length; i++) {
                            var newsObj = new Object();
                            newsObj.id = vm.newsData.posts[i].uuid;
                            newsObj.newsId = vm.newsData.posts[i].uuid;
                            newsObj.title = vm.newsData.posts[i].thread.title;
                            newsObj.url = vm.newsData.posts[i].url;
                            newsObj.publishedDate = vm.newsData.posts[i].thread.published;
                            if (vm.newsData.posts[i].thread.main_image == "")
                                newsObj.image = "images/NoImage.png";
                            newsObj.image = vm.newsData.posts[i].thread.main_image;
                            newsObj.content = vm.newsData.posts[i].text;
                            newsObj.relatedStories = [];
                            newsObj.color = 'purple';

                            vm.newsDetails.push(newsObj);
                            $rootScope.newsDetails.push(newsObj);
                        }
                        console.log(vm.newsDetails);
                        console.log($rootScope.newsDetails);
                        vm.showSpinner = false;
                    }
                });
            }
        }

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
                    news.color = 'green';
                });
        }

    }
})();