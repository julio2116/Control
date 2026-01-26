import { useState } from "react";
import submitForm from "../utils/SubmitForm";

const CreateManualForm = () => {
  const [nf, setNF] = useState({
    fileName: "manual",
    chave: "",
    numeroNota: "",
    dataEmissao: "",
    nomeEmitente: "",
    cnpjEmitente: "",
  });

  const [produtos, setProdutos] = useState([
    { descricao: "", qtd: "", valor: "", id: crypto.randomUUID() },
  ]);

  /* ===== HANDLERS ===== */
  function handleNFChange(e) {
    setNF({ ...nf, [e.target.name]: e.target.value });
  }

  function handleProdutoChange(id, field, value) {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  }

  function addProduto() {
    setProdutos((prev) => [
      ...prev,
      { descricao: "", qtd: "", valor: "", id: crypto.randomUUID() },
    ]);
  }

  function removeProduto(id) {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...nf,
      produtos: produtos.map(({ descricao, qtd, valor }) => ({
        descricao,
        qtd,
        valor,
      })),
    };

    await submitForm(e, "POST", payload);
  }

  return (
    <div className="h-full z-[1] flex items-center justify-center px-[5%] w-full">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-5 backdrop-blur-lg text-black shadow-2xl rounded-2xl p-6 border border-gray-100 max-w-[500px] w-full"
      >
        <div className="absolute -z-10 inset-0 bg-white/40 backdrop-blur-md rounded-2xl" />

        <h2 className="text-2xl font-semibold text-center">
          Inserção Manual NF
        </h2>

        {/* ===== DADOS DA NF ===== */}
        <FloatingInput name="chave" label="Chave" onChange={handleNFChange} />
        <FloatingInput name="cnpjEmitente" label="CNPJ Emitente" onChange={handleNFChange} />
        <FloatingInput name="dataEmissao" label="Data Emissão" onChange={handleNFChange} />
        <FloatingInput name="nomeEmitente" label="Nome Emitente" onChange={handleNFChange} />
        <FloatingInput name="numeroNota" label="Número da Nota" onChange={handleNFChange} />

        {/* ===== PRODUTOS ===== */}
        <div className="space-y-4">
          <h3 className="font-semibold">Produtos</h3>

          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="border border-gray-200 rounded-xl p-3 space-y-3 relative"
            >
              {produtos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduto(produto.id)}
                  className="absolute z-10 top-2 right-2 text-sm text-red-500 hover:underline cursor-pointer"
                >
                  Remover
                </button>
              )}

              <FloatingInput
                label="Descrição do Produto"
                onChange={(e) =>
                  handleProdutoChange(produto.id, "descricao", e.target.value)
                }
              />
              <FloatingInput
                label="Quantidade"
                onChange={(e) =>
                  handleProdutoChange(produto.id, "qtd", e.target.value)
                }
              />
              <FloatingInput
                label="Valor"
                onChange={(e) =>
                  handleProdutoChange(produto.id, "valor", e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addProduto}
            className="text-blue-600 text-sm hover:underline"
          >
            + Adicionar produto
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
            hover:bg-blue-700 transition-all active:scale-[0.97]"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

/* ===== INPUT COM LABEL FLUTUANTE ===== */
const FloatingInput = ({ label, name, onChange }) => (
  <label className="relative block focus-within:[&>span]:-top-2.5 cursor-pointer">
    <input
      name={name}
      placeholder=" "
      onChange={onChange}
      className="px-3 py-2 my-1 border-b-2 border-b-blue-500 w-full peer focus:outline-none cursor-pointer"
    />
    <span className="absolute top-3.5 left-3 transition-all duration-200 peer-not-placeholder-shown:-top-2.5 text-gray-600">
      {label}
    </span>
  </label>
);

export default CreateManualForm;
