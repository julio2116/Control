class NewItem {
    constructor(nome = null, id = null, qtd = null) {
        this.id = id;
        this.nome = nome;
        this.qtd = qtd;
    }

    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get qtd() {
        return this._qtd;
    }

    set id(id) {
        if (typeof id !== "string") {
            throw new Error("id inválido");
        }
        this._id = id;
    }
    set nome(nome) {
        if (typeof nome !== "string") {
            throw new Error("Nome inválido");
        }
        this._nome = nome;
    }
    set qtd(qtd) {
        if (typeof qtd !== "string") {
            throw new Error("qtd inválido");
        }
        this._qtd = qtd;
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
