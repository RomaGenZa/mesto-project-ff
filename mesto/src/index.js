// импорт карточек из cards.js
import { initialCards } from '../scripts/cards.js';

// импорт главного файла стилей
import '../pages/index.css'; 

// импорт popup настройки профиля
import { configureProfileEditPopup } from './configureProfileEditPopup';
configureProfileEditPopup();

//импорт popup настройки карточек
import { configureCardsEditPopup } from './configureCardsEditPopup';
configureCardsEditPopup();

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

import icon from '../images/add-icon.svg';
import avatar from '../images/avatar.jpg';
import card_1 from '../images/card_1.jpg';
import card_2 from '../images/card_2.jpg';
import card_3 from '../images/card_3.jpg';
import close from '../images/close.svg';
import del from '../images/delete-icon.svg';
import edit from '../images/edit-icon.svg';
import active from '../images/like-active.svg';
import inactive from '../images/like-inactive.svg';
import logo from '../images/logo.svg';

const pictures = [
  {name: 'icon', link: icon},
  {name: 'avatar', link: avatar},
  {name: 'card_1', link: card_1},
  {name: 'card_2', link: card_2},
  {name: 'card_3', link: card_3},
  {name: 'close', link: close},
  {name: 'delete', link: del},
  {name: 'edit', link: edit},
  {name: 'active', link: active},
  {name: 'inactive', link: inactive},
  {name: 'logo', link: logo},
];
