var myApp = angular.module('myApp', ['ngRoute']);
//TODO: BETTER NAME

myApp.constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            title: 'Welcome to Nice2MeetU',
            templateUrl: 'temps/home.html',
            controller: 'homeCtrl'
        })
        .when('/profile', {
            title: 'Nice2MeetU - My Profile',
            templateUrl: 'temps/profile.html',
            controller: 'profileCtrl'
        })
        .when('/logout', {
            template: ' ',
            controller: 'logoutCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.run(function ($http, $rootScope) { //$location
    $http.defaults.headers.common['Content-Type'] = 'application/json';
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
});