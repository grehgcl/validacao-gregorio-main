const dataNasciemnto = dataNasciemnto.querySelector('#dataNascimento');
dataNasciemnto.addEventListener('blur', (evento) => {
    validaDataNascimento(evento.target);
})

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value);
    let mensagem = ''

    if (!maiorQue18(dataRecebida)) {
        mensagem = 'Voçê deve ser maior de 18 anos para se cadastrar'
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataMais18 <= dataAtual

}