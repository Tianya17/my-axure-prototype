const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = [];

// Shuffle the cards
const shuffleCards = () => {
    const cardValues = Array.from(cards).map(card => card.dataset.card);
    const shuffledValues = [...cardValues].sort(() => Math.random() - 0.5);
    
    cards.forEach((card, index) => {
        card.dataset.card = shuffledValues[index];
        card.classList.remove('flipped', 'matched');
        card.textContent = '';
    });
};

// Flip a card
const flipCard = (card) => {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.textContent = card.dataset.card;
        flippedCards.push(card);
        
        // Check if two cards are flipped
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
};

// Check if the flipped cards match
const checkMatch = () => {
    if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
        flippedCards.forEach(card => card.classList.add('matched'));
        matchedCards.push(...flippedCards);
        flippedCards = [];
        
        // Check if the game is finished
        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                showAnswerDialog();
            }, 500);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flipped'));
            flippedCards = [];
        }, 1000);
    }
};

// Add event listener to each card
cards.forEach(card => {
    card.addEventListener('click', () => flipCard(card));
});

// Show the answer dialog when the game is completed
const showAnswerDialog = () => {
    const dialog = document.getElementById('answer-dialog');
    dialog.style.display = 'block';
};

// Check the player's answer
const checkAnswer = () => {
    const userAnswer = document.getElementById('user-answer').value.trim();
    const correctAnswer = "黑云翻墨未遮山，白雨跳珠乱入船。卷地风来忽吹散，望湖楼下水如天";

    const feedback = document.getElementById('feedback');
    
    if (userAnswer === correctAnswer) {
        feedback.style.color = 'green';
        feedback.textContent = "太棒了，完全正确！";
    } else {
        feedback.style.color = 'red';
        feedback.textContent = "很遗憾，答案不完全正确。请再试一次！";
    }
};

// Add event listener to submit button
document.getElementById('submit-answer').addEventListener('click', checkAnswer);

// Initialize game
shuffleCards();
