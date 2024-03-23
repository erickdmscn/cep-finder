let submitButton = document.querySelector('#app form button');
let cepAdress = document.querySelector('#app form input');
let content = document.querySelector('#app main');

submitButton.addEventListener('click', buttonAction);

async function buttonAction(event) {
    event.preventDefault();

    let cep = cepAdress.value;

    cep = cep.replace(' ', '');
    cep = cep.replace('-', '');
    cep = cep.replace('.', '');
    cep = cep.trim();

    try {
        const response = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
        const data = await response.json();
        if (data.erro) {
            content.innerHTML = ''
            throw new Error('CEP inválido');         
        }
        content.innerHTML = '';
        createLine(data.logradouro + ', ' + data.localidade);
        createLine(data.uf);
    } catch (error) {
        content.innerHTML = ''; 
        console.log(error);
        createLine('CEP inválido');
    }
}

function createLine(text) {
    let line = document.createElement('p');
    let textNode = document.createTextNode(text);

    line.appendChild(textNode);
    content.appendChild(line);
}
