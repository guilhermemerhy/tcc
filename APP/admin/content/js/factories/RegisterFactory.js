(function(){
    'use strict';
    
    angular.module('tcc').factory('RegisterFactory', RegisterFactory);
    
    RegisterFactory.$inject = ['$http', 'SETTINGS','$rootScope'];
    
    function RegisterFactory($http, SETTINGS,$rootScope) {
        return {
            register: register
        };

        function register(model) {
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/user/register', model, $rootScope.header);
        }
    }
})();