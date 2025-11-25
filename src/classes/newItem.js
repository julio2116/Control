class NewItem {
    constructor(nome = null, email = null, mensagem = null) {
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
    }

    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    get mensagem() {
        return this._mensagem;
    }

    set nome(nome) {
        if (typeof nome !== "string") {
            throw new Error("Nome inválido");
        }
        this._nome = nome;
    }
    set email(email) {
        if (typeof email !== "string") {
            throw new Error("Email inválido");
        }
        this._email = email;
    }
    set mensagem(mensagem) {
        if (typeof mensagem !== "string") {
            throw new Error("Mensagem inválida");
        }
        this._mensagem = mensagem;
    }

    static KeysAndValues(objeto = null) {
        if (!objeto || !(objeto instanceof NewItem)) {
            throw new Error("Aceita apenas instancias de NewItem");
        }

        let formatObjeto = "";
        for (const [key, value] of Object.entries(objeto)) {
            formatObjeto += key.replace("_", "") + "=" + value + "&";
        }
        formatObjeto = formatObjeto.slice(0, -1)
        return formatObjeto
    }
}

export { NewItem };
