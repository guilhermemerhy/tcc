(function(){
    'use strict';
    
    angular.module('tcc').controller('RegisterController', RegisterController);
    
    RegisterController.$inject = ['$scope', '$rootScope','RegisterFactory','SETTINGS', '$state'];
    
    function RegisterController($scope, $rootScope, RegisterFactory,SETTINGS, $state){
        $scope.register = {
			email:'',
			emailConfirmation: '',
			password:'',
			passwordConfirmation:''
		};		

		

		$scope.btnCancel = Cancel;
		$scope.btnRegister= Register;

		//Activate();
		function Activate(){
			if(Notification)
				Notification.requestPermission();
		}

		function Register(){
			RegisterFactory.register($scope.register)
				.then(success)
				.catch(fail);

			function success(response) {
				
				toastr.success("Usuário cadastrado com sucesso.", "Sucesso!");
				$state.go("account.login");
			}

			function fail(error) {
				 for(var x = 0; x < error.data.errors.length; x++)
                     toastr.error(error.data.errors[x].value, "Atenção!");
				
			}
		}

		 function Cancel(){
            $state.go("account.login");
        }
    }
})();