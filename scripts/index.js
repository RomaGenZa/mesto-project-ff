// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCardCallback) {
  const cloneTemplate = template.cloneNode(true);
  cloneTemplate.querySelector('.card__image').src = cardData.link;
  cloneTemplate.querySelector('.card__image').alt = cardData.name;
  cloneTemplate.querySelector('.card__title').textContent = cardData.name;
  const cardElement = cloneTemplate.querySelector('.places__item');
  const basket = cloneTemplate.querySelector('.card__delete-button');
  basket.addEventListener('click', function() {
    deleteCardCallback(cardElement);
  })
  return cloneTemplate;
}

// @todo: Функция удаления карточки
function deleteCard (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData) { 
  const card = createCard(cardData, deleteCard);
  cardsContainer.append(card);
}); 


