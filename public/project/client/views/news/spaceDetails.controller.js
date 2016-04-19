/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("SpaceDetailsController", SpaceDetailsController);

    function SpaceDetailsController(SpaceService, $routeParams, UserService, $rootScope) {

        var vm = this;

        vm.user = {};
        vm.comments = [];
        vm.newsData = null;
        vm.newsIdParam = $routeParams.newsId;

        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.init = init;
        vm.getDetails = getDetails;
        vm.addNews = addNews;

        init();

        function getDetails()
        {
            SpaceService.findNews(vm.newsIdParam).then(
                function (response)
                {
                    if(response.data)
                    {
                        vm.comments = response.data.comments;
                    }
                }
            );
        }

        function init() {

            console.log("in init");

            for(var i=0;i<$rootScope.newsDetails.length;i++)
            {
                if($rootScope.newsDetails[i].id == vm.newsIdParam)
                {
                    vm.newsData = $rootScope.newsDetails[i];
                }
            }
            console.log(vm.newsData);

            if(!vm.newsData)
            {
                SpaceService.findNews(vm.newsIdParam).then(
                    function (response)
                    {
                        if(response.data)
                        {
                            console.log(response.data);
                            vm.newsData = response.data
                        }
                    }
                );
            }

            UserService.getCurrentUser()
                .then(function (response) {
                    UserService.findUserById(response.data._id)
                        .then(function (response) {
                            if (response.data) {
                                vm.user = response.data;
                            }
                        });
                });

            getDetails();

        }

        function addComment(comment,news) {

            console.log(news);
            SpaceService.addComment(news,vm.user.username,comment).then(
                function (response) {
                    if(response.data)
                    {
                        getDetails();
                    }
                }
            );
        }

        function deleteComment(comment)
        {
            console.log(comment);
            SpaceService.deleteComment(vm.newsIdParam,comment).then(
                function(response)
                {
                    if(response.data)
                    {
                        getDetails();
                    }
                }
            );
        }

        function addNews(news)
        {
            SpaceService.createNews(vm.user._id, news).then(
                function(response){
                    console.log(response.data);
                    vm.newsData.color = 'green';
                });
        }

    }
})();