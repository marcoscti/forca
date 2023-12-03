// Jogo da Forca
const palavras = [
    "AZUL",
    "AMARELO",
    "VERDE",
    "PRETO",
    "LILAS",
    "ROXO",
    "BEGE",
    "INDIGO",
    "AMETISTA",
    "BRONZE",
    "CARMESIM",
    "CENOURA",
    "CEREJA",
    "CINZA",
    "COBRE",
    "CORAL",
    "DOURADO",
    "DAINISE",
    "EBANO",
    "ESMERALDA",
    "EUCALIPTO",
    "FANDANGO",
    "FUSCIA",
    "FERRUGEM",
    "GOIABA",
    "JADE",
    "JASMINE",
    "JAMBO",
    "LARANJA",
    "LAVANDA",
    "MAGENTA",
    "MARFIM",
    "MOCASSIM",
    "MOSTARDA",
    "NEVE",
    "OLIVA",
    "OURO",
    "PURPURA",
    "PRATA",
    "PARDO",
    "ROSA",
    "ROXO",
    "TURQUESA",
    "TERRACOTA",
    "TANGERINA",
    "VERMELHO",
    "VIOLETA"
];
const random = Math.floor(Math.random() * palavras.length);
const tema = "cor"
const palavra = palavras[random]
const casas = palavra.split('', palavra.length)
const botao = document.querySelectorAll('.btn')
let letras = document.querySelector('.letras')
let opcao = null
let tentativas = 0
let erros = document.querySelector(".erros")
let acertos = 0
document.querySelector('.tema').innerText = `Tema: ${tema} com ${casas.length} letras`

function renderizaArray() {
    for (i = 0; i < casas.length; i++) {
        letras.insertAdjacentHTML('beforeend', `<p class="opcao"></p>`)
    }
    opcao = document.querySelectorAll('.opcao')
}
function formataLetra(letra) {
    letra.style.textAlign = "center"
    letra.style.fontSize = "40px"
}
function clicaBotao() {
    for (i = 0; i < botao.length; i++) {
        botao[i].addEventListener('click', (e) => {
            buscaCasa(casas, e.target.innerText)
            verificaTentativas()
            verificaAcertos()
        })
    }
}
function buscaCasa(dados, item) {
    let op = document.querySelector(`#${item}`)
    for (i = 0; i < dados.length; i++) {
        if (dados[i] == item) {
            op.style.background = "green"
            op.style.color = "white"
            opcao[i].innerText = item
            formataLetra(opcao[i])
            acertos = acertos + 1
        } else {
            found = dados.find((element) => element == item)
            found != item? tentativas = tentativas + 1: ''
            op.setAttribute('disabled', 'disabled')
        }
    }
}
function verificaTentativas() {
    if (tentativas / casas.length >= 6) {
        erros.innerHTML = `<h1>&#128542; Fim de Jogo!</h1><h3>A ${tema} é: ${palavra}</h3>`
    } else {
        erros.innerHTML = `${parseInt(tentativas / casas.length) > 0 ? 'Erros: ' + parseInt(tentativas / casas.length) : ''}`
    }
}
function verificaAcertos() {
    if (acertos == casas.length) {
        erros.innerHTML = `<h1>&#129395; Parabéns!</h1><h3>A ${tema} é: ${palavra}</h3>`
    }
}

clicaBotao()
renderizaArray()