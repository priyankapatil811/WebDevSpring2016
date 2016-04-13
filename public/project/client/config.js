/**
 * Created by Priyanka on 2/20/16.
 */
(function(){
    angular
        .module("infoPinStrap")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl : "views/home/home.view.html",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs : "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs : "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/myAccount", {
                templateUrl: "views/users/myAccount.view.html",
                controller : "AccountController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/maevent", {
                templateUrl: "views/events/myAccountEvent.view.html",
                controller: "EventController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/marecipe", {
                templateUrl: "views/recipes/myAccountRecipe.view.html",
                controller: "RecipeController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/maspace", {
                templateUrl: "views/news/myAccountSpace.view.html",
                controller: "SpaceController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            //.when("/recipeSearch/:recipe",
            //{
            //    templateUrl: "views/recipes/recipe.view.html",
            //    controller: "RecipeController"
            //})
            .when("/recipe/:recipeId",
            {
                templateUrl: "views/recipes/recipeDetails.view.html",
                controller: "RecipeDetailsController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/event/:eventId",
            {
                templateUrl: "views/events/eventDetails.view.html",
                controller: "EventDetailsController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/news/:newsId",
            {
                templateUrl: "views/news/spaceDetails.view.html",
                controller: "SpaceDetailsController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/user/:username",
            {
                templateUrl: "views/users/userProfile.view.html",
                controller: "UserProfileController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });

        function getLoggedIn(UserService, $q) {
            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function(response){
                    var currentUser = response.data;
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                });

            return deferred.promise;
        }

        function checkLoggedIn(UserService, $q, $location) {

            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });

            return deferred.promise;
        }
    }
})();