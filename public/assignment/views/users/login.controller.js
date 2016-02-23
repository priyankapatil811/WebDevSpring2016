/**
 * Created by Priyanka on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $rootScope, UserService, $location)
    {
        var flag = 0;
        $scope.login = function ()
        {
            console.log("in login");
            UserService.findUserByCredentials($scope.user.username,$scope.user.password,
                function (response) {
                    console.log(response);
                    if(response == "-1")
                    {
                        console.log("Please register!");
                        alert("Please register! User does not exist!");
                    }
                    else
                    {
                        $rootScope.currentuser = response;

                        for(var i=0;i<$rootScope.currentuser.roles.length;i++)
                            if($rootScope.currentuser.roles[i] == "admin")
                            {
                                flag = 1;
                                break;
                            }

                        if(flag==0)
                            $location.url('/profile');
                        else
                            $location.url('/admin');
                    }
                });
            //console.log($rootScope.currentuser);
        };
    };
})();