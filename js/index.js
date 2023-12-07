// Jogo da Forca

let random = Math.floor(Math.random() * options.length);
const palavra = options[random]

if(localStorage.getItem('partidasJogadas')){
    const partidas = localStorage.getItem('partidasJogadas')
    let jogadas = JSON.parse(partidas)
    found = jogadas.find((element) => element == random)
    while(random == found){
        random = Math.floor(Math.random() * options.length);
    }
}
const casas = palavra.response.toUpperCase().split('', palavra.length)
const botao = document.querySelectorAll('.btn')
let letras = document.querySelector('.letras')
let opcao = null
let tentativas = 0
let erros = document.querySelector(".erros")
let acertos = 0
document.querySelector('.tema').innerHTML = `<b>Tema: ${palavra.theme}</b> com ${casas.length} letras`
let soundSuccess = document.querySelector("#soundSuccess")
let soundError = document.querySelector("#soundError")
let soundOver = document.querySelector("#soundOver")
let soundPlay = document.querySelector("#soundPlay")

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
function bloqueiaBotao(){
    for (i = 0; i < botao.length; i++) {
        botao[i].setAttribute('disabled','disabled')
    }
}
function buscaCasa(dados, item) {
    let op = document.querySelector(`#${item}`)
    for (i = 0; i < dados.length; i++) {
        found = dados.find((element) => element == item)

        if (dados[i] == item) {
            op.style.background = "green"
            op.style.color = "white"
            opcao[i].innerText = item
            formataLetra(opcao[i])
            acertos = acertos + 1
            found == item ? soundSuccess.play() : ""
        } else {
            found != item ? soundError.play() : soundError.stop
            found != item ? tentativas = tentativas + 1 : ''
            op.setAttribute('disabled', 'disabled')
        }
    }
}
function verificaTentativas() {
    if (tentativas / casas.length >= 6) {
        soundOver.play()
        bloqueiaBotao()
        erros.innerHTML = `<h1>&#128542; Fim de Jogo!</h1><h3>${palavra.gender == 'f' ? "A" : "O"} ${palavra.theme} é: ${palavra.response.toUpperCase()}</h3>`
    } else {
        erros.innerHTML = `${parseInt(tentativas / casas.length) > 0 ? 'Erros: ' + parseInt(tentativas / casas.length) : ''}`
    }
}
function partidasJogadas(){
    if(!localStorage.getItem('partidasJogadas')){
        let partidasJogadas = []
        partidasJogadas.push(random)
        let p = JSON.stringify(partidasJogadas)
        localStorage.setItem('partidasJogadas',p)
    }else{
        par = JSON.parse(localStorage.getItem('partidasJogadas'))
        par.push(random)
        let p = JSON.stringify(par)
        localStorage.setItem('partidasJogadas',p)
    }
}
function generatePontuacao() {
    if (!sessionStorage.getItem('pontuacao')) {
        sessionStorage.setItem('pontuacao', 1)
    } else {
        let to = parseInt(sessionStorage.getItem('pontuacao'))
        to = to += 1
        sessionStorage.setItem('pontuacao', to)
    }

}
function renderPontucacao() {
    document.querySelector('.pontuacao').innerHTML = sessionStorage.getItem('pontuacao') ? `Sua Pontuação é: <b>${sessionStorage.getItem('pontuacao')}<b>` : 'Você ainda não pontuou!'
}
function verificaAcertos() {
    if (acertos == casas.length) {
        generatePontuacao()
        renderPontucacao()
        partidasJogadas()
        setTimeout(() => {
            soundPlay.play()
            erros.innerHTML = `<h1>&#129395; Parabéns!</h1><h3>${palavra.gender == 'f' ? "A" : "O"} ${palavra.theme} é: ${palavra.response}</h3>`
            bloqueiaBotao()
        }, 500)
    }
}
function newGame() {
    window.location = window.location.href
}
renderPontucacao()
clicaBotao()
renderizaArray()