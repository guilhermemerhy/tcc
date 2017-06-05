(function () {
    'use strict';

    angular.module('tcc').constant('SETTINGS', {
        'VERSION': '0.0.1',
        'CURR_ENV': 'dev',
        'AUTH_TOKEN': 'tcc-token',
        'AUTH_USER': 'tcc-user',
		'USER' : null,
        'USERID' : null,
		//'SERVICE_URL':'http://localhost:56056/'
        'SERVICE_URL':'http://projecttccapi.azurewebsites.net/'
    });
    
    angular.module('tcc').run(AppConfig);
    
    AppConfig.$inject = ['$rootScope', '$location', 'SETTINGS', '$state'];
    
    function AppConfig($rootScope, $location, SETTINGS, $state){
        var token = localStorage.getItem(SETTINGS.AUTH_TOKEN);
        var user = localStorage.getItem(SETTINGS.AUTH_USER);

        $rootScope.user = null;
        $rootScope.userData = null;
        $rootScope.token = null;
        $rootScope.header = null;
		$rootScope.loader = null;
		
		if (token && user) {
            $rootScope.user = user;
            $rootScope.token = token;
            $rootScope.header = {
                headers: {
                    'Access-Control-Allow-Origin'   : '*',
                    'Authorization': 'Bearer ' + $rootScope.token
                }
            }
        }

        $rootScope.$on("$stateChangeStart", function (event, next, obj, current) {
            if ($rootScope.user == null) {
                //$state.go("account.login");              
            }
        });
    }
})();
