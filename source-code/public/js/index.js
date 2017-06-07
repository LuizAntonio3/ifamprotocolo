const url = "https://localhost:3000";

// Início jQuery
$(document).on('ready', function(e) {

// evento click no botão login (quando eu clicar no botão login ele vai executar esses comandos)
$("#btnSalvar").click(function(e){
	enviarForm();
	e.preventDefault();
});

function enviarForm(){
		var vLogin = $("#email").val(); // Estou recebendo o valor do campo Login
		var vSenha = $("#senha").val(); // Estou recebendo o valor do campo Senha
		// alert("login123: "+vLogin);

		// if (vLogin.length == 0) { // Aqui eu verifico se digitou algo no login
		// 	myFuncitionAlert("O campo Login é Obrigatório.");
		// 	$("#cmpLogin").focus(); // Faço o foco voltar para o campo de login
		// } else if (vSenha.length == 0) { // Aqui eu verifico se digitou algo no login
		// 	myFuncitionAlert("O campo Senha é Obrigatório.");
		// 	$("#cmpSenha").focus();// Faço o foco voltar para o campo de senha
		// } else { // Caso o login e senha estiverem preenchidos, entra aqui.
			
			// Aqui vou usar o ajax (jquery), onde ele vai verificar em outro arquivo se o usuário e senha existe
			$.post(url + "/api/v1/usuario/login", {"email": vLogin, "senha": vSenha}, function(retorno){

				if(retorno.mensagem) { // caso o retorno for TRUE

					try{
			  		var obj = JSON.parse(retorno.res);

            // sucesso
            if(0)
            {

            }
					
            window.location=urlServidor+"/cadastrar_protocolo.html";
            
					}catch(e){

						//window.location=urlServidor+"/cadastrar_protocolo.html";
					}
				 } 
				 else { // caso o retorno for FALSE

				}
			  }, 'json');
		}
});