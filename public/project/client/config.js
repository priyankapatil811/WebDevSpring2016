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
                templateUrl : "views/home/home.view.html"
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
                controllerAs : "model"
            })
            .when("/myAccount", {
                templateUrl: "views/users/myAccount.view.html",
                controllerAs : "model"
            })
            .when("/maevent", {
                templateUrl: "views/events/myAccountEvent.view.html",
                controller: "EventController",
                controllerAs : "model"
            })
            .when("/marecipe", {
                templateUrl: "views/recipes/myAccountRecipe.view.html",
                controller: "RecipeController",
                controllerAs : "model"
            })
            .when("/maspace", {
                templateUrl: "views/news/myAccountSpace.view.html",
                controller: "SpaceController",
                controllerAs : "model"
            })
            //.when("/recipeSearch/:recipe",
            //{
            //    templateUrl: "views/recipes/recipe.view.html",
            //    controller: "RecipeController"
            //})
            .when("/recipe/:recipeId",
            {
                templateUrl: "views/recipes/recipeDetails.view.html",
                controller: "RecipeDetailsController"
            })
            .when("/event/:eventId",
            {
                templateUrl: "views/events/eventDetails.view.html",
                controller: "EventDetailsController"
            })
            .when("/news/:newsId",
            {
                templateUrl: "views/news/spaceDetails.view.html",
                controller: "SpaceDetailsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();