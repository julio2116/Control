
import Produto from "./produto";

class CreateItem {
    constructor(
        fileName,
        chave,
        numeroNota,
        dataEmissao,
        nomeEmitente,
        cnpjEmitente,
        produtos,
    ) {
        this.chave = chave;
        this.cnpjEmitente = cnpjEmitente;
        this.dataEmissao = dataEmissao;
        this.fileName = fileName;
        this.nomeEmitente = nomeEmitente;
        this.numeroNota = numeroNota;
        this.produtos = produtos;
    }

    set chave(chave = null) {
        // this.verifyKey(chave, "chave");
        console.log(chave)
        this._chave = chave;
    }
    
    set cnpjEmitente(cnpjEmitente = null) {
        // this.verifyKey(cnpjEmitente, "cnpjEmitente");
        console.log(cnpjEmitente)
        this._cnpjEmitente = cnpjEmitente;
    }

    set dataEmissao(dataEmissao = null) {
        // this.verifyKey(dataEmissao, "dataEmissao");
        console.log(dataEmissao)
        this._dataEmissao = dataEmissao;
    }

    set fileName(fileName = null) {
        // this.verifyKey(fileName, "fileName");
        console.log(fileName)
        this._fileName = fileName;
    }

    set nomeEmitente(nomeEmitente = null) {
        // this.verifyKey(nomeEmitente, "nomeEmitente");
        console.log(nomeEmitente)
        this._nomeEmitente = nomeEmitente;
    }

    set numeroNota(numeroNota = null) {
        // this.verifyKey(numeroNota, "numeroNota");
        console.log(numeroNota)
        this._numeroNota = numeroNota;
    }

    set produtos(produtos = null) {
        console.log(produtos)
        if(produtos === null || !(produtos instanceof Array)){
            throw new Error("produtos deve ser um array válido");
        }
        for(let item in produtos){
            try{
                item = new Produto(item);
            }catch(e){
                throw new Error(e);
            }
            if(!(item instanceof Produto)){
                throw new Error("item não é do tipo produto");
            }
        }
        this._produtos = produtos;
    }

    verifyKey(value, key) {
        if (value === null || typeof value !== "string") {
            throw new Error(`${key} invalida`);
        }
    }

    static KeysAndValues(objeto = null) {
        if (!objeto || !(objeto instanceof CreateItem)) {
            throw new Error("Aceita apenas instancias de CreateItem");
        }

        let formatObjeto = "";
        for (const [key, value] of Object.entries(objeto)) {
            if(key === "_fileName"){
                continue;
            }
            formatObjeto += key.replace("_", "") + "=" + JSON.stringify(value) + "&";
        }
        formatObjeto = formatObjeto.slice(0, -1);
        return formatObjeto;
    }
}

export default CreateItem