const state = {
    score:{
        playerScore: 0,
        cpuScore: 0,
        scoreBox: document.getElementById('score-points')
    },
    cardSprites:{
        avatar: document.getElementById('card-img'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type')
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        cpu: document.getElementById('cpu-field-card')
    },
    actions: {
        button: document.getElementById('next-duel')
    }
};

const playerSides = {
    player1: 'player-cards',
    cpu: 'cpu-cards'
}

const pathImgs = './src/assets/icons/';

const cardData = [
    {
        id: 0,
        name: 'Kabutops',
        type: 'Rock',
        img: `${pathImgs}kabutops.png`,
        winOf: [3],
        loseOf: [2]
    },
    {
        id: 1,
        name: 'Venusaur',
        type: 'Grass',
        img: `${pathImgs}venusaur.png`,
        winOf: [0,2],
        loseOf: [3]
    },
    {
        id: 2,
        name: 'Totodile',
        type: 'Water',
        img: `${pathImgs}totodile.png`,
        winOf: [0,3],
        loseOf: [1]
    },
    {
        id: 3,
        name: 'Charizard',
        type: 'Fire',
        img: `${pathImgs}charizard.png`,
        winOf: [1],
        loseOf: [0,2]
    },
    {
        id: 4,
        name: 'Mewtwo',
        type: 'Psychic',
        img: `${pathImgs}mewtwo.png`,
        winOf: [0,1,2,3,4],
        loseOf: [4]
    }
];

async function getrandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardIMG(cardID, fieldSide){
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('src', './src/assets/icons/card-back.png');
    cardImage.setAttribute('data-id', cardID);
    cardImage.classList.add('card');

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener('mouseover', () =>{
            drawSelectCard(cardID);
        });

        cardImage.addEventListener('click', ()=>{
            setCardsField(cardImage.getAttribute('data-id'));
        });
    }

    return cardImage;
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = 'attribute: ' + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers; i++){
        const cardRNG = await getrandomCardId();
        const cardIMG = await createCardIMG(cardRNG, fieldSide);
        document.getElementById(fieldSide).appendChild(cardIMG);
    }
}

function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.cpu);
}

init();