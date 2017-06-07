const url = "https://localhost:3000";

// Início jQuery
$(document).on('ready', function(e) {

// evento click no botão login (quando eu clicar no botão login ele vai executar esses comandos)
	$("#btnSalvar").click(function(e){
	enviarForm();
	e.preventDefault();
});

function enviarForm(){
		var vNome = $("#nome").val(); // Estou recebendo o valor do campo Login
		var vEmail = $("#email").val(); // Estou recebendo o valor do campo Senha
		var vMatricula = $("#matricula").val(); // Estou recebendo o valor do campo Senha
		var vSenha = $("#senha").val(); // Estou recebendo o valor do campo Senha
		var vConfirmaSenha = $("#confirmaSenha").val(); // Estou recebendo o valor do campo Senha

		// alert("login123: "+vNome);

		if (vNome.length == 0) {
			alert("O campo Login é Obrigatório.");
		} else if (vEmail.length == 0) {
			alert("O campo Email é Obrigatório.");
		} else if (vMatricula.length == 0) {
			alert("O campo Matrícula é Obrigatório.");
		} else if (vSenha.length == 0) {
			alert("O campo Senha é Obrigatório.");
		} else if (vConfirmaSenha.length == 0) {
			alert("O campo Confirmação de Senha é Obrigatório.");
		} else if (vConfirmaSenha == vSenha) {
			alert("Senha não confere.");
		}

		// Aqui vou usar o ajax (jquery), onde ele vai verificar em outro arquivo se o usuário e senha existe
		$.post(url + "/api/v1/usuario", 
			{"nome": vNome, 
				"senha": vSenha,
				"matricula": vMatricula
			}, 
			function(retorno){

				console.log(retorno);

				if(retorno) { // caso o retorno for TRUE

					try{
						var obj = JSON.parse(retorno.res);

						// sucesso
						if(obj.token)
						{
							window.location=urlServidor+"/cadastrar_protocolo.html";
						}
						else{
							alert("Token não recebido.");
						}
					}catch(e){
						alert("Falha de comunicação.");
						//window.location=urlServidor+"/cadastrar_protocolo.html";
					}
				} else { // caso o retorno for FALSE
					alert("Falha de comunicação.");
				}
		}, 'json');
	}
});