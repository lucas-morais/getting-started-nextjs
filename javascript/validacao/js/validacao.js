export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  
  if(validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if(input.validity.valid){
    input.parentElement.classList.remove('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(input, tipoDeInput);
  }
}

const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
];

const mensagensDeErro = {
  nome: {
    valueMissing: 'O campo nome não pode estar vazio.'
  },
  email:{
    valueMissing: 'O campo de email não pode estar vazio.',
    typeMismatch: 'O email difgitado não é válido'
  },
  senha:{
    valueMissing: 'O campo de senha não pode estar vazio.',
    patternMismatch: 'A senha de conter de 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
  },
  dataNascimento: {
    valueMissing: 'O campo de senha não pode estar vazio.',
    customError: 'Você deve ter mais de 18 anos para se cadastrar.'
  }, 
  cpf: {
    valueMissing: 'O campo CPF não pode estar vazio',
    customError: 'O CPF digitado não é válido'
  },
  cep: {
    valueMissing: 'O campo de CEP não pode estar vazio.',
    patternMismatch: 'O CEP digitado não é válido.',
    customError: 'Não foi possível buscar o CEP'
  },
  logradouro: {
    valueMissing: 'O campo Logradouro não pode estar vazio',
  },
  cidade: {
    valueMissing: 'O campo Cidade não pode estar vazio',
  },
  estado: {
    valueMissing: 'O campo Estado não pode estar vazio',
  },
  preco:{
    valueMissing: 'O campo de Preço não pode estar vazio'
  }

}

const validadores = {
  dataNascimento: input => validaDataNascimento(input),
  cpf: input => validaCPF(input),
  cep: input => recuperarCep(input)
}

function mostraMensagemDeErro(input, tipoDeInput) {
  let mensagem = '';
  tiposDeErro.forEach((erro) => {
    if(input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro];
    }
  });
  return mensagem;
}

function validaDataNascimento(input) {
  const dataRecebida = new Date(input.value);
  let mensagem = '';

  if(!maiorQue18(dataRecebida)) { 
    mensagem = 'Você deve ser ter mais que 18 anos para se cadastrar';
  }  

  input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
  const dataAtual = new Date();
  const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

  return dataMais18 <= dataAtual;
}

function validaCPF(input) {
  const cpfFormatado = input.value.replace(/\D/g, '');
  let mensagem = '';
  
  
  if(!checaCpfRepetido(cpfFormatado) || !checaEstruturaCpf(cpfFormatado)) {
    mensagem = 'O CPF digitado não é válido';
  }

  input.setCustomValidity(mensagem);
}

function checaCpfRepetido(cpf) {
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ];

  let cpfValido = true;

  valoresRepetidos.forEach((valor) => {
    if (valor === cpf) {
      cpfValido = false;
    }
  });

  return cpfValido  
}

function checaEstruturaCpf(cpf) {  
  const multiplicador = 10;
  return checaDigitoVerificador(cpf, multiplicador) 
}

function checaDigitoVerificador(cpf, multiplicador) {
  if (multiplicador >= 12) {
    return true;
  }
  
  let soma = 0;
  let multiplicadorInicial = multiplicador;
  const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
  const digitoVerificador = cpf.charAt(multiplicador - 1);

  for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
    soma += cpfSemDigitos[contador] * multiplicadorInicial;
    contador ++;
  }
  
  if (digitoVerificador == confirmaDigito(soma)){
    return checaDigitoVerificador(cpf, multiplicador + 1);
  } else {
    return false;
  }
}

function confirmaDigito(soma) {
  return 11 - (soma % 11);
}

function recuperarCep(input) {
  
  const cep = input.value.replace(/\D/g, '');
  const url = `https://viacep.com.br/ws/${cep}/json`;
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    }
  };

  if(!input.validity.patternMismatch && !input.validity.valueMissing) {
    console.log('aqui')
    fetch(url, options).then(
      response => response.json()
    ).then(
        data => {
          if(data.erro) {
            input.setCustomValidity('Não foi possível buscar o CEP');
          } else {
            input.setCustomValidity('');
            preencheCamposComCep(data);
            return;
          }
        } 
    )
  }
}

function preencheCamposComCep(data) {
  const logradouro = document.querySelector('[data-tipo="logradouro"]');
  const cidade = document.querySelector('[data-tipo="cidade"]');
  const estatdo = document.querySelector('[data-tipo="estatdo"]');

  logradouro.value = data.logradouro;
  cidade.value = data.localidade;
  estado.value = data.uf;
}