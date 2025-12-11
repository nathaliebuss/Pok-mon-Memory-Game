//CONSTRUCTOR//
function memoryCards(name, image) {
  (this.name = name), (this.image = image);
}

//CARD INFO//
let dragonite = new memoryCards("dragonite", "images/dragonite.jpg");
let mimikyu = new memoryCards("mimikyu", "images/mimikyu.jpg");
let snorlax = new memoryCards("snorlax", "images/snorlax.jpg");
let eevee = new memoryCards("eevee", "images/eevee.jpg");
let oshawatt = new memoryCards("oshawatt", "images/oshawatt.jpg");
let ditto = new memoryCards("ditto", "images/ditto.jpg");

let pokemons = [dragonite, mimikyu, snorlax, eevee, oshawatt, ditto];
let deck = [...pokemons, ...pokemons];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0

const movesCounter = document.getElementById(".movesCounter")
const cardsContainer = document.querySelector(".game");

//FOR LOOP TO SHUFFLE MEMORY CARDS
const shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[random]] = [deck[random], deck[i]];
  }
};

const resetBoard = () => {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  // Remove 'matched' class from all cards when resetting
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("matched");
  });
};

//CLICK LISTENER
const cardLogic = (div) => {
  div.addEventListener("click", () => {
    if (lockBoard) return;
    if (div === firstCard) return;

    const img = div.querySelector("img");
    img.src = img.dataset.pokemon; // flip card

    if (!firstCard) {
      firstCard = div;
    } else {
      secondCard = div;
      lockBoard = true;

      const firstImg = firstCard.querySelector("img");
      const secondImg = secondCard.querySelector("img");

      if (firstImg.src === secondImg.src) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      } else {
        setTimeout(() => {
          firstImg.src = "images/back-card.jpg";
          secondImg.src = "images/back-card.jpg";
          firstCard = null;
          secondCard = null;
          lockBoard = false;
        }, 800);
      }
    }
  });
};

const renderDeck = () => {
  cardsContainer.innerHTML = "";

  deck.forEach((card) => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = "images/back-card.jpg";
    img.dataset.pokemon = card.image;
    img.alt = card.name;

    cardLogic(div);

    div.appendChild(img);
    cardsContainer.appendChild(div);
  });
};

const startGame = () => {
  resetBoard();
  shuffleDeck();
  renderDeck();
};
// ----------------------------------------------------

// JQUERY for the start message

//START BUTTON LOGIC//
$(document).ready(function () {
  $("#start-btn").on("click", function () {
    $("#start-screen").fadeOut(500, function () {
      $("#game-container").css("display", "flex");

      startGame();
    });
  });

  //RESET BUTTON LOGIC
  $("#reset-btn").on("click", function () {
    startGame();
  });
});
