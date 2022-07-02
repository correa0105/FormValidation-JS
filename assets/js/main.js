class ValidationForm {
    constructor() {                                                                       //CRIA UM CONSTRUTOR
        this.form = document.querySelector(".form-registration");                         //INICIALIZA O FORMULARIO
        this.events();                                                                    //INICIALIZA OS EVENTOS
    }

    events() {                                                                            //A FUNÇÃO EVENTO
        this.form.addEventListener("submit", event => {                                   //CAPTURA O BOTAO
            this.handleSubmit(event);                                                     //EXECUTA A FUNÇÃO HANDLESUBMIT COM O EVENTO CAPTURADO
        })
    }

    handleSubmit(event) {                                                                 //FUNÇÃO PARA LIDAR COM O SUBMIT
        event.preventDefault();                                                           //NÃO ENVIA O FURMULÁRIO
        const validFields = this.isValidFields();                                         //EXECUTA A FUNÇÃO PARA VALIDAR CAMPOS E ARMAZENA EM UMA CONSTANTE
        const validPassword = this.passwordsIsValid();

        if (validFields && validPassword) {
            alert("Formulário Enviado!");
        }
    }

    isValidFields() {                                                                     //FUNÇÃO DE VALIDAÇÃO DE FORMULÁRIO
        let valid = true;                                                                 //VALID RECEBE TRUE

        for(let errorText of this.form.querySelectorAll(".error-text")) {                 //FOR PARA REMOVER OS TEXTOS DUPLICADOS
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll(".validation")) {                     //SELECIONA TODOS OS CAMPOS QUE TENHAM A CLASSE VALIDATION
            const label = field.previousElementSibling.innerText;                         //ARMAZENA EM UMA CONSTANTE O TEXTO DO LABEL

            if(!field.value) {                                                            //SE VALOR FOR VAZIO (OU SEJA DIFERENTE DE VERDADEIRO)
                this.createError(field, `O Campo ${label} não pode estar vazio...`);      //CHAMA A FUNÇÃO DE CRIAR ERRO COM O CAMPO, E O TEXTO A SER EXIBIDO
                valid = false;                                                            //E TORNA O VALID PARA FALSE POIS O FORMULARIO NÃO É MAIS VALIDO
            }

            if(field.classList.contains("cpf")) {                                         //SE O INPUT POSSUIR A CLASSE CPF
                if(!this.cpfValidation(field)) valid = false;                             //SE A A VALIDAÇÃO DO CPF FOR FALSE, TORNA O VALID COMO FALSE
            }

            if(field.classList.contains("user")) {                                         //SE O INPUT POSSUIR A CLASSE USER
                if(!this.userValidation(field)) valid = false;                             //SE A A VALIDAÇÃO DO USER FOR FALSE, TORNA O VALID COMO FALSE
            }
        }

        return valid;
    }

    passwordsIsValid() {
        let valid = true;

        const password = this.form.querySelector(".passwordValidation");
        const passwordRepeat = this.form.querySelector(".repeat-passwordValidation");

        if (password.value !== passwordRepeat.value) {
            this.createError(passwordRepeat, "As senhas precisam ser iguais.");
            valid = false;
        }

        if (password.value.length < 6 || password.value.length > 18) {
            this.createError(password, "A senha deve ter entre 6 e 18 caracteres");
            valid = false;
        }

        return valid
    }

    userValidation(field) {
        const user = field.value;
        let valid = true;

        if (user.length < 6 || user.length > 12) {
            this.createError(field, "O Usuario deve ter entre 6 e 12 caracteres");
            valid = false;
        }

        if (!user.match(/^[a-zA-z0-9]+$/g)) {
            this.createError(field, "Usuario deve conter apenas letras e/ou numeros");
            valid = false;
        }

        return valid
    }

    cpfValidation(field) {                                                                //FUNÇÃO PARA VALIDAR CPF
        const cpf = new ValidationCPF(field.value);                                       //INSTACIA O OBJETO DE VALIDAÇÃO PEGANDO O VALUE DO CAMPO

        if(!cpf.validation()) {                                                           //SE A VALIDAÇÃO RETORNAR FALSE 
            this.createError(field, "CPF Inválido!");                                     //CHAMA A FUNÇÃO DE CRIAR ERRO NO CAMPO ATUAL
            return false;                                                                 //RETORNA FALSE
        }

        return true;                                                                      //SE NÃO RETORNA VERDADEIRO
    }

    createError(field, msg) {                                                             //FUNÇÃO PARA CRIAR ERRO
        const p = document.createElement("p");                                            //ARMAZENA EM UMA CONSTANTE A CRIAÇÃO DE UM ELEMENTO DIV
        p.innerText = msg;                                                                //A DIV RECEBE A MENSAGEM
        p.classList.add("error-text");                                                    //ADICIONA UMA CLASSE A DIV
        field.insertAdjacentElement("afterend", p);                                       //O CAMPO RECEBE AO FINAL DO SEU ELEMENTO A DIV CRIADA
        
    }
}

const validation = new ValidationForm();