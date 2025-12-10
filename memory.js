//CONSTRUCTOR//
function memoryCards (name, image) {
this.name = name,
this.image = image
}

//CARD INFO//
let dragonite = new memoryCards ("dragonite", "images/dragonite.jpg")
let mimikyu = new memoryCards ("mimikyu", "images/mimikyu.jpg")
let snorlax = new memoryCards ("snorlax", "images/snorlax.jpg")
let eevee = new memoryCards ("eevee", "images/eevee.jpg")
let oshawatt = new memoryCards ("oshawatt", "images/oshawatt.jpg")
let ditto = new memoryCards ("ditto", "images/ditto.jpg")

let pokemons = [dragonite, mimikyu, snorlax, eevee, oshawatt, ditto]
let deck = [...pokemons, ...pokemons];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
const cardsContainer = document.querySelector(".game");

const shuffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[random]] = [deck[random], deck[i]];
    }
};

const renderDeck = () => {
    cardsContainer.innerHTML = ""; // clear container

    deck.forEach((card, index) => {
        const div = document.createElement("div");
        div.className = "card";

        const img = document.createElement("img");
        img.src = "images/back-card.jpg";
        img.dataset.pokemon = card.image;  
        img.alt = card.name;

        div.addEventListener("click", () => {
            if (lockBoard) return;
            if (div === firstCard) return;

            img.src = img.dataset.pokemon; // flip card

            if (!firstCard) {
                firstCard = div;
            } else {
                secondCard = div;
                lockBoard = true;

                const firstImg = firstCard.querySelector("img");
                const secondImg = secondCard.querySelector("img");

                if (firstImg.src === secondImg.src) {
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
                    }, 700);
                }
            }
        });

        div.appendChild(img);
        cardsContainer.appendChild(div);
    });
};

shuffleDeck();
renderDeck();



// RESET BUTTON
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
    shuffleDeck(); 
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    renderDeck();
});

