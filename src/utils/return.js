const retorno = (retorno) => {
    if(retorno.status === 'created'){
        console.log(retorno)
        
        alert('criado com sucesso, item: ', retorno.id)
    }
}

export default retorno