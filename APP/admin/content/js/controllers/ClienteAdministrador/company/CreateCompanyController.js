(function(){
    'use strict';
    
    angular.module('tcc').controller('PS_CreateCompanyController', PS_CreateCompanyController);
    
    PS_CreateCompanyController.$inject = ['$rootScope','$state', 'CompanyFactory', 'SETTINGS', 'brCidadesEstados', 'viaCEP'];
    
    function PS_CreateCompanyController($rootScope, $state, CompanyFactory, SETTINGS, brCidadesEstados, viaCEP){
        var vm = this;
        vm.segmentType = $rootScope.segment;
        vm.company = {
            userId: SETTINGS.USERID,
            name:null,
            description:null,
            segmentTypeId:null,
            address: null,
            addressComplement: null,
            postCode: null,
            city: null,
            state: null,
            district: null
        };
                
        vm.btnSave = Save;
        vm.btnCancel = Cancel;

        vm.states = brCidadesEstados.estados;     
        vm.buscarCidadesPorSigla = buscarCidadesPorSigla;
        vm.cities = [];
        vm.buscarCEP = buscarCEP;

        function Save(){
            CompanyFactory.create(vm.company)
				.then(success)
				.catch(fail);
			
			function success(data)
			{
				toastr.success("Empresa criada com sucesso.", "Sucesso!");
                $state.go('ClienteAdministrador.company');
			}
			
			function fail(error){
                    if(error.status == 401){
                        toastr.error("Acesso não autorizado pelo servidor", error.statusText);
                        $state.go('account.login');
                    }else
                        for(var x = 0; x < error.data.errors.length; x++)
                            toastr.error(error.data.errors[x].value, error.data.errors[x].key);
                }
        }
        
        function Cancel(){
            $state.go("ClienteAdministrador.company");
        }

        function buscarCidadesPorSigla(sigla){
            vm.cities = brCidadesEstados.buscarCidadesPorSigla(sigla);
        }

        function buscarCEP(cep){
            if(cep != undefined){
                if(cep.length == 8 ){
                    viaCEP.get(cep).then(function(response){  
                        vm.company.address = response.logradouro;
                        vm.company.district = response.bairro;
                        vm.company.state = response.uf;
                        buscarCidadesPorSigla(response.uf);
                        vm.company.city = response.localidade;
                    });
                }
            }
        }
    }
})();