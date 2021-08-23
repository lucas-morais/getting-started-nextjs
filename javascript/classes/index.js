class ContaCorrente {
  agencia;
  // #saldo
  _saldo = 0;

  depositar(valor) {
    if(valor <= 0) {
      return;
    }
    this._saldo += valor;
  }  
  
  sacar(valor) {
    if(this._saldo >= valor){
      this._saldo -= valor;
      return valor;
    }
  }
}

class Cliente {
  nome;
  cpf;  
};

const cliente1 = new Cliente();
cliente1.nome = 'Ringo';
cliente1.cPF = 112233389;

const cliente2 = new Cliente();
cliente2.nome = 'Billy';
cliente2.cPF = 112233379;

const contaCorrenteRingo = new ContaCorrente();
contaCorrenteRingo.agencia = 1001;
contaCorrenteRingo.depositar(100);
contaCorrenteRingo.depositar(100);
contaCorrenteRingo.depositar(100);
const valorSacado = contaCorrenteRingo.sacar(50);
console.log(valorSacado)
console.log(contaCorrenteRingo);
