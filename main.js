let cpf = document.getElementById("cpf");
let result = document.getElementById("result");

function validar() {
  var valor = cpf.value;
  result.innerHTML = valor;
}

function limpar() {
  cpf.value = "";
  result.innerHTML = "";
}
