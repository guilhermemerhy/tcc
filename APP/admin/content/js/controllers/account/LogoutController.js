(function () {
    'use strict';
    angular.module('tcc').controller('LogoutController', LogoutController);
	
	LogoutController.$inject = ['$rootScope', '$state', 'SETTINGS']
	
	function LogoutController($rootScope, $state, SETTINGS) {
		Activate();

		function Activate() {
			
			if($rootScope.timeoutOrderUpdate)
            	clearTimeout($rootScope.timeoutOrderUpdate);
				
			$rootScope.user = null;
			$rootScope.token = null;
			$rootScope.header = null;
			localStorage.removeItem(SETTINGS.AUTH_TOKEN);
			localStorage.removeItem(SETTINGS.AUTH_USER);

			$state.go('route');
		}
	}
})();