let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Assume que responsiveVoice.speak está definido em seu HTML
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
}

function exibirMensagemInstruc() {
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 100');
}

exibirMensagemInicial();
setTimeout(exibirMensagemInstruc, 1800);
exibirMensagemInstruc();



function verificarChute() {
    // Captura o valor do input como STRING
    let chute = document.querySelector('input').value;

    // --- IMPLEMENTAÇÃO DA VALIDAÇÃO ---
    // 1. Verifica se a string está vazia (chute.length === 0)
    // 2. Verifica se o valor NÃO É UM NÚMERO (isNaN(chute))
    // 3. Verifica se o número está fora do limite (opcional, mas bom para UX)
    if (chute.length === 0 || isNaN(chute) || chute < 1 || chute > numeroLimite) {

        exibirTextoNaTela('p', 'Entrada inválida! Escolha um número válido entre 1 e 100.');
        limparCampo();
        // O 'return' aqui é crucial: ele impede que o restante da função (lógica do jogo) seja executado.
        return;
    }

    // Se a entrada for válida, convertemos para Número e continuamos a lógica
    let chuteNumerico = parseInt(chute);

    if (chuteNumerico === numeroSecreto) { // Use === para comparação estrita
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chuteNumerico > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    // A variável 'chute' usada aqui não precisa ser declarada como let novamente,
    // mas vamos manter o padrão para garantir que funcione se for chamada fora.
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    // Certifique-se de que o ID 'reiniciar' existe no seu HTML
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
