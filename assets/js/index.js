import { decks, getDeckByID } from "./decks.js";

import { hexToString } from "./colors.js";

import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const decksList = document.querySelector(".decks__list");

const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");
const mainContent = document.querySelector(".page__main-content");

function renderHomeView() {
  homeSection.style.display = "block";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
}

function createDeckEl(item) {
  const deckEl = deckTemplate.content
    .querySelector(".deck-card")
    .cloneNode(true);

  const deckTitleEl = deckEl.querySelector(".deck__titles");
  deckTitleEl.textContent = item.name;

  const deckCountEl = deckEl.querySelector(".deck__count");
  deckCountEl.textContent = `${item.cards.length} cards`;

  const deckLinkEl = deckEl.querySelector(".deck__link");
  deckLinkEl.href = `#carousel/${item.id}`;

  const deleteBtn = deckEl.querySelector(".deck__delete-btn");
  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  const colorName = hexToString(item.color);
  deckEl.classList.add(`deck-card_color_${colorName}`);

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  decksList.prepend(deckEl);
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  //aboutSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "flex";
}

function router() {
  const hash = window.location.hash.slice(1) || "home";

  mainContent.classList.remove(`page__main-content_location_carousel`);

  if (hash === "home") {
    renderHomeView();
  } else if (hash.startsWith("carousel/")) {
    const parts = hash.split("/");
    const deckID = parts[1];
    const deck = getDeckByID(deckID);

    homeSection.style.display = "none";
    carouselSection.style.display = "flex";
    notFoundSection.style.display = "none";
    mainContent.classList.add("page__main-content_location_carousel");

    renderCarouselView(deck);
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

decks.forEach(renderDeckEl);
