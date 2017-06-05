(function(){
    'use strict';
    
    angular.module('tcc').controller('LoginController', LoginController);
    
    LoginController.$inject = ['$scope', '$rootScope','LoginFactory','SETTINGS', '$state'];
    
    function LoginController($scope, $rootScope, LoginFactory,SETTINGS, $state){
        $scope.user = {
			email:'',
			password:''
		};		

		$scope.Login = Login;

		Activate();
		function Activate(){
			if(Notification)
				Notification.requestPermission();
		}

		function Login(){
			LoginFactory.login($scope.user)
				.then(success)
				.catch(fail);

			function success(response) {
				$rootScope.user = $scope.user.email;
				$rootScope.token = response.data.access_token;
				localStorage.setItem(SETTINGS.AUTH_TOKEN, response.data.access_token);
				localStorage.setItem(SETTINGS.AUTH_USER, $rootScope.user);

				$rootScope.header = {
					headers: {
						'Authorization': 'Bearer ' + $rootScope.token
					}
				}
				$state.go('route');
			}

			function fail(error) {
				console.log(error);
				toastr.error(error.data.error_description, 'Falha na autenticação');
			}
		}
    }
})();