const cardsColor = ['red', 'red', 'green', 'green', 'blue', 'blue', 'brown', 'brown', 'yellow', 'yellow', 'gray', 'gray', 'cadetblue', 'cadetblue', 'violet', 'violet', 'lightgreen', 'lightgreen'];

let cards = [...document.querySelectorAll('.main div')];

const startTime = new Date().getTime();

let activeCard = '';
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;

const clickCard = function () {
    activeCard = this;

    if (activeCard == activeCards[0]) {
        return alert('Kliknij w inny element');
    }

    activeCard.classList.remove('hidden');

    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach((card) => {
            card.removeEventListener('click', clickCard);
        })
        activeCards[1] = activeCard;
        setTimeout(() => {
            if (activeCards[0].className === activeCards[1].className) {

                activeCards.forEach((card) =>
                    card.classList.add('off')
                )
                gameResult++;
                cards = cards.filter(card => !card.classList.contains('off'));

                if (gameResult === gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert(`Koniec. Twój wynik to: ${gameTime.toFixed(2)}sekund`);
                    location.reload();
                }
            } else {
                activeCards.forEach((card) => {
                    card.classList.add('hidden');
                })

            }
            activeCard = '';
            activeCards.length = 0;
            cards.forEach((card) => {
                card.addEventListener('click', clickCard);
            })

        }, 500);
    }
}
const init = function () {
    cards.forEach((card) => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    })
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.add('hidden');
            card.addEventListener('click', clickCard);
        })
    }, 1000);
}
init();