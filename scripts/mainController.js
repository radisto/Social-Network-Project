myApp.controller('mainCtrl', function ($scope, $location, myService) {
    $scope.viewProfile = function () {
        myService.myData()
            .then(function (data) {
                $scope.currentUsername = undefined;
                $scope.username = data.username;
                $scope.profileImage = data.profileImageData;
                $scope.avatar = data.profileImageData;
                if (data.coverImageData) {
                    $scope.coverImage = {
                        'background-image': 'url("' + data.coverImageData + '")'
                    };
                } else {
                    $scope.coverImage = {
                        'background-image': 'url("../img/cover.png")'
                    };
                };
            }, function (error) {
                console.log(error);
            });
        myService.getFriendRequests()
            .then(function (data) {
                $scope.requestsCount = data.length;
            }, function (error) {
                console.log(error);
            });
        myService.getFriends()
            .then(function (data) {
                $scope.friendsCount = data.length;
                $scope.friends = data;
            }, function (error) {
                console.log(error);
            });
    };
    if (sessionStorage.sessionToken) {
        $scope.viewProfile();
    }

    $scope.loadHeader = function (isLogged) {
        if (isLogged) {
            $scope.header = 'temps/user-header.html';
            $('header').off('click', '#drop-down');
            $('header').on('click', '#drop-down', function showHide() {
                var element = $('#invisible');
                if (element.is(':hidden')) {
                    element.show();
                } else {
                    element.hide();
                }
            });
        } else {
            $scope.header = 'temps/guest-header.html';
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
        } else {
            $scope.foundUsers = {};
        }
    };

    (function () {
        var moveLeft = 80;
        var moveDown = 35;

        $('header').on('mouseenter', '.users-names', showPopUp);
        $('header').on('mouseleave', '.users-names', hidePopUp);

        function showPopUp() {
            var id = $(this).attr('data-id')[4];
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
            var username = $('#found-username').text();
            myService.userFullData(username)
                .then(function (data) {
                    $scope.requestsCount = 0;
                    $scope.currentUsername = data.username;
                    $scope.profileImage = data.profileImageData;
                    if (data.coverImageData) {
                        $scope.coverImage = {
                            'background-image': 'url("' + data.coverImageData + '")'
                        };
                    } else {
                        $scope.coverImage = {
                            'background-image': 'url("../img/cover.png")'
                        };
                    }
                    $scope.fullName = data.name;
                    var isFriend = data.isFriend;
                    var waiting = data.hasPendingRequest;
                    if (!isFriend && !waiting) {
                        $scope.disabled = false;
                    } else {
                        $scope.disabled = true;
                    }
                    if (isFriend) {
                        $scope.buttonText = 'Friend';
                    } else {
                        if (waiting) {
                            $scope.buttonText = 'Friend request sent';
                        } else {
                            $scope.buttonText = 'Sent friend request';
                        }
                    }
                    $location.path('/profile');
                }, function (error) {
                    console.log(error);
                });
        });
    }());

    $scope.addFriend = function (username) {
        myService.addFriend(username)
            .then(function (data) {
                $scope.disabled = true;
                $scope.buttonText = 'Friend request sent';
            }, function (error) {
                console.log(error);
            });
    };

    $scope.showFriendRequests = function () {
        myService.getFriendRequests()
            .then(function (data) {
                $scope.requests = data;
            }, function (error) {
                console.log(error);
            });
    };

    $scope.viewFriendProfile = function (username) {
        myService.userFullData(username)
            .then(function (data) {
                $scope.requestsCount = 0;
                $scope.currentUsername = data.username;
                $scope.profileImage = data.profileImageData;
                if (data.coverImageData) {
                    $scope.coverImage = {
                        'background-image': 'url("' + data.coverImageData + '")'
                    };
                } else {
                    $scope.coverImage = {
                        'background-image': 'url("../img/cover.png")'
                    };
                }
                $scope.fullName = data.name;
                var isFriend = data.isFriend;
                var waiting = data.hasPendingRequest;
                if (!isFriend && !waiting) {
                    $scope.disabled = false;
                } else {
                    $scope.disabled = true;
                }
                if (isFriend) {
                    $scope.buttonText = 'Friend';
                } else {
                    if (waiting) {
                        $scope.buttonText = 'Friend request sent';
                    } else {
                        $scope.buttonText = 'Sent friend request';
                    }
                }
                $location.path('/profile');
            }, function (error) {
                console.log(error);
            });
    };

    $scope.approve = function (id) {
        myService.approve(id)
            .then(function (data) {
                var index = 0;
                var req = $scope.requests;
                for (var i; i < req.length; i++) {
                    if (req[i].id == id) {
                        index = i;
                    }
                }
                var newFriend = {
                    profileImageData: req[index].user.profileImageData,
                    name: req[index].user.name,
                    gender: req[index].user.gender,
                    username: req[index].user.username
                };
                $scope.friends.push(newFriend);
                $scope.requests.splice(index, 1);
            }, function (error) {
                console.log(error);
            });
    }

    $scope.reject = function (id) {
        myService.reject(id)
            .then(function (data) {
                var index = 0;
                var req = $scope.requests;
                for (var i; i < req.length; i++) {
                    if (req[i].id == id) {
                        index = i;
                    }
                }
                $scope.requests.splice(index, 1);
            }, function (error) {
                console.log(error);
            });
    }
});