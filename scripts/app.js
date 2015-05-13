var myApp = angular.module('myApp', ['ngRoute']);
//TODO: BETTER NAME

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
        .otherwise({
            redirectTo: '/'
        });
});

myApp.run(function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
});

myApp.controller('mainCtrl', function ($scope) {
    $scope.loadHeader = function (isLogged, username) {
        if (isLogged) {
            $scope.username = username;
            $scope.header = 'temps/user-header.html';

            $('header').on('click', '#drop-down', function showHide() {
                var element = $('#invisible');
                if (element.is(':hidden')) {
                    element.show()
                } else {
                    element.hide();
                }
            });
        } else {
            $scope.header = 'temps/guest-header.html';
            $('header').off('click', '#drop-down');
        }
    }
});

myApp.controller('homeCtrl', function ($scope) {
    $scope.loadHeader(false);
});

myApp.controller('profileCtrl', function ($scope) {
    //gets username somehow
    var username = 'billgates';
    $scope.loadHeader(true, username);
});