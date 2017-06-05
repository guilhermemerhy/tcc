(function(){
    'use strict';
    
    angular.module('tcc').factory('CompanyFactory', CompanyFactory);
    
    CompanyFactory.$inject = ['$http', 'SETTINGS','$rootScope'];
    
    function CompanyFactory($http, SETTINGS,$rootScope) {
        return {
            GetCompanyByUser: GetCompanyByUser,
            getById: getById,
            GetAll: GetAll,
            create:create,
            edit:edit,
            activate:activate,
            desactivate:desactivate,
            getServiceIsActive: getServiceIsActive
        };
        
        function GetCompanyByUser(id){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/company/GetCompanyByUser/' + id, $rootScope.header);
        }

        
        function GetAll(){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/company/GetAllCompany/', $rootScope.header);
        }
        
        function getById(id){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/company/GetCompany/' + id, $rootScope.header);
        }
        
        function getServiceIsActive(id){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/company/GetServiceIsActive/' + id, $rootScope.header);
        }
      
        function create(model){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/company/Create', model, $rootScope.header);
        }
        
        function edit(model){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/company/edit', model, $rootScope.header);
        }
        
        function activate(id){
            return $http.put(SETTINGS.SERVICE_URL + 'api/v1/company/Activate/' + id, id, $rootScope.header);
        }
        
        function desactivate(id){
            return $http.put(SETTINGS.SERVICE_URL + 'api/v1/company/Desactivate/' + id, id, $rootScope.header);
        }
    }
})();