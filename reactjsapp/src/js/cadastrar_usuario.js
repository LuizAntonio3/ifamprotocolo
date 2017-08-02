const url = "http://localhost:3000";

// Início jQuery
$(document).ready(function(e) {

// evento click no botão login (quando eu clicar no botão login ele vai executar esses comandos)
	$("#btnSalvar").click(function(e){

	console.log("enviando");
	enviarForm();
	e.preventDefault();
});

function enviarForm(){
		var vNome = $("#nome").val(); // Estou recebendo o valor do campo Login
		var vEmail = $("#email").val(); // Estou recebendo o valor do campo Senha
		var vMatricula = $("#matricula").val(); // Estou recebendo o valor do campo Senha
		var vSenha = $("#senha").val(); // Estou recebendo o valor do campo Senha
		var vConfirmaSenha = $("#confirmaSenha").val(); // Estou recebendo o valor do campo Senha
		var vTipo = $("#tipo").val();
		var vTelefone = $("#telefone").val();
		var vLogradouro = $("#logradouro").val();
		var vNumero = $("#numero").val();
		var vBairro = $("#bairro").val();
		var vComplemento = $("#complemento").val();
		// alert("login123: "+vNome);

		// if (vNome.length == 0) {
		// 	alert("O campo Login é Obrigatório.");
		// } else if (vEmail.length == 0) {
		// 	alert("O campo Email é Obrigatório.");
		// } else if (vMatricula.length == 0) {
		// 	alert("O campo Matrícula é Obrigatório.");
		// } else if (vSenha.length == 0) {
		// 	alert("O campo Senha é Obrigatório.");
		// } else if (vConfirmaSenha.length == 0) {
		// 	alert("O campo Confirmação de Senha é Obrigatório.");
		// } 
		// else if (vConfirmaSenha == vSenha) {
		// 	alert("Senha não confere.");
		// }

		// Aqui vou usar o ajax (jquery), 
		// para enviar os dados ao servidor
		$.post(url + "/api/v1/usuario", 
			{
				"nome": vNome, 
				"senha": vSenha,
				"matricula": vMatricula,
				"email": vEmail,
				"tipo": vTipo,
				"telefone": vTelefone,
				"logradouro": vLogradouro,
				"numero": vNumero,
				"bairro": vBairro,
				"complemento": vComplemento
			}, 
			function(retorno){

				console.log(retorno);

				if(retorno) { // caso o retorno for TRUE

					try{
						var obj = JSON.parse(retorno.resp);

						// sucesso
						if(obj)
						{
							alert("Usuario cadastrado com sucesso!");

							$("#nome").val(""); 
							$("#email").val(""); 
							$("#matricula").val(""); 
							$("#senha").val(""); 
							$("#confirmaSenha").val(""); 
							$("#tipo").val("");
							$("#telefone").val("");
							$("#logradouro").val("");
							$("#numero").val("");
							$("#bairro").val("");
							$("#complemento").val("");
						}
						else{
							alert("Falha ao cadastrar o usuário.");
						}
					}catch(e){
						alert("Resposta inválida do servidor.");
						//window.location=urlServidor+"/cadastrar_protocolo.html";
					}
				} else { // caso o retorno for FALSE
					alert("Resposta inválida do servidor.");
				}
		}, 'json');
	}
});