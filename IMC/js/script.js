
//integrando html em javaScript

function start()
{
  var botaoCalcular = document.querySelector('#button');
      botaoCalcular.addEventListener('click', handleButtonClick);

    var inputWeight = document.querySelector('#input-weight');
    var inputHeight = document.querySelector('#input-height');

    inputWeight.addEventListener('input',handleButtonClick);
    inputHeight.addEventListener('input',handleButtonClick);

      handleButtonClick();
}

function calcular(weight, height)

{
    return weight / (height * height); 

}


function handleButtonClick(){

    var inputWeight = document.querySelector('#input-weight');
    var inputHeight = document.querySelector('#input-height');
    var imcResultado = document.querySelector('#resultado');

    var weight = Number(inputWeight.value);
    var height = Number(inputHeight.value);

    var imc = calcular(weight, height);
    var formattedimc = imc.toFixed(2).replace('.', ',');
   
    imcResultado.textContent = formattedimc;
}

start();