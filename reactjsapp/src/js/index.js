const url = "http://localhost:3000";

// Início jQuery
$(document).ready(function(e) {

// evento click no botão login (quando eu clicar no botão login ele vai executar esses comandos)
$("#btnLogin").click(function(e){
	enviarForm();
	e.preventDefault();
});

function enviarForm(){
		var vLogin = $("#inputEmail").val(); // Estou recebendo o valor do campo Login
		var vSenha = $("#inputPassword").val(); // Estou recebendo o valor do campo Senha
		// alert("login123: "+vLogin);

		if (vLogin.length == 0) { // Aqui eu verifico se digitou algo no login
			alert("O campo Email é Obrigatório.");
		} else if (vSenha.length == 0) { // Aqui eu verifico se digitou algo no login
			alert("O campo Senha é Obrigatório.");
		}
			
		// Aqui vou usar o ajax (jquery), onde ele vai verificar em outro arquivo se o usuário e senha existe
		$.post(url + "/api/v1/usuario/login", 
				{
					"email": vLogin, 
					"senha": vSenha
				},
				function(retorno){
					
					console.log(retorno)

					if (retorno) {
						try {
							var obj = JSON.parse(retorno.resp);

							if (obj) {
								alert("ULogin Realiza do com   sucesso.");

								$("#email").val("");
								$("#senha").val("");

								//window.location=urlServidor+"/cadastrar_protocolo.html";
							} else {
								alert("UEmail ou senha ninválidos");
							}
						} catch (error) {
							alert("Resposta inválida do servidor.");
						}
					}else{
						alert("Resposta inválida do servidor.");
					}
			  }, 'json');
		}
});