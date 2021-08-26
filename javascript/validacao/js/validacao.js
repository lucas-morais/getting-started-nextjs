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
    valueMissing: 'O campo de email não pode estart vazio.',
    typeMismatch: 'O email difgitado não é válido'
  },
  senha:{
    valueMissing: 'O campo de senha não pode estart vazio.',
    patternMismatch: 'A senha de conter de 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
  },
  dataNascimento: {
    valueMissing: 'O campo de senha não pode estart vazio.',
    customError: 'Você deve ter mais de 18 anos para se cadastrar.'
  }
}

const validadores = {
  dataNascimento: input => validaDataNascimento(input)
}

function mostraMensagemDeErro(input, tipoDeInput) {
  let mensagem = '';
  tiposDeErro.forEach((erro) => {
    if(input.validity[erro]) {
      console.log(tipoDeInput)
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