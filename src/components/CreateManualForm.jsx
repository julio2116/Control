import { useState } from "react";

const CreateManualForm = () => {
  const [produtos, setProdutos] = useState([
    { descricao: "", qtd: "", valor: "", id: crypto.randomUUID() },
  ]);

  function addProduto() {
    setProdutos((prev) => [
      ...prev,
      { descricao: "", qtd: "", valor: "", id: crypto.randomUUID() },
    ]);
  }

  function removeProduto(index) {
    setProdutos((prev) => prev.filter((produto) => produto.id !== index));
  }

  return (
    <div className=" h-full z-[1] flex items-center justify-center px-[5%] md:mt-0 w-full">
      <form className="flex flex-col gap-5 backdrop-blur-lg text-black shadow-2xl rounded-2xl p-6 border border-gray-100 max-w-[500px] w-full">
        <div className="absolute -z-10 inset-0 bg-white/40 backdrop-blur-md rounded-2xl" />

        <h2 className="text-2xl font-semibold text-center">
          Inserção Manual NF
        </h2>

        {/* ===== DADOS DA NF ===== */}
        <FloatingInput label="Chave" />
        <FloatingInput label="CNPJ Emitente" />
        <FloatingInput label="Data de Emissão" />
        <FloatingInput label="Emitente" />
        <FloatingInput label="Número da Nota" />

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
                  className="absolute top-2 z-100 right-2 text-sm text-red-500 hover:underline"
                >
                  Remover
                </button>
              )}

              <FloatingInput label="Descrição do Produto" />
              <FloatingInput label="Quantidade" />
              <FloatingInput label="Valor" />
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
const FloatingInput = ({ label }) => (
  <label className="relative block focus-within:[&>span]:-top-2.5">
    <input
      placeholder=" "
      className="px-3 py-2 my-1 border-b-2 border-b-blue-500 w-full peer focus:outline-none"
    />
    <span className="absolute top-3.5 left-3 transition-all duration-200 peer-not-placeholder-shown:-top-2.5 text-gray-600">
      {label}
    </span>
  </label>
);

export default CreateManualForm;
