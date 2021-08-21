const alvo = '11a22b33c'; 
// expressão com string
// const exp = new RegExp('(\\d\\d)(\\w)', 'g');

const exp = /(\d\d)(\w)/g;

// Executa regex uma vez
// const resultado = exp.exec(alvo);
// console.log(resultado);

let resultado = null;
while (resultado = exp.exec(alvo)) {
  console.log(resultado);
  console.log(exp.lastIndex)
}

console.log(exp.test(alvo));


// substituindo valores
let data =  '01-12-2021';
const expData = /-/g;

console.log(data.replace(expData, '/'));

// separando string
const numeros = '100,200-150,200;20';
const expNumeros = /[,;-]/;

console.log(numeros.split(expNumeros));

// Extraindo codigos
const codigo  = 'A121B12112C12212F12G01';
const expCodigo = /[A-Za-z]\d+/g;

console.log(codigo.match(expCodigo));
