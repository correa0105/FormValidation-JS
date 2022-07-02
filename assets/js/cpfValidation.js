class ValidationCPF {
    constructor(cpfSend) {
        Object.defineProperty(this, "cleanCpf", {
            value: cpfSend.replace(/\D+/g, "")                                            //CRIA UMA PROPRIEDADE CLEAN CPF QUE SERVE PARA TIRAR CARACTERES INDESEJAVEIS DO CPF
        })
    }

    isSequence() {                                                                        //VERIFICA SE É SEQUENCIA
        return this.cleanCpf.charAt(0).repeat(this.cleanCpf.length) === this.cleanCpf;    //SE SE O PRIMEIRO CARACTERE REPETIDO 11 VEZES FOR IGUAL AO CPF LIMPO ELE É UMA SEQUENCIA
    }

    newCpf() {                                                                            //CRIA O NOVO CPF PARA COMPARAÇÃO
        const cpfNoDigits = this.cleanCpf.slice(0, -2);                                   //CPF SEM DIGITOS
        const digitOne = this.digitGenerator(cpfNoDigits);                                //GERA O DIGITO 1 DO CPF E ARMAZENA EM UMA CONSTANTE
        const digitTwo = this.digitGenerator(cpfNoDigits + digitOne);                     //GERA O DIGITO 2 DO CPF E ARMAZENA EM UMA CONSTANTE
        this.newCPF = cpfNoDigits + digitOne + digitTwo;                                  //JUNTA TUDO PARA VALIDAR O CPF
    }

    digitGenerator(cpfNoDigits) {                                                         //GERADOR DE DIGITOS
        let total = 0;                                                                    //CRIA UMA VARIAVEL TOTAL
        let reverse = cpfNoDigits.length + 1;                                             //CRIA UM CONTADOR REVERSO QUE ARMAZENA 10 PARA O PRIMEIRO DIGITO E 11 PARA O SEGUNDO

        for(let stringNumeric of cpfNoDigits) {                                           //ITERA SOBRE TODOS DIGITOS DO CPF
            total += reverse * Number(stringNumeric);                                     //E ARMAZENA NA VARIAVEL TOTAL A MULTIPLICAÇÃO DO REVERSE * O NUMERO DO CPF DO CPF
            reverse--;                                                                    //SUBTRAI UM DO REVERSE
        }

        const digit = 11 - (total % 11);                                                  //O DIGITO GERADO É 11 - O RESTO DO TOTAL DIVIDIDO POR 11
        return digit <= 9 ? String(digit) : "0";                                          //SE O DIGITO FOR < OU IGUAL A 9 RETORNA O NUMERO DO DIGITO SE NÃO RETORNA 0
    }

    validation() {                                                                        //VALIDA CPF
        if(typeof this.cleanCpf !== "string") return false;
        if(this.cleanCpf.length !== 11) return false;
        if(this.isSequence()) return false;
        this.newCpf();
    
        return this.newCPF === this.cleanCpf;
    }
}