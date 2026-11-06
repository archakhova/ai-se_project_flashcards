import { hexToString, removeColorClasses } from "./colors.js";

function getCarouselTitleString(deckName, cardNumber, totalCards) {
  return `${deckName} · ${cardNumber}/${totalCards}`;
}

function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;

  const carouselEl = document.querySelector(".carousel");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");

  const carouselTitleEl = document.querySelector(".carousel__title");
  const carouselCardEl = document.querySelector(".carousel__card");
  const flipBtn = document.querySelector(".carousel__btn_type_flip");
  const carouselCardTextEl = document.querySelector(".carousel__card-text");

  removeColorClasses(carouselCardEl);

  const colorName = hexToString(deck.color);

  carouselCardEl.classList.add(`carousel__card_color_${colorName}`);

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    const deckName = deck.name;
    const cardNumber = currentIndex + 1;
    const totalCards = deck.cards.length;

    if (showingQuestion) {
      carouselCardTextEl.textContent = currentCard.question;
      carouselCardEl.classList.remove("carousel__card_color_white");
    } else {
      carouselCardTextEl.textContent = currentCard.answer;
      carouselCardEl.classList.add("carousel__card_color_white");
    }

    carouselTitleEl.textContent = getCarouselTitleString(
      deckName,
      cardNumber,
      totalCards,
    );

    updateArrows();
  }

  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  updateDisplay();
}

export { renderCarouselView };
