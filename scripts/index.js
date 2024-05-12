// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCardCallback) {
  const cloneTemplate = template.cloneNode(true);
  cloneTemplate.querySelector('.card__image').setAttribute('src', cardData.link);
  cloneTemplate.querySelector('.card__title').textContent = cardData.name;
  const cardId = uuidv4();
  cloneTemplate.querySelector('.places__item').setAttribute('id', cardId);
  const basket = cloneTemplate.querySelector('.card__delete-button');
  basket.addEventListener('click', function() {
    deleteCardCallback(cardId);
  })
  return cloneTemplate;
}

// @todo: Функция удаления карточки
function deleteCard (cardId) {
  const item = cardList.querySelector('#' + cardId);
  if (item != null) {
    item.remove();
  }
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) { 
  const card = createCard(item, deleteCard);
  cardList.append(card);
}); 

// скопированно с 
//https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid

function uuidv4() {
  return "id" + "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
