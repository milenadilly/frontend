let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let descricao = document.querySelector('.d1-4');
let aviso = document.querySelector('.d2');
let lateral = document.querySelector('.d1-right');
let numeros = document.querySelector('.d1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';

    for(let i = 0; i < etapa.numeros; i++) {
        if(i === 0) {
            numeroHtml += `<div class="numero pisca"></div>`;
        } else {
            numeroHtml += `<div class="numero"></div>`;
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none'
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

       let fotosHtml = '';
         for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d1-image small"><img src="images/${candidato.fotos[i].url}" alt="Candidato">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d1-image"><img src="images/${candidato.fotos[i].url}" alt="Candidato">${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;

    }

    console.log(candidato);
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface()
        }
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function branco(){
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = ''; 
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    if(votoBranco === true) {
        votoConfirmado = true;

       votos.push({
        etapa: etapas[etapaAtual],
        voto: 'branco'
       })
    } else if (numero.length === etapa.numeros && numero !== '') {
        votoConfirmado = true;
       
        votos.push({
        etapa: etapas[etapaAtual],
        voto: 'branco'
       });
    } else if (numero.length === etapa.numeros && numero !== '') {
        votoConfirmado = true;

        votos.push({
            etapa: etapas[etapaAtual],
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapa[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa()