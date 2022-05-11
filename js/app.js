import { valida } from "./validacao.js";

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {

    if(input.dataset.tipo ==='preco'){
        SimpleMaskMoney.setMask(input, {
        prefix : 'R$', 
        fixo : ​​true , 
        fraçãoDigits : 2 , 
        decimalSeparator : ',' , 
        milharesSeparator : '.' , 
        cursor : 'end'   
        });
    }
    input.addEventListener('blur', (evento) => {
        valida(evento.target);
    })
})