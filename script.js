import axios from 'axios';

let submitButton = document.querySelector('#app form button');
let cepAdress = document.querySelector('#app form input');
let content = document.querySelector('#app main');

submitButton.addEventListener('click', buttonAction); 

function buttonAction(event) {
    event.preventDefault();

    let cep = cepAdress.value;

    cep = cep.replace(' ', '');
    cep = cep.replace('-', '');
    cep = cep.replace('.', '');
    cep = cep.trim();

    axios
    .get('https://viacep.com.br/ws/' + cep + '/json/')
    .then(function(response){
        content.innerHTML = '';
        createLine(response.data.logradouro + ', ' + response.data.localidade);
        createLine(response.data.uf);
    })
    .catch(function(error){
        console.log(error);
    })
}

function createLine (text) {
    let line = document.createElement('p');
    let textNode = document.createTextNode(text);

    line.appendChild(textNode);
    content.appendChild(line);
}
