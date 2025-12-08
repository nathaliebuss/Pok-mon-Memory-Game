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
let cards = document.querySelectorAll(".game div") 

const shuffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[random]] = [deck[random], deck[i]];
    }
};

let firstCard = ""
let secondCard  = ""
let score = 0

cards.forEach((card, index) => {
    card.addEventListener("click", shuffleDeck())
})

