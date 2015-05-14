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
            controller: 'logoutCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.run(function ($http, $location, $rootScope) {
    $http.defaults.headers.common['Content-Type'] = 'application/json';
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
});

myApp.service('myService', function ($http, $location, BASE_URL) {

    var service = {};

    service.login = function () {
        var user = {
            username: 'billgates',
            password: 'bigbill'
        };
        $http.post(BASE_URL + 'users/login', user)
            .success(function (data) {
                sessionStorage.setItem('sessionToken', data.token_type + ' ' + data.access_token);
                sessionStorage.setItem('userName', data.userName);
            })
            .error(function (err) {
                console.log(err);
            });
    };
    
    service.logout = function () {
        $http.defaults.headers.common['Authorization'] = sessionStorage.getItem('sessionToken');
        $http.post(BASE_URL + 'users/logout')
            .success(function (data) {
                console.log(data);
                sessionStorage.clear();
            })
            .error(function (err) {
                console.log(err);
            });
    };

    return service;
});


//module.factory('sessionInjector', ['SessionService', function(SessionService) {  
//    var sessionInjector = {
//        request: function(config) {
//            if (!SessionService.isAnonymus) {
//                config.headers['x-session-token'] = SessionService.token;
//            }
//            return config;
//        }
//    };
//    return sessionInjector;
//}]);
//module.config(['$httpProvider', function($httpProvider) {  
//    $httpProvider.interceptors.push('sessionInjector');
//}]);