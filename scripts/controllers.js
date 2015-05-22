myApp.controller('homeCtrl', function ($scope) {
    $scope.loadHeader(false);
});

myApp.controller('profileCtrl', function ($scope) {
    $scope.loadHeader(true);
});

myApp.controller('registerCtrl', function ($scope, $location, myService) {
    $scope.register = function (username, fullName, email, password, repeatPassword) {
        myService.register(username, fullName, email, password, repeatPassword)
            .then(function (data) {
                sessionStorage.setItem('sessionToken', data.token_type + ' ' + data.access_token);
                $location.path('/profile');
                $scope.viewProfile();
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
                $location.path('/profile');
                $scope.viewProfile();
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

myApp.controller('editCtrl', function ($scope, $location, myService) {
    (function () {
        myService.myData()
            .then(function (data) {
                $scope.nameEdit = data.name;
                $scope.mailEdit = data.email;
                $scope.genderEdit = data.gender;
                $scope.profImgEdit = data.profileImageData;
                $scope.covImgEdit = data.coverImageData;
            }, function (error) {
                console.log(error);
            });
    }());

    (function () {
        var container = $('#wrapper');

        container.on('click', '#profile-image-button', function () {
            $('#profile-image').click();
        });

        container.on('change', '#profile-image', function () {
            var file = this.files[0],
                reader;

            if (file.type.match(/image\/.*/)) {
                var preview = $('#profile-image-preview');
                reader = new FileReader();
                reader.onload = function () {
                    var imgUrl = reader.result;
                    $scope.$apply(function () {
                        $scope.profImgEdit = imgUrl;
                    });
                };
                reader.readAsDataURL(file);
            } else {

            }
        });

        container.on('click', '#profile-cover-button', function () {
            $('#profile-cover').click();
        });

        container.on('change', '#profile-cover', function () {
            var file = this.files[0],
                reader;

            if (file.type.match(/image\/.*/)) {
                var preview = $('#profile-cover-preview');
                reader = new FileReader();
                reader.onload = function () {
                    var imgUrl = reader.result;
                    $scope.$apply(function () {
                        $scope.covImgEdit = imgUrl;
                    });
                };
                reader.readAsDataURL(file);
            } else {

            }
        });
    }());

    $scope.editProfile = function (fullName, email, gender, image, cover) {
        myService.editProfile(fullName, email, gender, image, cover)
            .then(function (data) {
                console.log(data);
                $location.path('/profile');
                $scope.viewProfile();
            }, function (error) {
                console.log(error);
            });
    }
});

myApp.controller('passChangeCtrl', function ($scope, $location, myService) {
    $scope.passChange = function (oldpass, newpass, newpass2) {
        myService.passChange(oldpass, newpass, newpass2)
            .then(function (data) {
                $location.path('/profile');
            }, function (error) {
                console.log(error);
            });
    }
});