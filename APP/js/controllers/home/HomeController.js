(function(){
    'use strict';

    angular.module('tcc').controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$http', '$state', 'HelperFactory', 'SearchFactory', 'brCidadesEstados'];

    function HomeController($rootScope, $http, $state, HelperFactory, SearchFactory, brCidadesEstados){
      
        var vm = this;
        vm.btnBuscar = Buscar;
        vm.btnEnviar = SendEmail;

        vm.email = {
             name: null,
             email: null,
             phone: null,
             message: null
        }

        vm.model = {
                    state: null,
                    city: null,
                    segmentId: null
                };
       
        vm.cities = [];
        vm.states = brCidadesEstados.estados;
        vm.buscarCidadesPorSigla = buscarCidadesPorSigla;
        vm.segmentType = [];
        vm.model.state = 'RJ';  // Para exibição default
        buscarCidadesPorSigla(vm.model.state);
        vm.model.city = 'Rio de Janeiro';  // Para exibição default
      

         $rootScope.header = {
                headers: {
                    'Access-Control-Allow-Origin'   : '*'
                }
            }

            $rootScope.details = [];


        if($rootScope.segments.length == 0){
            ListSegment();
        }
        else{
             vm.segmentType = $rootScope.segments;
        }

        vm.model.segmentId = 1; // Para exibição default             

        function Buscar(){           
            SearchFactory.search(vm.model)
				.then(success)
				.catch(fail);
			
			function success(data)
			{
                $rootScope.details = [];
                if(data.data.length == 0)
                     toastr.info("Não foi encontrado nenhum serviço desse tipo no local desejado", "Desculpe!");
                else{                   
                    $rootScope.details = data.data;                    
                    $state.go("details"); 
                }
			}
			
			function fail(error){                    
                    if(error.status == 401){
                        toastr.error("Acesso não autorizado pelo servidor", error.statusText);
                       
                    }else
                        for(var x = 0; x < error.data.errors.length; x++)
                            toastr.error(error.data.errors[x].value, error.data.errors[x].key);
                }
        }
        

      function ListSegment(){
            HelperFactory.GetSegment()
                .then(success)
                .catch(error);
                
            function success(data){
                vm.segmentType = data.data;
                $rootScope.segments = vm.segmentType;
            }
            
            function error(error){
                ListSegment();             
            }
        }

         function buscarCidadesPorSigla(sigla){
            vm.cities = brCidadesEstados.buscarCidadesPorSigla(sigla);
        }

        function SendEmail(){            
            HelperFactory.sendEmail(vm.email)
				.then(success)
				.catch(fail);
			
			function success(data)
			{
                toastr.success("Sucesso", "Email enviado com sucesso!");
               
			}
			
			function fail(error)
            {
                 toastr.error("Desculpe", "Não foi possível enviar a mensagem!");
            }
        }
        


    }
})();
