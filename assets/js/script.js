const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");
const neverShowAgainButton = document.getElementById("neverShowAgain");

if (localStorage.getItem("hideModal") === "true") {
  modal.close();
}

closeModalButton.addEventListener("click", () => {
  modal.close();
});

neverShowAgainButton.addEventListener("click", () => {
  localStorage.setItem("hideModal", "true");
  modal.close();
});

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

let clicks = 0;

function shuffleAfterClicks() {
  clicks++;
  if (clicks % 5 === 0) {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
    alert("Les cartes se mélangent ! Bonne chance !");
  }
}

cards.forEach((card) => card.addEventListener('click', shuffleAfterClicks));