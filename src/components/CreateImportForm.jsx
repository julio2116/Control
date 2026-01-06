import { useRef, useState } from "react";
import {
  processXMLFiles,
  processPDFs,
  sendToN8N,
} from "../utils/readData";
import Loading from "./Loading";
import submitForm from "../utils/SubmitForm";

const CreateImportForm = () => {
  const xmlRef = useRef(null);
  const pdfRef = useRef(null);

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [xmlJSON, setXmlJSON] = useState([]);
  const [pdfJSON, setPdfJSON] = useState([]);

  const webhook = "https://n8n-project-3h24.onrender.com/webhook/uploadpdf";

  async function handleXML(e) {
    console.log(e)
    setIsLoading(true);
    const result = await processXMLFiles(xmlRef.current.files, setStatus);
    setXmlJSON(result);
    xmlRef.current.value = "";
    setIsLoading(false);
  }
  
  async function handlePDF(e) {
    setIsLoading(true);
    const result = await processPDFs(e, setStatus);
    setPdfJSON(result);
    xmlRef.current.value = "";
    setIsLoading(false);
  }

  async function handleSend(e) {
    setIsLoading(true);
    console.log(xmlJSON)
    if(pdfJSON) await sendToN8N(pdfJSON, webhook, setStatus);
    if(xmlJSON) await submitForm(e, "create", xmlJSON);
    setIsLoading(false);
  }

  return (
    <>
      <div className="relative z-[1] flex items-center m-auto justify-center w-full px-[5%]">
        <form
          onSubmit={handleSend}
          className="flex flex-col gap-5 backdrop-blur-lg text-black shadow-2xl
                     rounded-2xl p-6 space-y-5 border border-gray-100
                     max-w-[500px] w-full"
        >
          <div className="absolute -z-10 inset-0 bg-white/40 backdrop-blur-md rounded-2xl m-0" />

          <h2 className="text-2xl font-semibold text-center">
            Importar Notas Fiscais
          </h2>

          <div className="flex flex-col relative gap-1">
            <label
              htmlFor="xml"
              className="font-medium mb-1 relative focus-within:[&>span]:-top-5"
            >
              <input
                id="xml"
                type="text"
                readOnly
                placeholder=" "
                className="px-3 py-2 border-b-2 border-b-blue-500 w-full
                           peer focus:outline-none cursor-pointer"
                onClick={() => xmlRef.current.click()}
              />
              <span className="absolute top-2.5 left-3.5 transition-all duration-200
                               peer-not-placeholder-shown:-top-5 text-gray-600">
                Selecionar XML
              </span>
            </label>

            <input
              ref={xmlRef}
              type="file"
              accept=".xml"
              multiple
              hidden
              onChange={handleXML}
            />
          </div>

          <div className="flex flex-col relative gap-1">
            <label
              htmlFor="pdf"
              className="font-medium mb-1 relative focus-within:[&>span]:-top-5"
            >
              <input
                id="pdf"
                type="text"
                readOnly
                placeholder=" "
                className="px-3 py-2 border-b-2 border-b-blue-500 w-full
                           peer focus:outline-none cursor-pointer"
                onClick={() => pdfRef.current.click()}
              />
              <span className="absolute top-2.5 left-3.5 transition-all duration-200
                               peer-not-placeholder-shown:-top-5 text-gray-600">
                Selecionar PDF
              </span>
            </label>

            <input
              ref={pdfRef}
              type="file"
              accept="application/pdf"
              multiple
              hidden
              onChange={handlePDF}
            />
          </div>

          {status && (
            <div className="text-sm text-center text-gray-700">
              {status}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 transition-all active:scale-[0.97]"
          >
            Enviar para processamento
          </button>
        </form>
      </div>

      {isLoading && <Loading />}
    </>
  );
};

export default CreateImportForm;
