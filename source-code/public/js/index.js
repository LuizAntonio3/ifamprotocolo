$(document).on('ready', function(e) {
  $.get("https://airu-api.herokuapp.com/api/v1/denuncias/")
  .done(function(data) {

    var obj = data.denuncias;
    var body = $(".tablebody");

    //adiciona a tabela com os dados do usuarios por loja
    for (var i = 0; i < obj.length; i++) {
      body.append('<tr><td>'+obj[i].address+'</td></tr>');
    }
  });
});
