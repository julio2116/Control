const retorno = (retorno) => {
    if(retorno.status === 'created'){
        alert('criado com sucesso, item: ', retorno.id)
    }
}

export default retorno