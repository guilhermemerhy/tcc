(function(){
    'use strict';

    angular.module('tcc').factory('SearchFactory', SearchFactory);

    SearchFactory.$inject = ['$http', 'SETTINGS','$rootScope'];

    function SearchFactory($http, SETTINGS,$rootScope) {
        return {
            search: search
        };

         function search(model){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/search/find', model, $rootScope.header);
        }
    }
})();
