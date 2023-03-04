var state = {board: [],curretGame: [],savedGame: [], result: null};

//função para testar todas as funções que foram criadas no inspecionar do chrome e starta a aplcação
function start(){

createBoard();
newGame();



}

// função para implementação da  interface grafica que iráser exibida ao usuario 
function createBoard(){
    state.board = [];

    for(var i = 1; i <= 60; i++){
        state.board.push(i);
    }
    

}


// quando o jogador ganha, definimos o resultado para true
function handleWin() {
    state.result = true;
    renderResult();
  }
  
  // quando o jogador perde, definimos o resultado para false
  function handleLoss() {
    state.result = false;
    renderResult();
  }
  
  // função para renderizar o resultado na página
  function renderResult() {
    var resultElement = document.querySelector('#result');
    resultElement.textContent = state.result ? 'Você ganhou!' : 'Você perdeu!';
  }
  
  // dentro da função de validar o jogo completo, verificamos se o jogador ganhou ou perdeu e chamamos a função apropriada
  function validateGameComplete() {
    if (state.currentGame.length === 6) {
      if (state.currentGame.includes(42)) {
        handleWin();
      } else {
        handleLoss();
      }
    }
  }


//funçaõ de novo jogo
function newGame(){
    resetGame();
    render();
}

function render(){
renderBoard();
renderButtons();
renderSaveGame();
}


//funçaõ redenrizar interface na tela 
function renderBoard(){

 var divBoard = document.querySelector('#megasena-board');divBoard.innerHTML = '';
 
//cria um novo elemento
var ulNumbers = document.createElement('ul');

for ( var i = 0; i < state.board.length; i++){
     var currentNumber = state.board[i];

    var liNumber = document.createElement('li');

    liNumber.textContent = currentNumber;

    liNumber.addEventListener('click', handleNumberClick);

    ulNumbers.appendChild(liNumber);
}
 divBoard.appendChild(ulNumbers);
 
}


//funçaõ para adicionar ou remover o numero que o usuario interagiu
function handleNumberClick(event){
var value = Number(event.currentTarget.textContent);

   if(isNumberInGame(value)){
     removeNumberFromGame(value);
   }else{
         addNumberToGame(value);
   }
 

}

function renderButtons(){
var divButtons = document.querySelector('#megasena-buttons');

var buttonNewGame = createNewGameButton();
var buttonCheckGame = createCheckGameButton();


divButtons.innerHTML = '';// limpar o conteúdo antes de adicionar um novo botão

divButtons.appendChild(buttonNewGame);
divButtons.appendChild(buttonCheckGame);


}

function createCheckGameButton(){
    var button = document.createElement('button');
    button.textContent = 'Verificar';

    button.addEventListener('click', checkGame);

    return button;
}

// Função para verificar se o usuário ganhou ou não
function checkGame() {
    var drawnNumbers = drawNumbers();
    var currentGame = state.currentGame;
    var matches = 0;

    for (var i = 0; i < currentGame.length; i++) {
        if (drawnNumbers.includes(currentGame[i])) {
            matches++;
        }
    }

    if (matches === 6) {
        alert('Parabéns, você ganhou!');
    } else {
        alert('Infelizmente você perdeu. Tente novamente!');
    }
}

// Função para sortear os números
function drawNumbers() {
    var drawnNumbers = [];

    while (drawnNumbers.length < 6) {
        var number = Math.floor(Math.random() * 60) + 1;

        if (!drawnNumbers.includes(number)) {
            drawnNumbers.push(number);
        }
    }

    return drawnNumbers;
}



function createNewGameButton(){
    var button = document.createElement('button');
    button.textContent = 'Novo jogo';

    button.addEventListener('click', newGame);

    return button;
}



function renderSaveGame(){

}

//função para addicionar numero
function addNumberToGame(numberToAdd){
    if (numberToAdd < 1 || numberToAdd > 60) {
        console.error('Numero invalido', numberToAdd)
        return;

    }

    if (state.curretGame.length >= 6){
        console.error('O jogo já está completo')
        return;
    }

    if(isNumberInGame(numberToAdd)){
        console.error('Este número ja está no jogo escolha outro', numberToAdd);
        return;
    }


    state.curretGame.push(numberToAdd);
}

//função para remover numeros
function removeNumberFromGame(NumberToRemove){
   
    if (NumberToRemove < 1 || NumberToRemove > 60) {
        console.error('Numero invalido', NumberToRemove);
        return;

    }


    var newGmae = [];

    for (var i = 0; i < state.curretGame.length; i++){
        var currentNumber = state.curretGame[i];

        if(currentNumber === NumberToRemove){
            continue;
    }
    newGmae.push(currentNumber);

}
 state.curretGame = newGmae;
}

//checar se a numeros do mesmo no jogo
function isNumberInGame(numberTocheck){
   // if (state.curretGame.includes(numberTocheck)){
  //      return true;
    //}
   // return false;
  //checar se o tem o mesmo numero se for verdadeiro nao executa se for false ele da a mensagem de erro
   return state.curretGame.includes(numberTocheck);
}

//função para salvar o jogo feito pelo usuario
function saveGame(){
if(!isGameComplete()){
    console.error('O jogo não esta completo!')
    return;
}
state.savedGame.push(state.curretGame);

}


//função para saber se o jogo esta completo
function isGameComplete(){
 return state.curretGame.length === 6;
}

//resertar game ou zerar os numeros 
function resetGame(){
    state.curretGame = [];
}

start();