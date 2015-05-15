myApp.controller('mainCtrl', function ($scope) {
    $scope.loadHeader = function (isLogged) {
        if (isLogged) {
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

myApp.controller('profileCtrl', function ($scope, myService) {

});

myApp.controller('registerCtrl', function ($rootScope, $scope, $location, myService) {
    $scope.register = function (username, fullName, email, password, repeatPassword) {
        myService.register(username, fullName, email, password, repeatPassword)
            .then(function (data) {
                sessionStorage.setItem('sessionToken', data.token_type + ' ' + data.access_token);
                $rootScope.username = username;
                $scope.loadHeader(true);
                $location.path('/profile');
            }, function (error) {
                console.log(error);
            });
    }
});

myApp.controller('loginCtrl', function ($rootScope, $scope, $location, myService) {
    $scope.login = function (username, password) {
        myService.login(username, password)
            .then(function (data) {
                sessionStorage.setItem('sessionToken', data.token_type + ' ' + data.access_token);
                $rootScope.username = username;
                $scope.loadHeader(true);
                $location.path('/profile');
            }, function (error) {
                console.log(error);
            });
    }
});

myApp.controller('logoutCtrl', function ($scope, $http, $location, myService) {
    myService.logout()
        .then(function (data) {
            sessionStorage.clear();
            delete $http.defaults.headers.common['Authorization'];
            $location.path('/');
        }, function (error) {
            console.log(error);
        });

});