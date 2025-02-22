/*==================== Pegando os elementos principais ================*/
let button = document.querySelector("#submit_word");
let input = document.querySelector("#word_input");
let display = document.querySelector(".display");
/*=================== Definindo o código ============================*/

//Variável que mantém o número de tentaivas restantes (É um array para que ela possa ser modificada por dentro da funçãos);
let remaining_attempts = [6];

//Pega uma palavra aleatória dentre as 200 disponíveis
let word = words[Math.trunc(Math.random() * 200)].toUpperCase();
//Função principal do jogo
function testar_palavra(user_guess) {
  //Verifica se a entrada é composta por 5 caracteres de letra
  if (
    user_guess.length !== 5 ||
    user_guess.match(/[A-Z||a-z]*/)[0].length !== 5
  ) {
    alert("Digite uma palavra válida!");
    return;
  }

  //converte a palavra para letras maiúsculas
  user_guess = user_guess.toUpperCase();

  //Serve pra verificar as letras que ainda faltam serem verificadas
  let remaining_chars = word;

  //Serve pra guardar  os elementos HTML que serão mostrados na tela
  let letters_div = [];

  //Variável para o número de acertos
  let qt_correct_letters = 0;

  //Testando pra ver se as letras estão certas
  for (let i = 0; i < 5; i++) {
    //Cria o elemento que será mostrado na tela
    let display_letter = document.createElement("div");
    display_letter.innerText = user_guess[i];
    display_letter.classList.add("letter");
    //Caso a letra esteja correta e na poosição correta
    if (word[i] === user_guess[i]) {
      //Retira dos caracteres restantes
      remaining_chars = remaining_chars.replace(word[i], "-");
      //adiciona a classe correspondente ao elemento se ele estiver correto
      display_letter.classList.add("correct-nd-right-place");
      //incrementa a quantidade de acertos
      qt_correct_letters++;
    }
    //Adiciona o elemento na lista
    letters_div[i] = display_letter;
  }

  for (let i = 0; i < 5; i++) {
    //Verifica se a letra está na palavra chave, mas em outra posição, se ela já não foi marcada como correta
    if (
      remaining_chars.indexOf(user_guess[i]) !== -1 &&
      word[i] !== user_guess[i]
    ) {
      //Se sim, remove ela dos caracteres restantes para comparação
      remaining_chars = remaining_chars.replace(user_guess[i], "-");
      //Adiciona a classe correspondente ao elemento de comparação atual
      letters_div[i].classList.add("correct");
    }
  }

  //Loop de inserção dos elementos do DOM
  letters_div.forEach((letra) => {
    display.appendChild(letra);
  });

  //Verifica se o jogador ganhou o jogo
  if (qt_correct_letters === 5) {
    input.disabled = true;
    button.disabled = true;
    alert(
      "Parabéns!\n\nVocê acertou a palavra!\n\nRecarregue a página para jogar novamente."
    );
    location.reload();
  }

  //Reduz em um o número de tentativas
  remaining_attempts[0]--;

  //Verifica se o jogador perdeu o jogo
  if (remaining_attempts[0] === 0) {
    input.disabled = true;
    button.disabled = true;
    alert(
      `Que pena!\n\nA palavra certa era ${word}\n\nRecarregue a página para jogar novamente.`
    );
    location.reload();
  }
  //Reseta o input
  input.value = "";
}

/*======================= Adicionando os eventos=====================*/

button.addEventListener("click", function () {
  testar_palavra(input.value);
});

input.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    testar_palavra(this.value);
    e.preventDefault();
  }
});
