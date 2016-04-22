/**
 * Created by Priyanka on 2/20/16.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope, UserService, $location)
    {
        var vm = this;
        vm.user = {};

        vm.update = update;

        UserService.getCurrentUser().then(
              function(response)
              {
                 if(response.data)
                 {
                     vm.user = response.data;
                 }
              }
        );

        console.log($rootScope.currentuser);

        function update(user)
        {
            console.log("in update");
            console.log(user);
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    if(response.data) {
                        console.log("response : " + response.data);
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();