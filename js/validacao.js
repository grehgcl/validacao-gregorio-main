export function valida(input){
    const tipoDeInput= input.dataset.tipo

    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(input, tipoDeInput)

    }
    }
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',

]



const mensagensDeErro= {
    nome:{
        valueMissing: 'Este campo é obrigatório',
    },
    email:{
        valueMissing: 'Este campo é obrigatório',
        typeMismatch: 'Digite um e-mail válido'
    },
    senha:{
        valueMissing: 'Este campo é obrigatório',
        patternMismatch: 'A senha deve conter no mínimo 6 caracteres'
    },
    dataNascimento:{
        valueMissing: 'Este campo é obrigatório',
        customError: 'Digite uma data válida'
    },
    cpf:{
        valueMissing: 'Este campo é obrigatório',
        customError: 'Digite um CPF válido',
    cep:{
        valueMissing: 'Este campo é obrigatório',
        patternMismatch: 'Digite um CEP válido',
        customError: 'Digite um CEP válido'
    
    },
    cidade:{
        valueMissing: 'Este campo é obrigatório',

    },
    logradouro:{
        valueMissing: 'Este campo é obrigatório',
    },
    estado:{
        valueMissing: 'Este campo é obrigatório',
    },
    preco:{
        valueMissing: 'Este campo é obrigatório',
    }

    }
    
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input => recuperarCEP(input)
}

function mostraMensagemDeErro(tipoDeInput,input,) {
    let mensagem= ' '
    tiposDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
}
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

function validaCPF(input) {
    const cpfFromatado = input.value.replace(/[^\d]+/g, '');
    let mensagem = ''

    if(!checaCPFRepetido(cpfFromatado) || !checaEstruturaCPF(cpfFromatado)){
        mensagem = 'CPF inválido'
    }
    
    input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    let cpfValido = true
    valoresRepetidos.forEach(valor => {
        if(valor == cpf ){
            cpfValido = false
        }
    })
    return cpfValido
}

function checaEstruturaCPF(cpf){
    const multiplcador = 10
    return checaDigitoVerificvador(cpf, multiplcador)
}

function checaDigitoVerificador(cpf, multiplcador){
    if (multiplcador >= 12){
        return true
    }

    let multiplcadorInicial = multiplcador
    let soma = 0
    const cpfSemDigitos = cpf.substr(0, multiplcador - 1).split('')
    const digitoVerificador = cpf.charArt(multiplcador - 1)
    for(let contador = 0; multiplcadorInicial > 1; multiplcadorInicial --) {
        soma += cpfSemDigitos[contador] * multiplcadorInicial
        contador ++
    }
    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplcador + 1)
    }
    return false
}



function confirmaDigito(soma){
    return 11 - soma % 11
}

function recuperarCEP(input) {
    const cep = input.value.replace(/[^\d]+/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                input.setCustomValidity('CEP inválido')
                return
            }
            input.setCustomValidity('')
            preencheCamposComCep(data)
            return 
          }
        
        )
    }
}

function preencheCamposComCep (data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf

}