myApp.service('myService', function ($http, $q, BASE_URL) {

    var service = {};
    
    service.register = function (username, fullName, email, password, repeatPassword) {
        var defer = $q.defer();
        var newUser = {
            username: username,
            name: fullName,
            email: email,
            password: password,
            confirmPassword: repeatPassword
        };
        $http.post(BASE_URL + 'users/register', newUser)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    };

    service.login = function (username, password) {
        var defer = $q.defer();
        var user = {
            username: username,
            password: password
        };
        $http.post(BASE_URL + 'users/login', user)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    };

    service.logout = function () {
        var defer = $q.defer();
        $http.defaults.headers.common['Authorization'] = sessionStorage.getItem('sessionToken');
        $http.post(BASE_URL + 'users/logout')
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
    };

    service.searchUsers = function (userName) {
        var defer = $q.defer();
        $http.defaults.headers.common['Authorization'] = sessionStorage.getItem('sessionToken');
        $http.get(BASE_URL + 'users/search?searchTerm=' + userName)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
        return defer.promise;
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