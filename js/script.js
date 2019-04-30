var id_cor_old = "nada";
var id_cor = "";
var cor = null;
var objetivo = [];
var cores_escolhidas = [];
var last_btn = 4; 
var round = 1; 
var acertos = 0;
var temp_inicio = new Date();
var cores = ["Amarelo","Azul","Laranja","Verde","Vermelho","Roxo"];

$(document).ready(function(){
  $(".bar").click(function(){
    $("ul").toggleClass("active");
  })
})

//Começa o jogo
function StartGame(){  
  for( var i=0; i<4; i++){
      b=Math.floor(Math.random() * 6);
      objetivo[i] = cores[b];
  }
  AddNewGame();
} 

//Reseta as Variáveis
function ResetVar(){
  id_cor_old = "nada";
  cores_escolhidas = [];
  last_btn = 4;
  round = 1;
  acertos = 0;
  temp_inicio = new Date();
}

//Deleta o a tela do jogo velho e começa um novo
function DeleteOldGame(){
  $("#jogo").remove();
  ResetVar();
  StartGame();
}

//adiciona a tela do novo jogo
function AddNewGame(){
  $(`
  <div id="jogo">
    <div class="row">
        <div class="t-top title-b-1">Rodada</div>
        <div class="t-top title-b-2">Mastermind O jogo</div>
        <div class="t-top title-b-1">Verificação</div>
    </div>
    <div class="row">
        <div class="bloco">
            <div class="round" data-balloon="Rodada" data-balloon-pos="left">1</div>
        </div>
        <div class="bloco">
            <div class="botao cor-btn m-btn" id="botao-0" onclick="MudaCor(0)"></div>
        </div>
        <div class="bloco">
            <div class="botao cor-btn m-btn" id="botao-1" onclick="MudaCor(1)"></div>
        </div>
        <div class="bloco">
            <div class="botao cor-btn m-btn" id="botao-2" onclick="MudaCor(2)"></div>
        </div>
        <div class="bloco">
            <div class="botao cor-btn m-btn" id="botao-3" onclick="MudaCor(3)"></div>
        </div>
        <div class="bloco">
            <div class="ver cor-btn" id="conf-0"></div>
            <div class="ver cor-btn" id="conf-1"></div>
            <div class="ver cor-btn" id="conf-2"></div>
            <div class="ver cor-btn" id="conf-3"></div>
        </div>
      </div>
    </div>
  `).appendTo($(".tab"));
}

//determina a cor escolhida de a cordo com o id passado pelo botão cor
function CorEscolhida(id){
  switch (id) {
    case 0:
      cor = "Amarelo";
      id_cor = 0;
      break;
  
    case 1:
      cor = "Azul";
      id_cor = 1;
      break;
    case 2:
      cor = "Laranja";
      id_cor = 2;
      break;
    case 3:
      cor = "Vermelho";
      id_cor = 3;
      break;
    case 4:
      cor = "Verde";
      id_cor = 4;
      break;
    case 5:
      cor = "Roxo"
      id_cor = 5;
      break;
  }
  if(id!=id_cor_old){
    document.getElementById("selec-"+id).className = "selecionado";
  }
  if(id_cor_old!="nada"){
  document.getElementById("selec-"+id_cor_old).className = "selecao"; 
  }
  id_cor_old = id;
} 

//Muda cor ao clicar no pino do jogo
function MudaCor(id){
  if (cor!=null){
    cores_escolhidas[id%4] = cor;
    document.getElementById("botao-"+id).className = "botao "+"cor-"+id_cor+ " m-btn" ;
  }
}


// confere as cores certas e erradas
function Conferir(){
  var inserido = true;
  for (var i=last_btn-4; i<last_btn; i++){
    if (document.getElementById("botao-"+i).className == "botao cor-btn m-btn"){
      alert("Por favor adicione cores a todos os botões");
      inserido = false;
      break;
    }

    if(cores_escolhidas[i%4] == objetivo[i%4]){
      document.getElementById("conf-"+i).className = "ver cor-l-certo";
      $("#conf-"+i).attr({
        "data-balloon" : "A cor está no lugar certo",
        "data-balloon-pos" : "up"
      })
      acertos +=1
      }
      else if($.inArray(cores_escolhidas[i%4],objetivo)!=-1){
      document.getElementById("conf-"+i).className = "ver cor-certa";
      $("#conf-"+i).attr({
        "data-balloon" : "A cor está certa, mas no lugar errado",
        "data-balloon-pos" : "up"
      })
    }
  }
  //verifica se o jogador ganhou
  if (acertos==4){
  var modal = document.getElementById("modal_ganho");
    // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[1];

  span.onclick = function() {
    modal.style.display = "none";
  }
  modal.style.display = "block";
  var temp_end = new Date();
  var diferenca = temp_end.getTime() - temp_inicio.getTime();
  var segundos = Math.floor( ( diferenca % ( 60 * 1000 ) ) / 1000 );
  var minutos = Math.floor( ( diferenca % (1000 * 60 * 60) ) / ( 1000 * 60 ) );
  
  //Adicionar o 0 a mais nos minytos e nos segundos
  if (segundos<10){
    segundos = "0" + segundos
  }
  if(minutos<10){
    minutos = "0" + minutos 
  }
  
  document.getElementById("rod").innerHTML = "Rodadas: " + round;
  document.getElementById("temp").innerHTML = "Tempo Levado (mm:ss) : " + minutos + ":" + segundos;
  return;
  }

  if (inserido==true){
    round +=1;
    if(round==11){
      var modal = document.getElementById("modal_perdido");
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[2];
      modal.style.display = "block";
      span.onclick = function() {
        modal.style.display = "none";
      }
      return;
    }
    $(`<div class="row">
      <div class="bloco">
        <div class="round" data-balloon="Rodada" data-balloon-pos="left">`+round+`</div>
      </div>
      <div class="bloco">
        <div class="botao cor-btn m-btn" id="botao-`+last_btn+`" onclick="MudaCor(`+last_btn+`)"></div>
      </div>
      <div class="bloco">
        <div class="botao cor-btn m-btn" id="botao-`+(last_btn+1)+`" onclick="MudaCor(`+(last_btn+1)+`)"></div>
      </div>
      <div class="bloco">
        <div class="botao cor-btn m-btn" id="botao-`+(last_btn+2)+`" onclick="MudaCor(`+(last_btn+2)+`)"></div>
      </div>
      <div class="bloco">
        <div class="botao cor-btn m-btn" id="botao-`+(last_btn+3)+`" onclick="MudaCor(`+(last_btn+3)+`)"></div>
      </div>
      <div class="bloco">
        <div class="ver cor-btn" id="conf-`+last_btn+`"></div>
        <div class="ver cor-btn" id="conf-`+(last_btn+1)+`"></div>
        <div class="ver cor-btn" id="conf-`+(last_btn+2)+`"></div>
        <div class="ver cor-btn" id="conf-`+(last_btn+3)+`"></div>
      </div>
    </div>
  `).appendTo($("#jogo"));
    last_btn +=4;
    acertos=0;
  }
}

function Modal(id, id_modal){
  // Get the modal
  var modal = document.getElementById(id_modal);


  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0]; 
  
  modal.style.display = "block";
  

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

