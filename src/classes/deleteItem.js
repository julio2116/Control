class DeleteItem {
    constructor(nome, id, qtd) {
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

    set id(id = null) {
        if (id === null || typeof id !== "string") {
            throw new Error("id inválido");
        }
        this._id = id;
    }
    set nome(nome = null) {
        if (nome === null || typeof nome !== "string") {
            throw new Error("Nome inválido");
        }
        this._nome = nome;
    }
    set qtd(qtd = null) {
        if (qtd === null || Number.isNaN(Number(qtd))) {
            throw new Error("qtd inválido");
        }
        this._qtd = qtd;
    }

    static KeysAndValues(objeto = null) {
        if (!objeto || !(objeto instanceof DeleteItem)) {
            throw new Error("Aceita apenas instancias de DeleteItem");
        }

        const result = {};

        for (const [key, value] of Object.entries(objeto)) {
            if (key === "_fileName") continue;
            result[key.replace("_", "")] = value;
        }

        return result;
    }

}

export default DeleteItem;
