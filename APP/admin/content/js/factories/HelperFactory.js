(function(){
    'use strict';
    
    angular.module('tcc').factory('HelperFactory', HelperFactory);
    
    HelperFactory.$inject = ['$http', 'SETTINGS','$rootScope'];
    
    function HelperFactory($http, SETTINGS,$rootScope) {
        return {
            getAddressFromCoords: getAddressFromCoords,
            
        };
        
        function getAddressFromCoords(model){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/helper/getAddressFromCoords', model, $rootScope.header);
        }
    }
})();