let cpf = document.getElementById("cpf");
let result = document.getElementById("result");

function validar() {
  var valor = cpf.value;
  var soma = 0;
  var resto = 0;

  if (valor == "00000000000") {
    return false;
  }

  for (i = 1; i <= 9; i++) {
    soma = soma + parseInt(valor.substring(1 - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
  }

  if (resto == 10 || resto == 11) {
    resto = 0;
  }

  if (resto != parseInt(valor.substring(9, 10))) {
    return false;
  }

  soma = 0;
  for (i = 1; i <= 10; i++) {
    soma = soma + parseInt(valor.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
  }

  if (resto == 10 || resto == 11) {
    resto = 0;
  }

  if (resto != parseInt(valor.substring(10, 11))) {
    return false;
  }
  return true;
}

function mostrarValor() {
  var valor = cpf.value;
  result.innerHTML = valor;
}

function limpar() {
  cpf.value = "";
  result.innerHTML = "";
}

function mostraCoisa() {
  if (validar == true) {
    return "Seu cpf é valido!";
  }
  if (validar == false) {
    return "Seu cpf não é valido";
  }
}
