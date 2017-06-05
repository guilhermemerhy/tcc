(function () {
    'use strict';
	
    angular.module('tcc').factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$rootScope', 'SETTINGS'];

    function UserFactory($http, $rootScope, SETTINGS) {
        return {
            getCurrentProfile: getCurrentProfile,
            getAll: getAll,
            create: create,
            getByEmail: getByEmail,
            activate: activate,
            desactivate: desactivate,
            turnAdmin: turnAdmin,
            turnSimpleUser: turnSimpleUser

        }

        function getCurrentProfile(email) {
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/user/getCurrentProfile', {email : email}, $rootScope.header);
        }
        
        function getAll(){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/user/getAllUsers', $rootScope.header);
        }

        function getByEmail(email){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/user/getByEmail', {email : email}, $rootScope.header);
        }
        
        function create(model){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/user/register', model, $rootScope.header);
        }
        
        function activate(id){
            return $http.put(SETTINGS.SERVICE_URL + 'api/v1/user/activate/' + id, id, $rootScope.header);
        }
        
        function desactivate(id){
            return $http.put(SETTINGS.SERVICE_URL + 'api/v1/user/desactivate/' + id, id, $rootScope.header);
        }
        
        function turnAdmin(id){
            return $http.put(SETTINGS.SERVICE_URL + 'api/v1/user/TurnAdmin/' + id, id, $rootScope.header);
        }
        
        function turnSimpleUser(id){
            return $http.put(SETTINGS.SERVICE_URL + 'api/v1/user/TurnSimpleUser/' + id, id, $rootScope.header);
        }

    }
})();