class ValidationForm {
    constructor() {
        this.form = document.querySelector(".form-registration");
        this.events();
    }

    events() {
        this.form.addEventListener("submit", event => {
            this.handleSubmit(event);
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const validFields = this.isValidFields();
        const validPassword = this.passwordsIsValid();

        if (validFields && validPassword) {
            alert("Formulário Enviado!");
        }
    }

    isValidFields() {
        let valid = true;

        for(let errorText of this.form.querySelectorAll(".error-text")) {
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll(".validation")) {
            const label = field.previousElementSibling.innerText;

            if(!field.value) {
                this.createError(field, `O Campo ${label} não pode estar vazio...`);
                valid = false;
            }

            if(field.classList.contains("cpf")) {
                if(!this.cpfValidation(field)) valid = false;
            }

            if(field.classList.contains("user")) {
                if(!this.userValidation(field)) valid = false;
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

    cpfValidation(field) {
        const cpf = new ValidationCPF(field.value);

        if(!cpf.validation()) {
            this.createError(field, "CPF Inválido!");
            return false;
        }

        return true;
    }

    createError(field, msg) {
        const p = document.createElement("p");
        p.innerText = msg;
        p.classList.add("error-text");
        field.insertAdjacentElement("afterend", p);
        
    }
}

const validation = new ValidationForm();
