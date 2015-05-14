myApp.controller('mainCtrl', function ($scope) {
    $scope.loadHeader = function (isLogged) {
        if (isLogged) {
            $scope.username = sessionStorage.getItem('userName');
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
    myService.login();
    $scope.loadHeader(true);
});

myApp.controller('logoutCtrl', function($scope, $location, myService) {
    myService.logout();
    $location.path('#/');
});