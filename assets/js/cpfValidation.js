class ValidationCPF {
    constructor(cpfSend) {
        Object.defineProperty(this, "cleanCpf", {
            value: cpfSend.replace(/\D+/g, "")
        })
    }

    isSequence() {
        return this.cleanCpf.charAt(0).repeat(this.cleanCpf.length) === this.cleanCpf;
    }

    newCpf() {
        const cpfNoDigits = this.cleanCpf.slice(0, -2);
        const digitOne = this.digitGenerator(cpfNoDigits);
        const digitTwo = this.digitGenerator(cpfNoDigits + digitOne);
        this.newCPF = cpfNoDigits + digitOne + digitTwo;
    }

    digitGenerator(cpfNoDigits) {
        let total = 0;
        let reverse = cpfNoDigits.length + 1;

        for(let stringNumeric of cpfNoDigits) {
            total += reverse * Number(stringNumeric);
            reverse--;
        }

        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : "0";
    }

    validation() {
        if(typeof this.cleanCpf !== "string") return false;
        if(this.cleanCpf.length !== 11) return false;
        if(this.isSequence()) return false;
        this.newCpf();
    
        return this.newCPF === this.cleanCpf;
    }
}
