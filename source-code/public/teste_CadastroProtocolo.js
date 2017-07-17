const url = "http://localhost:3000";

// Início jQuery
$(document).ready(function(e) {

// evento click no botão login (quando eu clicar no botão login ele vai executar esses comandos)
$("#cadastroProtocolo").click(function(e){
	enviarForm();
	e.preventDefault();
});

function enviarForm(){
		var vNumero = $("#inputNumero").val(); // Estou recebendo o valor do campo Número
		var vNome = $("#inputNome").val(); // Estou recebendo o valor do campo Nome
		var vMatricula = $("#inputMatricula").val(); // Estou recebendo o valor do campo Matricula
		var vAnexo1 = $("#inputAnexo1").val(); // Estou recebendo o valor do campo Anexo1
		// alert("login123: "+vLogin);

		if (vNumero.length == 0) { // Aqui eu verifico se digitou algo no Numero
			alert("O campo Número é Obrigatório.");
		} else if (vAnexo1.length == 0) { // Aqui eu verifico se digitou algo no login
			alert("O campo Anexo é Obrigatório.");
		}
			
		// Aqui vou usar o ajax (jquery), onde ele vai verificar em outro arquivo se o usuário e senha existe
		$.post(url + "/api/v1/usuario/login", 
				{
					"Número": vNumero, 
					"Nome": vNome,
					"Matricula": vMatricula,
					"Anexo1": vAnexo1
				},
				function(retorno){
					
					console.log(retorno)

					if (retorno) {
						try {
							var obj = JSON.parse(retorno.resp);

							if (obj) {
								alert("Cadastro de protocolo realizado com sucesso.");

								$("#numero").val("");
								$("#matricula").val("");
								$("#nome").val("");
								$("#anexo1").val("");

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