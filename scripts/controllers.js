myApp.controller('mainCtrl', function ($scope, myService) {
    $scope.loadHeader = function (isLogged) {
        if (isLogged) {
            $scope.username = sessionStorage.getItem('username');
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

    $scope.searchUsers = function (userName) {
        if (userName && userName.trim()) {
            myService.searchUsers(userName.trim())
                .then(function (data) {
                    $scope.foundUsers = data;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    (function () {
        var moveLeft = 80;
        var moveDown = 35;

        $('header').on('mouseenter', '.users-names', showPopUp);
        $('header').on('mouseleave', '.users-names', hidePopUp);

        function showPopUp() {
            var id = $(this).attr('id')[4];
            var hover = $scope.foundUsers[id];
            $scope.$apply(function () {
                $scope.currentUser = hover;
            });
            $('#pop-up').show();
            $('.users-names').mousemove(function (e) {
                $("#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX - moveLeft);
            });
        }

        function hidePopUp() {
            $('#pop-up').hide();
        }
    }());

    (function () {
        $('header').on('click', '.users-names', function () {
            var username = $('#username-delete').text();
            myService.userFullData(username)
                .then(function (data) {
                    console.log(data.username);
                    console.log(data.isFriend);
                }, function (error) {
                    console.log(error);
                });
            
        });
    }());
});

myApp.controller('homeCtrl', function ($scope) {
    $scope.loadHeader(false);
});

myApp.controller('profileCtrl', function ($scope, myService) {
    $scope.loadHeader(true);
});

myApp.controller('registerCtrl', function ($scope, $location, myService) {
    $scope.register = function (username, fullName, email, password, repeatPassword) {
        myService.register(username, fullName, email, password, repeatPassword)
            .then(function (data) {
                sessionStorage.setItem('sessionToken', data.token_type + ' ' + data.access_token);
                sessionStorage.setItem('username', username);
                $location.path('/profile');
            }, function (error) {
                console.log(error);
            });
    }
});

myApp.controller('loginCtrl', function ($scope, $location, myService) {
    $scope.login = function (username, password) {
        myService.login(username, password)
            .then(function (data) {
                sessionStorage.setItem('sessionToken', data.token_type + ' ' + data.access_token);
                sessionStorage.setItem('username', username);
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