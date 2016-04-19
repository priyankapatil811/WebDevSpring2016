/**
 * Created by Priyanka on 3/11/16.
 */
(function () {
    "use strict";
    angular
        .module("infoPinStrap")
        .controller("EventDetailsController", EventDetailsController);

    function EventDetailsController(EventService, $routeParams, UserService, $rootScope) {

        var vm = this;
        vm.user = {};
        vm.eventData = null;
        vm.comments = [];
        vm.eventIdParam = $routeParams.eventId;

        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.init = init;
        vm.getDetails = getDetails;
        vm.addEvent = addEvent;

        init();

        function init() {

            console.log("find event by id");

            for(var i=0;i<$rootScope.eventDetails.length;i++)
            {
                if($rootScope.eventDetails[i].id == vm.eventIdParam)
                {
                    vm.eventData = $rootScope.eventDetails[i];
                }
            }

            if(!vm.eventData) {
                EventService.findEvent(vm.eventIdParam).then(
                    function (response) {
                        if (response.data) {
                            vm.eventData = response.data;
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

        function getDetails()
        {
            EventService.findEvent(vm.eventIdParam).then(
                function (response)
                {
                    if(response.data)
                    {
                        console.log(response.data.comments);
                        vm.comments = response.data.comments;
                    }
                }
            );
        }


        function addComment(comment,event) {

            EventService.addComment(event,vm.user.username,comment).then(
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
            EventService.deleteComment(vm.eventIdParam,comment).then(
                function(response)
                {
                    if(response.data)
                    {
                        getDetails();
                    }
                }
            );
        }

        function addEvent(event)
        {
            console.log(event.color);
            EventService.createEvent(vm.user._id,event).then(
                function(response){
                    console.log(response.data);
                    vm.eventData.color = 'green';
                });
        }
    }
})();