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
        player: document.getElementById('player-field'),
        cpu: document.getElementById('cpu-field')
    },
    actions: {
        button: document.getElementById('next-duel')
    },
    playerSides: {
        player1: 'player-cards',
        player1Box:  document.querySelector('#player-cards'),
        cpu: 'cpu-cards',
        cpuBox: document.querySelector('#cpu-cards')
    }
};

const pathImgs = './src/assets/icons/';

const cardData = [
    {
        id: 0,
        name: 'Kabutops',
        type: 'Rock',
        img: `${pathImgs}kabutops.png`,
        winOf: [3,12],
        loseOf: [1,2,4,8,10]
    },
    {
        id: 1,
        name: 'Venusaur',
        type: 'Grass',
        img: `${pathImgs}venusaur.png`,
        winOf: [0,2,6],
        loseOf: [3,4,5]
    },
    {
        id: 2,
        name: 'Totodile',
        type: 'Water',
        img: `${pathImgs}totodile.png`,
        winOf: [0,3],
        loseOf: [1,4,8,12]
    },
    {
        id: 3,
        name: 'Charizard',
        type: 'Fire',
        img: `${pathImgs}charizard.png`,
        winOf: [1,8],
        loseOf: [0,2,4,6,10]
    },
    {
        id: 4,
        name: 'Mewtwo',
        type: 'Psychic',
        img: `${pathImgs}mewtwo.png`,
        winOf: [0,1,2,3,4,5,6,7,8,9,10,11,12],
        loseOf: [null]
    },
    {
        id: 5,
        name: 'Weezing',
        type: 'Poison',
        img: `${pathImgs}weezing.png`,
        winOf: [1,8],
        loseOf: [4,6]
    },
    {
        id: 6,
        name: 'Nidoqueen',
        type: 'Ground',
        img: `${pathImgs}nidoqueen.png`,
        winOf: [3,12],
        loseOf: [1,2,4,8,10]
    },
    {
        id: 7,
        name: 'Machamp',
        type: 'Fight',
        img: `${pathImgs}machamp.png`,
        winOf: [0],
        loseOf: [4,11]
    },
    {
        id: 8,
        name: 'Victreebel',
        type: 'Grass',
        img: `${pathImgs}victreebel.png`,
        winOf: [0,2,6,10],
        loseOf: [3,4,5]
    },
    {
        id: 9,
        name: 'Dragonite',
        type: 'Dragon',
        img: `${pathImgs}dragonite.png`,
        winOf: [0,1,2,3],
        loseOf: [4,9]
    },
    {
        id: 10,
        name: 'Gyarados',
        type: 'Water',
        img: `${pathImgs}gyarados.png`,
        winOf: [0,1,2,3],
        loseOf: [1,4,8,12]
    },
    {
        id: 11,
        name: 'Gengar',
        type: 'Ghost',
        img: `${pathImgs}gengar.png`,
        winOf: [11],
        loseOf: [4,11]
    },
    {
        id: 12,
        name: 'Electabuzz',
        type: 'Eletric',
        img: `${pathImgs}electabuzz.png`,
        winOf: [2,10],
        loseOf: [0,1,4,6]
    }
];

async function getrandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardIMG(cardID, fieldSide){
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('src', './src/assets/icons/backC.png');
    cardImage.setAttribute('data-id', cardID);
    cardImage.classList.add('card');

    if(fieldSide === state.playerSides.player1){
        cardImage.addEventListener('mouseover', () =>{
            drawSelectCard(cardID);
        });

        cardImage.addEventListener('click', ()=>{
            setCardsField(cardImage.getAttribute('data-id'));
        });
    }

    return cardImage;
}

async function setCardsField(cardId){
    await removeAllCards();
    let cpuCardId = await getrandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.cpu.style.display = "block";

    state.cardSprites.avatar.src = '';
    state.cardSprites.name.innerText = '';
    state.cardSprites.type.innerText = '';

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.cpu.src = cardData[cpuCardId].img;

    let duelResult = await checkDuelResult(cardId, cpuCardId);

    await updateScore();
    await drawBtn(duelResult);
}

async function drawBtn(text){
    state.actions.button.innerText = text
    state.actions.button.style.display = 'block';
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.cpuScore}`;
}

async function checkDuelResult(playerCardID, CpuCardID){
    let duelResults = "Empate";
    let playerCard = cardData[playerCardID];
    
    if(playerCard.winOf.includes(CpuCardID)){
        duelResults = 'Ganhou';
        await playAudio('Win');
        state.score.playerScore++;
    }

    if(playerCard.loseOf.includes(CpuCardID)){
        duelResults = 'Perdeu';
        await playAudio('Lose');
        state.score.cpuScore++;
    }
    return duelResults;
}

async function removeAllCards(){
    let cards = state.playerSides.cpuBox;
    let imgElements = cards.querySelectorAll('img')
    imgElements.forEach((img) => img.remove());

    cards = state.playerSides.player1Box;
    imgElements = cards.querySelectorAll('img');
    imgElements.forEach((img) => img.remove());
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

async function resetDuel(){
    state.cardSprites.avatar.src = '';
    state.actions.button.style.display = 'none';

    state.fieldCards.player.style.display = 'none'
    state.fieldCards.cpu.style.display = 'none'

    init();
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    audio.play();
}

function init(){
    state.fieldCards.player.style.display = 'none';
    state.fieldCards.cpu.style.display = 'none';

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.cpu);

    const bgm = document.getElementById('bgm');
    bgm.volume = 0.06;
    bgm.play();
}

init();