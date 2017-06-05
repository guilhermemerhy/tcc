(function(){
    'use strict';
    
    angular.module('tcc').factory('ContactFactory', ContactFactory);
    
    ContactFactory.$inject = ['$http', 'SETTINGS','$rootScope'];
    
    function ContactFactory($http, SETTINGS,$rootScope) {
        return {
            getById: getById,
            GetByUserId: GetByUserId,
            create:create,
            edit: edit
        };
        
         function getById(id){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/contact/GetById/' + id, $rootScope.header);
        }

         function GetByUserId(id){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/contact/GetByUserId/' + id, $rootScope.header);
        }
      
        
        function create(model){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/contact/create', model, $rootScope.header);
        }
        
         function edit(model){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/contact/edit', model, $rootScope.header);
        }
    }
})();