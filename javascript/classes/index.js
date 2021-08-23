import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";

const cliente1 = new Cliente('Ringo', 112233389);

const cliente2 = new Cliente('Billy', 112233379);
console.log(cliente2.cpf)

let numeroDeContas = 0;

const contaCorrenteRingo = new ContaCorrente(cliente1, 1001);
numeroDeContas++;
const conta2 = new ContaCorrente(cliente2, 1002);
numeroDeContas++;

contaCorrenteRingo.depositar(1000);
contaCorrenteRingo.transferir(500, conta2);

console.log(contaCorrenteRingo);
console.log(conta2);
console.log(conta2.cliente);
console.log(contaCorrenteRingo.saldo);
console.log(ContaCorrente.numeroDeContas)
